import React, { useState } from "react";
import CompaniesIcon from "../../../../components/svg/CompaniesIcon";
import ActiveCompaniesIcon from "../../../../components/svg/ActiveCompaniesIcon";
import MonthlyRevenueIcon from "../../../../components/svg/MonthlyRevenueIcon";
import DriverVehicleIcon from "../../../../components/svg/DriverVehicleIcon";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import SnapshotCard from "../../../../components/shared/SnapshotCard/SnapshotCard";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PageTitle from "../../../../components/ui/PageTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import AddCompanyModal from "./components/AddCompanyModal";
import SearchBar from "../../../../components/shared/SearchBar";
import CustomSelect from "../../../../components/ui/CustomSelect";
import {
  STATUS_OPTIONS,
  PLAN_OPTIONS,
  PAGE_SIZE_OPTIONS,
} from "../../../../constants/selectOptions";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import Tag from "../../../../components/ui/Tag";
import ThreeDots from "../../../../components/svg/ThreeDots";
import Pagination from "../../../../components/ui/Pagination";
import Modal from "../../../../components/shared/Modal";
import CloseIcon from "../../../../components/svg/CloseIcon";
import ZonesLocationIcon from "../../../../components/svg/ZonesLocationIcon";
import PhoneIcon from "../../../../components/svg/PhoneIcon";
import ActiveDoneIcon from "../../../../components/svg/ActiveDoneIcon";
import EditPaperPencilIcon from "../../../../components/svg/EditPaperPencilIcon";
import CompanyInformationModal from "./components/CompanyInformationModal";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable/DataDetailsTable";

const DASHBOARD_CARDS = [
  {
    title: "Total Companies",
    value: "03",
    change: "+3 from last hour",
    icon: {
      component: CompaniesIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Active Companies",
    value: "02",
    change: "+3 from last hour",
    icon: {
      component: ActiveCompaniesIcon,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Monthly Revenue",
    value: "$6,800",
    change: "+3 from last hour",
    icon: {
      component: MonthlyRevenueIcon,
    },
    backgroundColor: "#fdf3e7",
    color: "#C29569",
  },
  {
    title: "Total Drivers",
    value: 100,
    change: "+3 from last hour",
    icon: {
      component: DriverVehicleIcon,
    },
    backgroundColor: "#e9f2ff",
    color: "#3C71B7",
  },
];

const companiesData = [
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    location: "New York",
    drivers: "45 Drivers",
    contact: "+1-555-0101",
    revenue: "$4500",
  },
];

const Companies = () => {
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isCompanyInformationModalOpen, setIsCompanyInformationModalOpen] =
    useState(false);
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleStatusChange = (option) => {
    setSelectedStatus(option);
  };

  const handlePlanChange = (option) => {
    setSelectedPlan(option);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Companies" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => setIsAddCompanyModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add Company</span>
            </div>
          </Button>
        </div>
        <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-[5px] mb-5">
            <ChildText size="2xl" text="Company Directory" />
            <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
          </div>
          <div>
            <CardContainer className="p-5 bg-[#F5F5F5]">
              <div className="flex items-center gap-5 justify-between">
                <SearchBar onSearchChange={handleSearchChange} />
                <div className="flex gap-5">
                  <CustomSelect
                    variant={2}
                    options={STATUS_OPTIONS}
                    value={_selectedStatus}
                    onChange={handleStatusChange}
                    placeholder="All Status"
                  />
                  <CustomSelect
                    variant={2}
                    options={PLAN_OPTIONS}
                    value={_selectedPlan}
                    onChange={handlePlanChange}
                    placeholder="All Plans"
                  />
                </div>
              </div>
              <DataDetailsTable
                companies={companiesData}
                onActionClick={() => setIsCompanyInformationModalOpen(true)}
              />
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
            <CompanyInformationModal
              isOpen={isCompanyInformationModalOpen}
              setIsOpen={setIsCompanyInformationModalOpen}
            />
          </div>
        </div>
      </div>
      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        setIsOpen={setIsAddCompanyModalOpen}
      />
    </div>
  );
};

export default Companies;
