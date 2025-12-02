import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import SearchBar from "../../../../components/shared/SearchBar";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import Modal from "../../../../components/shared/Modal";
import {
  lockBodyScroll,
  unlockBodyScroll,
} from "../../../../utils/functions/common.function";
import AddSubAdminModal from "./components/AddSubAdminModal/AddSubAdminModal";
import { apiDeleteSubAdmin, apiGetSubAdmins } from "../../../../services/SubAdminService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import Loading from "../../../../components/shared/Loading/Loading";
import ViewPermissions from "./components/ViewPermissions";
import { Form, Formik } from "formik";
import _ from "lodash";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import EditSubAdminModal from "./components/EditSubAdminModal";
import { useAppSelector } from "../../../../store";

const PERMISSION_CONFIG = [
  { label: "Users", value: "users" },
  { label: "Drivers", value: "drivers" },
  { label: "Packages", value: "packages" },
  { label: "Rides", value: "rides" },
  { label: "Users1", value: "users1" },
  { label: "Drivers1", value: "drivers1" },
  { label: "Packages1", value: "packages1" },
  { label: "Rides1", value: "rides1" },
  { label: "Packages2", value: "packages2" },
  { label: "Rides2", value: "rides2" },
];

const PERMISSION_KEYS = _.chain(PERMISSION_CONFIG)
  .map("value")
  .uniq() // optional: remove duplicates; remove this line if you want to keep duplicates
  .reduce((acc, value) => {
    acc[value] = [];
    return acc;
  }, {})
  .value();

