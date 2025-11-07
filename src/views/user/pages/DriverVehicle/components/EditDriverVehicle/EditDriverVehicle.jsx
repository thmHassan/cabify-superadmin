import React, { useEffect, useState } from "react";
import PageTitle from "../../../../../../components/ui/PageTitle";
import {
  apiEditVehicleType,
  apiGetVehicleTypeById,
} from "../../../../../../services/VehicleService";
import { useNavigate, useParams } from "react-router-dom";
import Attributes from "../Attributes";
import DriverVehicleForm from "../DriverVehicleForm";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import {
  convertToFormData,
  toBoolean,
  toYesNo,
} from "../../../../../../utils/functions/common.function";
import { DRIVER_VEHICLE_PATH } from "../../../../../../constants/routes.path.constant/user.route.path.constant";

const EditDriverVehicle = () => {
  const [isVehicleDetailsLoading, setIsVehicleDetailsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    vehicle_type_name: "",
    vehicle_type_service: "",
    minimum_price: "",
    minimum_distance: "",
    base_fare_less_than_x_miles: "",
    base_fare_less_than_x_price: "",
    base_fare_from_x_miles: "",
    base_fare_to_x_miles: "",
    base_fare_from_to_price: "",
    base_fare_greater_than_x_miles: "",
    base_fare_greater_than_x_price: "",
    from_array: [],
    to_array: [],
    price_array: [],
    order_no: "",
    first_mile_km: "",
    second_mile_km: "",
    backup_bid_vehicle_type: [],
    base_fare_system_status: false,
    mileage_system: "fixed",
    vehicle_image: "",
    attribute_array: {},
    atrText: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const getSubAdminById = async () => {
    try {
      setIsVehicleDetailsLoading(true);
      const result = await apiGetVehicleTypeById({ id });
      if (result?.status === 200 && result?.data?.vehicleType) {
        const {
          base_fare_system_status,
          backup_bid_vehicle_type,
          from_array,
          to_array,
          price_array,
        } = result?.data?.vehicleType || {
          base_fare_system_status: false,
          backup_bid_vehicle_type: [],
          from_array: [],
          to_array: [],
          price_array: [],
        };
        setInitialValues({
          ...result?.data?.vehicleType,
          base_fare_system_status: toBoolean(base_fare_system_status),
          backup_bid_vehicle_type: backup_bid_vehicle_type.split(","),
          from_array: from_array.split(","),
          to_array: to_array.split(","),
          price_array: price_array.split(","),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsVehicleDetailsLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log(values, "values====");
      const {
        vehicle_type_name,
        vehicle_type_service,
        minimum_price,
        minimum_distance,
        base_fare_less_than_x_miles,
        base_fare_less_than_x_price,
        base_fare_from_x_miles,
        base_fare_to_x_miles,
        base_fare_from_to_price,
        base_fare_greater_than_x_miles,
        base_fare_greater_than_x_price,
        from_array,
        to_array,
        price_array,
        order_no,
        first_mile_km,
        second_mile_km,
        backup_bid_vehicle_type,
        base_fare_system_status,
        mileage_system,
        vehicle_image,
      } = values;
      const formDataToSend = convertToFormData({
        vehicle_type_name,
        vehicle_type_service,
        minimum_price,
        minimum_distance,
        base_fare_less_than_x_miles,
        base_fare_less_than_x_price,
        base_fare_from_x_miles,
        base_fare_to_x_miles,
        base_fare_from_to_price,
        base_fare_greater_than_x_miles,
        base_fare_greater_than_x_price,
        from_array,
        to_array,
        price_array,
        order_no,
        first_mile_km,
        second_mile_km,
        backup_bid_vehicle_type,
        base_fare_system_status: toYesNo(base_fare_system_status),
        mileage_system,
        vehicle_image,
      });
      const result = await apiEditVehicleType({ id }, formDataToSend);
      if (result?.status === 200) {
        navigate(DRIVER_VEHICLE_PATH);
        console.log(result, "result=====");
      }
    } catch (error) {
      console.log("err==", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getSubAdminById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVehicleDetailsLoading && initialValues) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  console.log(initialValues, "initialValues=====");

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Add Vehicle Type" />
        </div>
      </div>
      <DriverVehicleForm onSubmit={onSubmit} initialValues={initialValues} />
    </div>
  );
};

export default EditDriverVehicle;
