import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { debounce } from "lodash";
import * as Yup from "yup";
import PageTitle from "../../../../components/ui/PageTitle/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle/PageSubTitle";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import CardContainer from "../../../../components/shared/CardContainer/CardContainer";
import SearchBar from "../../../../components/shared/SearchBar";
import ThreeDotsIcon from "../../../../components/svg/ThreeDotsIcon";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import { lockBodyScroll } from "../../../../utils/functions/common.function";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog";
import Loading from "../../../../components/shared/Loading/Loading";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { GeoJSON } from "react-leaflet";
import ApiService from "../../../../services/ApiService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import PlotFormModal from "./components/PlotFormModal";

const ZonesLocation = () => {
  const [isOpenLocationModal, setIsOpenLocationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Derived lists are computed from `records`; no need to keep separate plots/polygons state
  const [newFeature, setNewFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const formikRef = useRef(null);

  const debouncedSearchRef = useRef(
    debounce((searchValue) => {
      setDebouncedSearchQuery(searchValue);
    }, 500)
  );

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    debouncedSearchRef.current(value);
  }, []);

  useEffect(() => {
    const debouncedFn = debouncedSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  const computedTotalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const filteredPlots = useMemo(() => records.map((r) => r.name), [records]);
  const filteredPolygons = useMemo(
    () => records.map((r) => r.feature),
    [records]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const normalizeFeatureToSingleArray = (feature) => {
    const coords = feature?.geometry?.coordinates;
    const isAlreadySingle =
      Array.isArray(coords) &&
      Array.isArray(coords[0]) &&
      typeof coords[0][0] === "number";
    const ring = isAlreadySingle ? coords : coords?.[0] || [];
    return {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: ring,
      },
    };
  };

  const toGeoJSONForMap = (feature) => {
    const coords = feature?.geometry?.coordinates || [];
    const needsWrap =
      Array.isArray(coords) &&
      coords.length &&
      typeof coords[0][0] === "number";

    const result = {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: needsWrap ? [coords] : coords,
      },
    };

    return result;
  };

  const sanitizeBackendJsonString = (jsonString) => {
    if (typeof jsonString !== "string") return jsonString;
    // eslint-disable-next-line no-useless-escape
    return jsonString.replace(/\"'([^\"]+)\"/g, '"$1"');
  };

  const parseBackendFeature = (featuresString, fallbackName) => {
    try {
      const sanitized = sanitizeBackendJsonString(featuresString);
      const parsed = JSON.parse(sanitized);
      const rawCoords = parsed?.geometry?.coordinates || [];

      console.log(`[ZonesLocation] Parsing ${fallbackName}:`, {
        rawCoords,
        rawCoordsLength: rawCoords.length,
      });

      const pairs = [];
      for (let i = 0; i < rawCoords.length; i += 2) {
        const a = Number(rawCoords[i]);
        const b = Number(rawCoords[i + 1]);
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue;

        const aInIndiaLat = a >= 6 && a <= 37;
        const aInIndiaLng = a >= 68 && a <= 97;
        const bInIndiaLat = b >= 6 && b <= 37;
        const bInIndiaLng = b >= 68 && b <= 97;

        if (aInIndiaLat && bInIndiaLng) {
          pairs.push([b, a]);
          continue;
        }
        if (aInIndiaLng && bInIndiaLat) {
          pairs.push([a, b]);
          continue;
        }

        pairs.push([b, a]);
      }

      if (pairs.length) {
        const { sumLng, sumLat } = pairs.reduce(
          (acc, [lng, lat]) => ({
            sumLng: acc.sumLng + lng,
            sumLat: acc.sumLat + lat,
          }),
          { sumLng: 0, sumLat: 0 }
        );
        const avgLng = sumLng / pairs.length;
        const avgLat = sumLat / pairs.length;
        const inIndia = (lng, lat) =>
          lng >= 68 && lng <= 97 && lat >= 6 && lat <= 37;
        const centroidLooksValid = inIndia(avgLng, avgLat);
        if (!centroidLooksValid) {
          const swapped = pairs.map(([lng, lat]) => [lat, lng]);
          const { sumLng: sLng, sumLat: sLat } = swapped.reduce(
            (acc, [lng, lat]) => ({
              sumLng: acc.sumLng + lng,
              sumLat: acc.sumLat + lat,
            }),
            { sumLng: 0, sumLat: 0 }
          );
          const sAvgLng = sLng / swapped.length;
          const sAvgLat = sLat / swapped.length;
          if (inIndia(sAvgLng, sAvgLat)) {
            pairs.length = 0;
            swapped.forEach((p) => pairs.push(p));
          }
        }
      }

      if (pairs.length < 3) return null;
      const first = pairs[0];
      const last = pairs[pairs.length - 1];
      if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
        pairs.push([first[0], first[1]]);
      }
      return {
        type: parsed?.type || "Feature",
        properties: { name: parsed?.properties?.name || fallbackName || "" },
        geometry: {
          type: parsed?.geometry?.name || "Polygon",
          coordinates: pairs,
        },
      };
    } catch (err) {
      console.error(
        "[ZonesLocation] Failed to parse backend features",
        err,
        featuresString
      );
      return null;
    }
  };

  const fetchPlots = async (page, search = "") => {
    try {
      setIsLoading(true);
      const resp = await ApiService.getPlotList({
        page,
        search: search || undefined,
      });
      const payload = resp?.data?.list || {};
      const data = Array.isArray(payload?.data) ? payload.data : [];
      const recs = [];
      data.forEach((item) => {
        const name = item?.name || "";
        const parsed = parseBackendFeature(item?.features, name);
        if (parsed) recs.push({ id: item?.id, name, feature: parsed });
      });
      setRecords(recs);
      setTotalItems(Number(payload?.total) || data.length);
      setTotalPages(Number(payload?.last_page) || 1);
    } catch (err) {
      console.error("[ZonesLocation] Failed to fetch plot list", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots(1, debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, itemsPerPage]);

  useEffect(() => {
    fetchPlots(currentPage, debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleCreated = (e) => {
    const { layer } = e;
    const geojson = layer.toGeoJSON();
    const normalized = normalizeFeatureToSingleArray(geojson);
    setNewFeature(normalized);
  };

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("featureSelected", !!newFeature);
    }
  }, [newFeature]);

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Plots" />
          <PageSubTitle title="These plots will be pushed to all customer panels for their help or they can choose their own plots by creating in their own panels" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsOpenLocationModal(true);
            }}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span className="whitespace-nowrap">Add New Plots</span>
            </div>
          </Button>
        </div>
      </div>
      <CardContainer className="p-3 sm:p-4 lg:p-5 flex flex-col gap-4 sm:gap-5 min-h-[calc(100vh-(230px+64px))] sm:min-h-[calc(100vh-(230px+85px))] h-full">
        {/* Map - appears first on mobile, hidden on desktop (shown in two-column layout) */}
        <div className="order-1 lg:hidden relative z-0">
          <div className="h-[400px] sm:h-[500px] w-full relative overflow-hidden">
            <CardContainer type={1} className="w-full h-full relative">
              <MapContainer
                center={[32.5, 72.5]}
                zoom={6}
                style={{ height: "100%", position: "relative", zIndex: 0 }}
                className="h-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FeatureGroup>
                  <EditControl
                    position="topright"
                    onCreated={handleCreated}
                    draw={{
                      rectangle: { showArea: false },
                      polygon: { showArea: false },
                      polyline: false,
                      circle: false,
                      marker: false,
                      circlemarker: false,
                    }}
                  />

                  {filteredPolygons.length === 0
                    ? null
                    : filteredPolygons.map((feature, idx) => (
                        <GeoJSON
                          key={idx}
                          data={toGeoJSONForMap(feature)}
                          style={() => ({
                            color: "#0A84FF",
                            weight: 2,
                            fillColor: "#0A84FF",
                            fillOpacity: 0.3,
                          })}
                        />
                      ))}
                </FeatureGroup>
              </MapContainer>
              {filteredPolygons.length === 0 && (
                <div className="w-full text-center text-sm sm:text-base text-[#6C6C6C] font-semibold mt-2">
                  No plots to display on map
                </div>
              )}
            </CardContainer>
          </div>
        </div>
        {/* Search bar - appears second on mobile, first on desktop */}
        <div className="order-2 lg:order-1">
          <SearchBar
            value={searchQuery}
            onSearchChange={handleSearchChange}
            className="w-full md:max-w-[400px] max-w-full"
          />
        </div>
        {/* Plots list and Map - appears third on mobile, second on desktop */}
        <div className="order-3 lg:order-2 flex flex-col lg:flex-row gap-4 sm:gap-5">
          <div className="w-full lg:w-[calc((100%-20px)/2)]">
            <Loading loading={isLoading} type="cover">
              <div className="flex flex-col gap-4 sm:gap-5">
                {filteredPlots.length === 0 ? (
                  <CardContainer
                    type={1}
                    className="!rounded-[15px] px-4 sm:px-6 lg:px-[30px] py-6 sm:py-8 flex justify-between items-center"
                  >
                    <div className="w-full text-center text-sm sm:text-base text-[#6C6C6C] font-semibold">
                      No Plots Added
                    </div>
                  </CardContainer>
                ) : (
                  filteredPlots.map((plot, index) => (
                    <CardContainer
                      type={1}
                      key={index}
                      className="!rounded-[15px] px-4 sm:px-6 lg:px-[30px] py-6 sm:py-8 flex justify-between items-center relative"
                    >
                      <div>
                        <CardSubtitle type={1} subtitle={plot} />
                      </div>
                      <Button
                        className="w-10 h-10 bg-[#EFEFEF] rounded-full flex justify-center items-center"
                        onClick={() =>
                          setOpenMenuIndex((prev) =>
                            prev === index ? null : index
                          )
                        }
                      >
                        <ThreeDotsIcon />
                      </Button>
                      {openMenuIndex === index && (
                        <div className="absolute top-[60px] right-2 sm:right-[20px] bg-white border border-[#E9E9E9] rounded-[10px] shadow-md z-10 w-[140px] overflow-hidden">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5] text-sm"
                            onClick={() => {
                              setOpenMenuIndex(null);
                              const rec = records[index];
                              if (rec) {
                                setEditingRecord(rec);
                                setNewFeature(rec.feature);
                                lockBodyScroll();
                                setIsOpenLocationModal(true);
                              }
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5] text-sm text-red-600"
                            onClick={() => {
                              setOpenMenuIndex(null);
                              const rec = records[index];
                              if (!rec) return;
                              setDeleteTarget(rec);
                              setIsDeleteOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </CardContainer>
                  ))
                )}
                {/* Pagination - appears after listing */}
                {filteredPlots.length > 0 && (
                  <div className="border-t border-[#E9E9E9] pt-3 sm:pt-4 mt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages || computedTotalPages}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                      onItemsPerPageChange={handleItemsPerPageChange}
                      itemsPerPageOptions={PAGE_SIZE_OPTIONS}
                    />
                  </div>
                )}
              </div>
            </Loading>
          </div>
          {/* Map container for desktop - appears on the right side */}
          <div className="hidden lg:block w-[calc((100%-20px)/2)] relative z-0">
            <div className="h-[674px] w-full relative overflow-hidden">
              <CardContainer type={1} className="w-full h-full relative">
                <MapContainer
                  center={[32.5, 72.5]}
                  zoom={6}
                  style={{ height: "100%", position: "relative", zIndex: 0 }}
                  className="h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <FeatureGroup>
                    <EditControl
                      position="topright"
                      onCreated={handleCreated}
                      draw={{
                        rectangle: { showArea: false },
                        polygon: { showArea: false },
                        polyline: false,
                        circle: false,
                        marker: false,
                        circlemarker: false,
                      }}
                    />

                    {filteredPolygons.length === 0
                      ? null
                      : filteredPolygons.map((feature, idx) => (
                          <GeoJSON
                            key={idx}
                            data={toGeoJSONForMap(feature)}
                            style={() => ({
                              color: "#0A84FF",
                              weight: 2,
                              fillColor: "#0A84FF",
                              fillOpacity: 0.3,
                            })}
                          />
                        ))}
                  </FeatureGroup>
                </MapContainer>
                {filteredPolygons.length === 0 && (
                  <div className="w-full text-center text-sm sm:text-base text-[#6C6C6C] font-semibold mt-2">
                    No plots to display on map
                  </div>
                )}
              </CardContainer>
            </div>
          </div>
        </div>
      </CardContainer>
      <PlotFormModal
        isOpen={isOpenLocationModal}
        editingRecord={editingRecord}
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        setEditingRecord={setEditingRecord}
        setIsOpenLocationModal={setIsOpenLocationModal}
        fetchPlots={fetchPlots}
        currentPage={currentPage}
        handleCreated={handleCreated}
        formikRef={formikRef}
      />
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete plot?"
        message={`Are you sure you want to delete "${
          deleteTarget?.name || "this plot"
        }"? This action cannot be undone.`}
        confirmText="Delete"
        confirmType="filled"
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={async () => {
          if (!deleteTarget?.id) return;
          try {
            setIsDeleteLoading(true);
            await ApiService.deletePlot(deleteTarget.id);
            setIsDeleteOpen(false);
            setDeleteTarget(null);
            await fetchPlots(currentPage);
          } catch (err) {
            console.error("Delete plot failed", err);
          } finally {
            setIsDeleteLoading(false);
          }
        }}
        isLoading={isDeleteLoading}
      />
    </div>
  );
};

export default ZonesLocation;
