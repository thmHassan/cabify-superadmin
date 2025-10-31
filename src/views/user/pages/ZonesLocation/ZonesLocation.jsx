import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer/CardContainer";
import SearchBar from "../../../../components/shared/SearchBar";
import ThreeDotsIcon from "../../../../components/svg/ThreeDotsIcon";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import { lockBodyScroll } from "../../../../utils/functions/common.function";
import Modal from "../../../../components/shared/Modal";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { GeoJSON } from "react-leaflet";
import ApiService from "../../../../services/ApiService";

// No dummy data: start empty and reflect exactly what the API returns
const PLOTS = [];

const ZonesLocation = () => {
  const [isOpenLocationModal, setIsOpenLocationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [plots, setPlots] = useState(PLOTS);
  const [polygons, setPolygons] = useState([]);
  const [newFeature, setNewFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const computedTotalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const filteredRecords = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return records;
    return records.filter((r) => (r?.name || "").toLowerCase().includes(q));
  }, [records, searchQuery]);
  const filteredPlots = useMemo(
    () => filteredRecords.map((r) => r.name),
    [filteredRecords]
  );
  const filteredPolygons = useMemo(
    () => filteredRecords.map((r) => r.feature),
    [filteredRecords]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
    return jsonString.replace(/\"'([^\"]+)\"/g, '\"$1\"');
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

  const fetchPlots = async (page) => {
    try {
      setIsLoading(true);
      const resp = await ApiService.getPlotList({ page });
      const payload = resp?.data?.list || {};
      const data = Array.isArray(payload?.data) ? payload.data : [];
      const names = [];
      const features = [];
      const recs = [];
      data.forEach((item) => {
        const name = item?.name || "";
        const parsed = parseBackendFeature(item?.features, name);
        if (name) names.push(name);
        if (parsed) {
          features.push(parsed);
          recs.push({ id: item?.id, name, feature: parsed });
        }
      });
      setPlots(names);
      setPolygons(features);
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
    fetchPlots(currentPage);
  }, [currentPage]);

  const handleCreated = (e) => {
    const { layer, layerType } = e;
    const geojson = layer.toGeoJSON();
    const normalized = normalizeFeatureToSingleArray(geojson);
    setNewFeature(normalized);
  };

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="Plots" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsOpenLocationModal(true);
            }}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Plots</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="These plots will be pushed to all customer panels for their help or they can choose their own plots by creating in their own panels" />
        </div>
      </div>
      <CardContainer className="p-5 flex flex-col gap-5 min-h-[calc(100vh-(230px+85px))] h-full">
        <div>
          <SearchBar onSearchChange={setSearchQuery} />
        </div>
        <div className="flex gap-2.5">
          <div className="w-[calc((100%-10px)/2)]">
            <div className="flex flex-col gap-5">
              {filteredPlots.length === 0 ? (
                <CardContainer
                  type={1}
                  className="!rounded-[15px] px-[30px] py-8 flex justify-between items-center"
                >
                  <div className="w-full text-center text-[#6C6C6C] font-semibold">
                    No Plots Added
                  </div>
                </CardContainer>
              ) : (
                filteredPlots.map((plot, index) => (
                  <CardContainer
                    type={1}
                    key={index}
                    className="!rounded-[15px] px-[30px] py-8 flex justify-between items-center relative"
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
                      <div className="absolute top-[60px] right-[20px] bg-white border border-[#E9E9E9] rounded-[10px] shadow-md z-10 w-[140px] overflow-hidden">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5] text-sm"
                          onClick={() => {
                            setOpenMenuIndex(null);
                            const rec = filteredRecords[index];
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
                            const rec = filteredRecords[index];
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
            </div>
          </div>
          <div className="w-[calc((100%-10px)/2)]">
            <div className="h-[674px] w-full">
              <CardContainer type={1} className="w-full h-full">
                <MapContainer
                  center={[32.5, 72.5]}
                  zoom={6}
                  style={{ height: "600px" }}
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
                  <div className="w-full text-center text-[#6C6C6C] font-semibold mt-2">
                    No plots to display on map
                  </div>
                )}
              </CardContainer>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E9E9E9] pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || computedTotalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      </CardContainer>
      <Modal size="md" isOpen={isOpenLocationModal} className="p-10">
        <div>
          <div className="mb-10">
            <CardSubtitle
              type={2}
              subtitle={editingRecord ? "Edit Plot" : "Add New Plot"}
            />
          </div>
          <div>
            <Formik
              enableReinitialize
              initialValues={{ name: editingRecord?.name || "" }}
              onSubmit={async ({ name }, { setSubmitting }) => {
                const trimmed = (name || "").trim();
                if (!trimmed) {
                  console.warn(
                    "[ZonesLocation] Plot name is empty; submission ignored."
                  );
                  return;
                }
                if (!newFeature) {
                  console.warn(
                    "[ZonesLocation] No shape drawn; draw a polygon/rectangle before creating."
                  );
                  return;
                }
                const featureToAdd = {
                  ...newFeature,
                  properties: {
                    ...(newFeature.properties || {}),
                    name: trimmed,
                  },
                };

                try {
                  setSubmitting(true);
                  const fd = new FormData();
                  if (editingRecord?.id) {
                    fd.append("id", String(editingRecord.id));
                  }
                  fd.append("name", trimmed);
                  fd.append("features[type]", "Feature");
                  fd.append("features[properties][name]", trimmed);
                  fd.append(
                    "features[geometry][name]",
                    featureToAdd.geometry?.type || "Polygon"
                  );
                  const coords = featureToAdd.geometry?.coordinates || [];
                  const ring =
                    Array.isArray(coords) &&
                    coords.length &&
                    typeof coords[0][0] === "number"
                      ? coords
                      : coords?.[0] || [];
                  const flat = [];
                  ring.forEach(([lng, lat]) => {
                    flat.push(String(lat), String(lng));
                  });
                  flat.forEach((value, i) => {
                    fd.append(`features[geometry][coordinates][${i}]`, value);
                  });
                  if (editingRecord) {
                    await ApiService.editPlot(fd);
                  } else {
                    await ApiService.createPlot(fd);
                  }

                  // Refresh list from API for consistent ids/state
                  await fetchPlots(currentPage);
                  setNewFeature(null);
                  setEditingRecord(null);
                  setIsOpenLocationModal(false);
                } catch (err) {
                  console.error("[ZonesLocation] Create plot failed", err);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <div className="flex flex-wrap gap-5 mb-10">
                    <div className="w-full mb-5">
                      <label
                        htmlFor="plot-name"
                        className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                      >
                        Plot Name
                      </label>
                      <div className="h-16">
                        <Field
                          id="plot-name"
                          type="text"
                          name="name"
                          className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                          placeholder="Enter Plot Name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="h-[412px] rounded-[15px] w-full">
                      <CardContainer type={1} className="w-full h-full">
                        <MapContainer
                          center={[32.5, 72.5]}
                          zoom={6}
                          style={{ height: "350px" }}
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
                          </FeatureGroup>
                        </MapContainer>
                        <div className="text-sm text-[#6C6C6C] mt-2">
                          {newFeature
                            ? "Shape selected. You can Create the plot."
                            : "Tip: Use the polygon or rectangle tool to draw the plot area, then click Create."}
                        </div>
                      </CardContainer>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button
                      btnSize="md"
                      type="filledGray"
                      className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                      onClick={() => {
                        setNewFeature(null);
                        setEditingRecord(null);
                        setIsOpenLocationModal(false);
                      }}
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button
                      btnType="submit"
                      btnSize="md"
                      type="filled"
                      className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                      disabled={
                        isSubmitting ||
                        !newFeature ||
                        !(values.name || "").trim()
                      }
                    >
                      <span>Create</span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete plot?"
        message={`Are you sure you want to delete \"${deleteTarget?.name || "this plot"}\"? This action cannot be undone.`}
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
