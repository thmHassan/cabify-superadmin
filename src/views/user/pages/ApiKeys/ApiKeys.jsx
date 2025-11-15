import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
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
import FormLabel from "../../../../components/ui/FormLabel";
import Loading from "../../../../components/shared/Loading/Loading";

const ApiKeys = () => {
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isApiKeysLoading, setIsApiKeysLoading] = useState(false);
  const [allApiKeys, setAllApiKeys] = useState([]);
  const [_searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const getAPIkeys = async (search = "") => {
    try {
      setIsApiKeysLoading(true);
      const result = await apiGetApiKeys({
        search: search || undefined,
      });
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
    getAPIkeys(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="API Key Management" />
          <PageSubTitle title="Manage API keys for system access and authentication" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsAddDocumentModalOpen(true);
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
              <span className="whitespace-nowrap">Add New Document</span>
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
        <Loading loading={isApiKeysLoading} type="cover">
          <DataDetailsTable
            rowType="ApiKeys"
            companies={allApiKeys}
            isOnActionClick={false}
          />
        </Loading>
        <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
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
      <Modal
        size="sm"
        isOpen={isAddDocumentModalOpen}
        className="p-4 sm:p-6 lg:p-10"
      >
        <CardSubtitle
          subtitle="Add Document Type"
          className="!text-[#252525] !text-center"
        />
        <div className="pt-1.5 sm:pt-8 lg:pt-[35px]">
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
                <div className="pt-2 flex flex-col">
                  <FormLabel>Document Name</FormLabel>
                  <div className="h-14 sm:h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-4 sm:px-5 py-4 sm:py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-[22px] font-semibold"
                      placeholder="Enter Document"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mt-6 sm:mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="w-full sm:w-auto !px-8 pt-3 sm:pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
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
                    className="w-full sm:w-auto !px-8 pt-3 sm:pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
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

export default ApiKeys;