const SubAdminManagement = () => {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState({
    isOpen: false,
    type: "new",
  });
  const [allSubAdmins, setAllSubAdmins] = useState({ data: [], last_page: 1 });
  const [subAdminListRaw, setSubAdminListRaw] = useState([]);
  const [subAdminListDisplay, setSubAdminListDisplay] = useState([]);
  const [isSubAdminsLoading, setIsSubAdminsLoading] = useState([]);
  const [_searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedViewData, setSelectedViewData] = useState(null);
  const [isViewPermissionModal, setIsViewPermissionModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subAdminToDelete, setSubAdminToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.subAdminManagement
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

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

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const getSubAdmins = useCallback(async () => {
    try {
      setIsSubAdminsLoading(true);
      const params = {
        page: currentPage,
        perPage: itemsPerPage,
      };
      if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
        params.search = debouncedSearchQuery.trim();
      }
      const result = await apiGetSubAdmins(params);
      if (result?.status === 200) {
        const list = result?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setAllSubAdmins(list);
        setSubAdminListRaw(rows);
        setSubAdminListDisplay(rows);
      }
    } catch (errors) {
      console.log(errors, "err---");
      setSubAdminListRaw([]);
      setSubAdminListDisplay([]);
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsSubAdminsLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearchQuery]);

  const prevSearchRef = useRef(debouncedSearchQuery);
  const prevItemsPerPageRef = useRef(itemsPerPage);
  const prevCurrentPageRef = useRef(currentPage);
  const isInitialMount = useRef(true);
  const hasCalledInitial = useRef(false);

  const handleDeleteSubAdmin = async () => {
    if (!subAdminToDelete) return;
    setIsDeleting(true);
    try {
      const response = await apiDeleteSubAdmin({ id: subAdminToDelete.id });
      if (response?.status === 200) {
        handleRefresh();
        setDeleteModalOpen(false);
        setSubAdminToDelete(null);
      } else {
        console.error("Failed to delete sub admin");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Initial mount - call API once
  useEffect(() => {
    if (!hasCalledInitial.current) {
      hasCalledInitial.current = true;
      isInitialMount.current = false;
      getSubAdmins();
      prevSearchRef.current = debouncedSearchQuery;
      prevItemsPerPageRef.current = itemsPerPage;
      prevCurrentPageRef.current = currentPage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual refresh
  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }
    getSubAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  // Reset page when search or itemsPerPage changes
  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }

    const searchChanged = prevSearchRef.current !== debouncedSearchQuery;
    const itemsPerPageChanged = prevItemsPerPageRef.current !== itemsPerPage;

    if (searchChanged || itemsPerPageChanged) {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery, itemsPerPage]);

  // Call API when page, search, or itemsPerPage changes (after initial mount)
  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }

    const pageChanged = prevCurrentPageRef.current !== currentPage;
    const searchChanged = prevSearchRef.current !== debouncedSearchQuery;
    const itemsPerPageChanged = prevItemsPerPageRef.current !== itemsPerPage;

    if (pageChanged || searchChanged || itemsPerPageChanged) {
      getSubAdmins();
      prevCurrentPageRef.current = currentPage;
      prevSearchRef.current = debouncedSearchQuery;
      prevItemsPerPageRef.current = itemsPerPage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, debouncedSearchQuery]);

  console.log(isDocumentModalOpen, "isDocumentModalOpen====");
  console.log(
    selectedViewData?.permissions,
    "selectedViewData?.permissions====="
  );

  const allPermissions =
    selectedViewData?.permissions &&
    JSON.parse(JSON.parse(selectedViewData?.permissions));

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Sub Admin Management" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsDocumentModalOpen({ type: "new", isOpen: true });
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
              <span className="whitespace-nowrap">Add Sub Admin</span>
            </div>
          </Button>
        </div>
      </div>
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        <div className="flex items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
          <div className="w-full sm:flex-1">
            <SearchBar
              value={_searchQuery}
              onSearchChange={handleSearchChange}
              className="w-full md:max-w-[400px] max-w-full"
            />
          </div>
        </div>
        <Loading loading={isSubAdminsLoading} type="cover">
          <div>
            <DataDetailsTable
              rowType="subAdminManagement"
              companies={subAdminListDisplay}
              onViewClick={(data) => {
                setSelectedViewData(data);
                setIsViewPermissionModal(true);
              }}
              actionOptions={[
                {
                  label: "View",
                  onClick: (data) => {
                    setSelectedViewData(data);
                    setIsViewPermissionModal(true);
                  },
                },
                {
                  label: "Edit",
                  onClick: (item) => {
                    if (item) {
                      setSelectedId(item?.id);
                      setIsDocumentModalOpen({ type: "edit", isOpen: true });
                    }
                  },
                },
                {
                  label: "Delete",
                  onClick: (item) => {
                    setSubAdminToDelete(item);
                    setDeleteModalOpen(true);
                  },
                },
              ]}
            />
            <Modal isOpen={deleteModalOpen} className="p-6 sm:p-8 w-full max-w-md">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-3">Delete SubAdmin?</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete sub admin
                </p>

                <div className="flex justify-center gap-4">
                  <Button
                    type="filledGray"
                    onClick={() => {
                      setDeleteModalOpen(false);
                      setSubAdminToDelete(null);
                    }}
                    className="px-6 py-2"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="filledRed"
                    onClick={handleDeleteSubAdmin}
                    disabled={isDeleting}
                    className="px-6 py-2"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </Loading>
        {Array.isArray(subAdminListDisplay) &&
          subAdminListDisplay.length > 0 ? (
          <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={allSubAdmins.last_page}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={PAGE_SIZE_OPTIONS}
              pageKey="subAdminManagement"
            />
          </div>
        ) : null}
      </CardContainer>
      <Modal isOpen={isDocumentModalOpen.isOpen} className="p-4 sm:p-6 lg:p-10">
        {isDocumentModalOpen.type === "new" ? (
          <AddSubAdminModal
            setIsDocumentModalOpen={setIsDocumentModalOpen}
            onRefresh={handleRefresh}
          />
        ) : (
          <EditSubAdminModal
            setIsDocumentModalOpen={setIsDocumentModalOpen}
            onRefresh={handleRefresh}
            id={selectedId}
          />
        )}
      </Modal>
      <Modal isOpen={isViewPermissionModal} className="p-4 sm:p-6 lg:p-10">
        <Formik
          initialValues={{
            permissions: allPermissions,
          }}
        >
          {({ values, setFieldValue }) => {
            console.log(values, "values====");
            return (
              <Form>
                <div className="mb-6 sm:mb-8 lg:mb-[32px] text-center">
                  <CardSubtitle type={2} subtitle="View Permission" />
                </div>
                <ViewPermissions
                  values={values}
                  setFieldValue={setFieldValue}
                  readonly={true}
                />
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mt-6 sm:mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="w-full sm:w-auto !px-8 pt-3 sm:pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
                    onClick={() => {
                      unlockBodyScroll();
                      setIsViewPermissionModal(false);
                    }}
                  >
                    <span>Cancel</span>
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default SubAdminManagement;
