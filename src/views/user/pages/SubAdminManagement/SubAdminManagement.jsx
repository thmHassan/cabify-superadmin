import React, { useEffect, useState } from "react";
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
import { apiGetSubAdmins } from "../../../../services/SubAdminService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import ViewPermissions from "./components/ViewPermissions";
import { Form, Formik } from "formik";
import _ from "lodash";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import EditSubAdminModal from "./components/EditSubAdminModal";

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
  const [allSubAdmins, setAllSubAdmins] = useState([]);
  const [isSubAdminsLoading, setIsSubAdminsLoading] = useState([]);
  const [_searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedViewData, setSelectedViewData] = useState(null);
  const [isViewPermissionModal, setIsViewPermissionModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const getSubAdmins = async () => {
    try {
      setIsSubAdminsLoading(true);
      const result = await apiGetSubAdmins();
      if (result?.status === 200) {
        setAllSubAdmins(result?.data?.list?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsSubAdminsLoading(false);
    }
  };

  useEffect(() => {
    getSubAdmins();
  }, [refreshTrigger]);

  if (isSubAdminsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  console.log(isDocumentModalOpen, "isDocumentModalOpen====");
  console.log(
    selectedViewData?.permissions,
    "selectedViewData?.permissions====="
  );

  const allPermissions =
    selectedViewData?.permissions &&
    JSON.parse(JSON.parse(selectedViewData?.permissions));

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="Sub Admin Management" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsDocumentModalOpen({ type: "new", isOpen: true });
            }}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add Sub Admin</span>
            </div>
          </Button>
        </div>
      </div>
      <CardContainer className="p-5">
        <div className="flex items-center gap-5 justify-between">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div>
          <DataDetailsTable
            rowType="subAdminManagement"
            companies={allSubAdmins}
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
              // {
              //   label: "Delete",
              //   onClick: () => {
              //     console.log("Delete clicked");
              //   },
              // },
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
      <Modal isOpen={isDocumentModalOpen.isOpen} className="p-10">
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
      <Modal isOpen={isViewPermissionModal} className="p-10">
        <Formik
          initialValues={{
            permissions: allPermissions,
          }}
          // onSubmit={onSubmit}
          //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
          //   onSubmit={(values, { setSubmitting }) => {
          //     if (!disableSubmit) {
          //       onSignIn(values, setSubmitting);
          //     } else {
          //       setSubmitting(false);
          //     }
          //   }}
        >
          {({ values, setFieldValue }) => {
            console.log(values, "values====");
            return (
              <Form>
                <div className="mb-[32px] text-center">
                  <CardSubtitle type={2} subtitle="View Permission" />
                </div>
                <ViewPermissions
                  values={values}
                  setFieldValue={setFieldValue}
                  readonly={true}
                />
                <div className="flex gap-5 justify-end mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="!px-8 pt-4 pb-[15px] leading-[25px]"
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
