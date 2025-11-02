import React, { useEffect, useState } from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import SearchBar from "../../../../components/shared/SearchBar";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import Pagination from "../../../../components/ui/Pagination";
import Modal from "../../../../components/shared/Modal";
import FieldTitle from "../../../../components/ui/FieldTitle";
import { Field, Form, Formik } from "formik";
import {
  lockBodyScroll,
  unlockBodyScroll,
} from "../../../../utils/functions/common.function";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import { apiGetApiKeys } from "../../../../services/ApiKeySerevice";
import _ from "lodash";

const APIKeys = () => {
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isApiKeysLoading, setIsApiKeysLoading] = useState(false);
  const [allApiKeys, setAllApiKeys] = useState([]);
  const [_searchQuery, setSearchQuery] = useState("");

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

  const getAPIkeys = async () => {
    try {
      setIsApiKeysLoading(true);
      const result = await apiGetApiKeys();
      if (result?.status === 200 && result?.data?.settingKeys) {
        let allKeys = [];
        const filteredKeys = _.omit(result?.data?.settingKeys, [
          "created_at",
          "updated_at",
          "id",
        ]);
        Object.keys(filteredKeys).map((keyName) => {
          allKeys = [
            ...allKeys,
            {
              name: _.capitalize(keyName.split("_").join(" ")),
              key: result?.data?.settingKeys?.[keyName],
              created: "2024-01-15",
              lastUsed: "2 minutes ago",
            },
          ];
        });
        console.log(allKeys, "allKeys=====");
        setAllApiKeys(allKeys);
      }
    } catch (errors) {
      console.log(errors, "err---");
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsApiKeysLoading(false);
    }
  };

  console.log(allApiKeys, "allApiKeys======");

  useEffect(() => {
    getAPIkeys();
  }, []);

  if (isApiKeysLoading) {
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
          <PageTitle title="API Key Management" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsAddDocumentModalOpen(true);
            }}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Document</span>
            </div>
          </Button>
        </div>
        <PageSubTitle title="Manage API keys for system access and authentication" />
      </div>
      <CardContainer className="p-5">
        <div className="flex items-center gap-5 justify-between">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div>
          <DataDetailsTable
            rowType="ApiKeys"
            companies={allApiKeys}
            isOnActionClick={false}
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
      <Modal size="sm" isOpen={isAddDocumentModalOpen} className="p-10">
        <CardSubtitle
          subtitle="Add Document Type"
          className="!text-[#252525] !text-center"
        />
        <div className="pt-[35px]">
          <FieldTitle label="Document Name" />
          <Formik
            initialValues={{}}
            //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
            //   onSubmit={(values, { setSubmitting }) => {
            //     if (!disableSubmit) {
            //       onSignIn(values, setSubmitting);
            //     } else {
            //       setSubmitting(false);
            //     }
            //   }}
          >
            {() => (
              <Form>
                <div className="pt-2 flex flex-col gap-5">
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Document"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="!px-8 pt-4 pb-[15px] leading-[25px]"
                    onClick={() => {
                      unlockBodyScroll();
                      setIsAddDocumentModalOpen(false);
                    }}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="!px-8 pt-4 pb-[15px] leading-[25px]"
                  >
                    <span>Create</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default APIKeys;
