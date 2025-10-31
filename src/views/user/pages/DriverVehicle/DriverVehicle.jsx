import React, { useEffect, useState } from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PlusIcon from "../../../../components/svg/PlusIcon";
import { useNavigate } from "react-router-dom";
import {
  DRIVER_VEHICLE_EDIT,
  DRIVER_VEHICLE_NEW_PATH,
} from "../../../../constants/routes.path.constant/user.route.path.constant";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import SearchBar from "../../../../components/shared/SearchBar";
import {
  apiDeleteVehicleType,
  apiGetVehicleTypes,
} from "../../../../services/VehicleService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";

const DriverVehicle = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allVehicleTypes, setAllVehicleTypes] = useState([]);

  const navigate = useNavigate();

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getVehicles = async () => {
    try {
      setIsVehiclesLoading(true);
      const result = await apiGetVehicleTypes();
      if (result?.status === 200) {
        console.log(result, "all-data");
        setAllVehicleTypes(result?.data?.list?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsVehiclesLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (id) {
      const result = await apiDeleteVehicleType({ id });
      if (result?.status === 200) {
        console.log(result, "res========");
        handleRefresh();
        // setAllDriversDocuments(result?.data?.list?.data);
      }
    }
  };

  useEffect(() => {
    getVehicles();
  }, [refreshTrigger]);

  if (isVehiclesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="Vehicle Types" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Vehicle</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage vehicle related documents across all panels" />
        </div>
      </div>
      <CardContainer className="p-5">
        <div className="flex items-center gap-5 justify-between">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div>
          <DataDetailsTable
            rowType="vehicleType"
            companies={allVehicleTypes}
            actionOptions={[
              // {
              //   label: "View",
              //   onClick: (data) => {},
              // },
              {
                label: "Edit",
                onClick: (item) => {
                  console.log(item, "item=====");
                  if (item) {
                    navigate(`${DRIVER_VEHICLE_EDIT}/${item?.id}`);
                  }
                },
              },
              {
                label: "Delete",
                onClick: (item) => {
                  if (item) {
                    onDelete(item.id);
                  }
                },
              },
            ]}
          />
        </div>
        <div className="mt-4 border-t border-[#E9E9E9] pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      </CardContainer>
    </div>
  );
};

export default DriverVehicle;
