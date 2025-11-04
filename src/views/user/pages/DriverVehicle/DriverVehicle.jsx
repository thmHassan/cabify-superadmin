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
import ConfirmDialog from "../../../../components/shared/ConfirmDialog";
import { useAppSelector } from "../../../../store";

const DriverVehicle = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.driverVehicle
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allVehicleTypes, setAllVehicleTypes] = useState({
    data: [],
    last_page: 1,
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();

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
      const result = await apiGetVehicleTypes({ page: currentPage, perPage: itemsPerPage });
      if (result?.status === 200) {
        console.log(result, "all-data");
        setAllVehicleTypes(result?.data?.list);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsVehiclesLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    setDeleteTarget({ id });
    setIsDeleteOpen(true);
  };

  useEffect(() => {
    getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshTrigger, itemsPerPage]);

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
        {Array.isArray(allVehicleTypes.data) &&
        allVehicleTypes.data.length > 0 ? (
          <div className="flex items-center gap-5 justify-between">
            <SearchBar onSearchChange={handleSearchChange} />
          </div>
        ) : null}
        <div>
          <DataDetailsTable
            rowType="vehicleType"
            companies={allVehicleTypes.data}
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
        {Array.isArray(allVehicleTypes.data) &&
        allVehicleTypes.data.length > 0 ? (
          <div className="mt-4 border-t border-[#E9E9E9] pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={allVehicleTypes.last_page}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={PAGE_SIZE_OPTIONS}
              pageKey="driverVehicle"
            />
          </div>
        ) : null}
      </CardContainer>
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete vehicle type?"
        message={`Are you sure you want to delete this vehicle type? This action cannot be undone.`}
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
            const result = await apiDeleteVehicleType({ id: deleteTarget.id });
            if (result?.status === 200) {
              setIsDeleteOpen(false);
              setDeleteTarget(null);
              handleRefresh();
            }
          } catch (err) {
            console.error("Delete vehicle type failed", err);
          } finally {
            setIsDeleteLoading(false);
          }
        }}
        isLoading={isDeleteLoading}
      />
    </div>
  );
};

export default DriverVehicle;
