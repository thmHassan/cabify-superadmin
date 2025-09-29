import React, { useState } from "react";
import WalletIcon from "../../../../components/svg/WalletIcon";
import WatchIcon from "../../../../components/svg/WatchIcon";
import WarningIcon from "../../../../components/svg/WarningIcon";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SnapshotCard from "../../../../components/shared/SnapshotCard/SnapshotCard";
import MonthlyRevenueIcon from "../../../../components/svg/MonthlyRevenueIcon";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable/DataDetailsTable";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import CardContainer from "../../../../components/shared/CardContainer";
import AddSubscriptionModal from "./components/AddSubscriptionModal";
import {
  PAGE_SIZE_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../constants/selectOptions";
import Pagination from "../../../../components/ui/Pagination";
import SearchBar from "../../../../components/shared/SearchBar";
import CustomSelect from "../../../../components/ui/CustomSelect";

const DASHBOARD_CARDS = [
  {
    title: "Active Subscriptions",
    value: 24,
    change: "+3 from last hour",
    icon: {
      component: WalletIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Monthly Revenue",
    value: "$6,800",
    change: "42% from last hour",
    icon: {
      component: MonthlyRevenueIcon,
      width: 24,
      height: 30,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Pending Renewals",
    value: "03",
    change: "Due this week",
    icon: {
      component: WatchIcon,
      width: 25,
      height: 25,
      fill: "#C29569",
    },
    backgroundColor: "#fdf3e7",
    color: "#C29569",
  },
  {
    title: "Total Drivers",
    value: "01",
    change: "Requires attention",
    icon: {
      width: 28,
      height: 28,
      component: WarningIcon,
    },
    backgroundColor: "#FFEDED",
    color: "#FF4747",
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
];
const companiesData2 = [
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

const Subscription = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
  const [isAddSubscriptionModalOpen, setIsAddSubscriptionModalOpen] =
    useState(false);

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
          <PageTitle title="Subscriptions" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>GC Subscription</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage company subscriptions, billing, and plan changes" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-[5px] mb-[30px]">
            <ChildText text="Existing Subscription Types" size="2xl" />
            <PageSubTitle title="Overview of all company subscriptions and billing status" />
          </div>
          <CardContainer className="px-5 pb-5">
            <div className="mb-7 pb-6 border-b-2 border-[#E9E9E9]">
              <DataDetailsTable
                companies={companiesData}
                onActionClick={() => console.log("object")}
              />
            </div>
            <div className="flex flex-col gap-[5px] mb-5">
              <ChildText text="Subscription Management" size="2xl" />
              <PageSubTitle title="Overview of all company subscriptions and billing status" />
            </div>
            <div>
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
              <div>
                <DataDetailsTable
                  companies={companiesData2}
                  onActionClick={() => console.log("object")}
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
            </div>
          </CardContainer>
        </div>
      </div>
      <AddSubscriptionModal
        isOpen={isAddSubscriptionModalOpen}
        setIsOpen={setIsAddSubscriptionModalOpen}
      />
    </div>
  );
};

export default Subscription;
