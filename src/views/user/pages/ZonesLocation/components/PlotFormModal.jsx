import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "../../../../../components/shared/Modal";
import CardSubtitle from "../../../../../components/ui/CardSubtitle";
import CardContainer from "../../../../../components/shared/CardContainer/CardContainer";
import Button from "../../../../../components/ui/Button/Button";
import FormLabel from "../../../../../components/ui/FormLabel";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import ApiService from "../../../../../services/ApiService";
import { ZONES_LOCATION_VALIDATION_SCHEMA } from "../../../validators/pages/zonesLocation.validation";

const PlotFormModal = ({
  isOpen,
  editingRecord,
  newFeature,
  setNewFeature,
  setEditingRecord,
  setIsOpenLocationModal,
  fetchPlots,
  currentPage,
  handleCreated,
  formikRef,
}) => {
  return (
    <Modal size="md" isOpen={isOpen} className="p-4 sm:p-6 lg:p-10">
      <div>
        <div className="mb-6 sm:mb-10">
          <CardSubtitle
            type={2}
            subtitle={editingRecord ? "Edit Plot" : "Add New Plot"}
          />
        </div>
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={{
            name: editingRecord?.name || "",
            featureSelected: !!newFeature,
          }}
          validationSchema={ZONES_LOCATION_VALIDATION_SCHEMA}
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
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-wrap gap-3 sm:gap-5 mb-6 sm:mb-10">
                <div className="w-full mb-4 sm:mb-5">
                  <FormLabel htmlFor="plot-name">Plot Name</FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      id="plot-name"
                      type="text"
                      name="name"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="Enter Plot Name"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>
                <div className="h-[300px] sm:h-[350px] lg:h-[412px] rounded-[15px] w-full relative overflow-hidden">
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
                      </FeatureGroup>
                    </MapContainer>
                    <div className="text-xs sm:text-sm text-[#6C6C6C] mt-2 px-2">
                      {newFeature
                        ? "Shape selected. You can Create the plot."
                        : "Tip: Use the polygon or rectangle tool to draw the plot area, then click Create."}
                    </div>
                    <Field type="hidden" name="featureSelected" />
                    <ErrorMessage
                      name="featureSelected"
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </CardContainer>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="w-full sm:w-auto !px-8 sm:!px-10 !pt-3 sm:!pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
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
                  className="w-full sm:w-auto !px-8 sm:!px-10 !pt-3 sm:!pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting
                      ? "Saving..."
                      : editingRecord
                      ? "Update"
                      : "Create"}
                  </span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default PlotFormModal;

