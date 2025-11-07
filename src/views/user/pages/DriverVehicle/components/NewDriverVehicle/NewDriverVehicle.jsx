import PageTitle from "../../../../../../components/ui/PageTitle";
import Attributes from "../Attributes";
import {
  convertToFormData,
  toYesNo,
} from "../../../../../../utils/functions/common.function";
import { apiCreateVehicleType } from "../../../../../../services/VehicleService";
import { useNavigate } from "react-router-dom";
import { DRIVER_VEHICLE_PATH } from "../../../../../../constants/routes.path.constant/user.route.path.constant";
import DriverVehicleForm from "../DriverVehicleForm/DriverVehicleForm";

const isDefaultValue = import.meta.env.VITE_IS_DEFAULT_VALUES || false;
const defaultValue = {
  vehicle_type_name: "Test",
  vehicle_type_service: "local",
  minimum_price: "20",
  minimum_distance: "200",
  base_fare_less_than_x_miles: "10",
  base_fare_less_than_x_price: "15",
  base_fare_from_x_miles: "20",
  base_fare_to_x_miles: "25",
  base_fare_from_to_price: "30",
  base_fare_greater_than_x_miles: "35",
  base_fare_greater_than_x_price: "40",
  from_array: [1, 6],
  to_array: [5, 15],
  price_array: [20, 20],
  order_no: "local",
  first_mile_km: "45",
  second_mile_km: "50",
  backup_bid_vehicle_type: [1, 2],
  base_fare_system_status: false,
  mileage_system: "fixed",
  vehicle_image: "",
  attribute_array: {
    "No Smoking*": "yes",
    ac:"yes",
    "child seat": "no",
    pets: "yes",
    "wheel chair": "no",
    "lady driver": "yes",
  },
  from:"",
  to:"",
  price:"",
};

const NewDriverVehicle = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
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
        attribute_array,
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
        attribute_array,
      });
      const result = await apiCreateVehicleType(formDataToSend);
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
  return (
    <div className="2xl:p-10 lg:p-5 sm:px-4 px-3 sm:py-5 py-3">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Add Vehicle Type" />
        </div>
      </div>
      <DriverVehicleForm
        onSubmit={onSubmit}
        initialValues={
          isDefaultValue
            ? defaultValue
            : {
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
              }
        }
      />
    </div>
  );
};

export default NewDriverVehicle;
