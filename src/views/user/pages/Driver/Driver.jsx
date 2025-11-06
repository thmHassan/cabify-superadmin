import React, { useEffect, useState } from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import SearchBar from "../../../../components/shared/SearchBar";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import Modal from "../../../../components/shared/Modal";
import { lockBodyScroll } from "../../../../utils/functions/common.function";
import AddDriverDocumentModal from "./components/AddDriverDocumentModal";
import {
  apiDeleteDriversDocument,
  apiGetDriversDocuments,
} from "../../../../services/DriverService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import EditDriverDocumentModal from "./components/EditDriverDocumentModal";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog";
import { useAppSelector } from "../../../../store";

const Driver = () => {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState({
    isOpen: false,
    type: "new",
  });
  const [allDriversDocuments, setAllDriversDocuments] = useState({
    data: [],
    last_page: 1,
  });
  const [driverDocumentsListRaw, setDriverDocumentsListRaw] = useState([]);
  const [driverDocumentsListDisplay, setDriverDocumentsListDisplay] = useState(
    []
  );
  const [_searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDriverDocumentsLoading, setIsDriverDocumentsLoading] =
    useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.driver
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

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

  const getDriversDocuments = async () => {
    try {
      setIsDriverDocumentsLoading(true);
      const result = await apiGetDriversDocuments({
        page: currentPage,
        perPage: itemsPerPage,
      });
      if (result?.status === 200) {
        console.log(result, "res========");
        const list = result?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setAllDriversDocuments(list);
        setDriverDocumentsListRaw(rows);
      }
    } catch (errors) {
      console.log(errors, "err---");
      setDriverDocumentsListRaw([]);
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsDriverDocumentsLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    setDeleteTarget({ id });
    setIsDeleteOpen(true);
  };

  useEffect(() => {
    getDriversDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, refreshTrigger]);

  // Reset to page 1 only when search query changes
  useEffect(() => {
    if (_searchQuery) {
      setCurrentPage(1);
    }
  }, [_searchQuery]);

  // Filter the data based on search query
  useEffect(() => {
    const query = _searchQuery?.toLowerCase?.() ?? "";

    let filtered = [...driverDocumentsListRaw];

    if (query) {
      filtered = filtered.filter((d) => {
        const hay = `${d.document_name ?? ""}`.toLowerCase();
        return hay.includes(query);
      });
    }

    setDriverDocumentsListDisplay(filtered);
  }, [driverDocumentsListRaw, _searchQuery]);

  if (isDriverDocumentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-6">
        <div className="flex justify-between items-center sm:items-center gap-3 sm:gap-0">
          <PageTitle title="Default Document Type" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsDocumentModalOpen({ type: "new", isOpen: true });
            }}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <PlusIcon />
              <span>Add New Document</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage driver documents across all panels" />
        </div>
      </div>
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        {Array.isArray(driverDocumentsListRaw) &&
        driverDocumentsListRaw.length > 0 ? (
          <div className="flex items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
            <div className="w-full sm:flex-1">
              <SearchBar onSearchChange={handleSearchChange} className="w-full md:max-w-[400px] max-w-full" />
            </div>
          </div>
        ) : null}
        <div>
          <DataDetailsTable
            rowType="driverDocuments"
            companies={driverDocumentsListDisplay}
            actionOptions={[
              {
                label: "Edit",
                onClick: (item) => {
                  console.log("object", item);
                  if (item) {
                    setIsDocumentModalOpen({ type: "edit", isOpen: true });
                    setSelectedId(item?.id);
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
        {Array.isArray(driverDocumentsListDisplay) &&
        driverDocumentsListDisplay.length > 0 ? (
          <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={allDriversDocuments.last_page}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={PAGE_SIZE_OPTIONS}
              pageKey="driver"
            />
          </div>
        ) : null}
      </CardContainer>
      <Modal size="sm" isOpen={isDocumentModalOpen.isOpen} className="p-4 sm:p-6 lg:p-10">
        {isDocumentModalOpen.type === "new" ? (
          <AddDriverDocumentModal
            setIsOpen={setIsDocumentModalOpen}
            onRefresh={handleRefresh}
          />
        ) : (
          <EditDriverDocumentModal
            setIsOpen={setIsDocumentModalOpen}
            onRefresh={handleRefresh}
            id={selectedId}
          />
        )}
      </Modal>
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete document type?"
        message={`Are you sure you want to delete this document? This action cannot be undone.`}
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
            const result = await apiDeleteDriversDocument({
              id: deleteTarget.id,
            });
            if (result?.status === 200) {
              setIsDeleteOpen(false);
              setDeleteTarget(null);
              handleRefresh();
            }
          } catch (err) {
            console.error("Delete driver document failed", err);
          } finally {
            setIsDeleteLoading(false);
          }
        }}
        isLoading={isDeleteLoading}
      />
    </div>
  );
};

export default Driver;
