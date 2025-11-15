import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
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
import Loading from "../../../../components/shared/Loading/Loading";
import { useAppSelector } from "../../../../store";

const DriverVehicle = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getVehicles = async (search = "") => {
    try {
      setIsVehiclesLoading(true);
      const result = await apiGetVehicleTypes({
        page: currentPage,
        perPage: itemsPerPage,
        search: search || undefined,
      });
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
    getVehicles(debouncedSearchQuery);
  }, [refreshTrigger]);

  useEffect(() => {
    setCurrentPage(1);
    getVehicles(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, itemsPerPage]);

  useEffect(() => {
    getVehicles(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Vehicle Types" />
          <PageSubTitle title="Manage vehicle related documents across all panels" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span className="whitespace-nowrap">Add New Vehicle</span>
            </div>
          </Button>
        </div>
      </div>
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        {Array.isArray(allVehicleTypes.data) &&
        allVehicleTypes.data.length > 0 ? (
          <div className="flex items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
            <div className="w-full sm:flex-1">
              <SearchBar
                value={_searchQuery}
                onSearchChange={handleSearchChange}
                className="w-full md:max-w-[400px] max-w-full"
              />
            </div>
          </div>
        ) : null}
        <Loading loading={isVehiclesLoading} type="cover">
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
        </Loading>
        {Array.isArray(allVehicleTypes.data) &&
        allVehicleTypes.data.length > 0 ? (
          <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
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
