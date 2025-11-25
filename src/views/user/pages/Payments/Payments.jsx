import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import PaymentTable from "../../../../components/shared/PaymentTable";
import Tag from "../../../../components/ui/Tag";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import PaymentProviderIcon from "../../../../components/svg/PaymentProviderIcon";
import PaymentsIcon from "../../../../components/svg/PaymentsIcon";
import SearchBar from "../../../../components/shared/SearchBar";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import { apiGetAllPaymentsList } from "../../../../services/PaymentService";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";

const PAYMENT_STATUS = {
  Paid: "green",
  Failed: "red",
  Pending: "yellow",
  Processing: "lightPurple",
};

const paymentProviderData = [
  {
    name: "Stripe",
    publicKey: "STRP123245567889pvl2117845LK",
    secretKey: "STRP123245567889pvl2117845LK",
    transactions: "850",
    revenue: "$420",
    status: "Active",
  },
];

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toISOString().split("T")[0];
}


const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [allPayment, setAllPayment] = useState([]);

  const getAllPaymentList = async (page = 1, perPage = 10) => {
    try {
      const response = await apiGetAllPaymentsList({
        page,
        perPage,
      });

      const formattedData = response.data.list.data.map(item => ({
        ...item,
        date: formatDate(item.created_at),
      }));

      setAllPayment(formattedData);
      setItemsPerPage(response.data.list.per_page);
      const totalCount = response?.data?.list?.total;
      const per_page = response?.data?.list?.per_page;
      const calculatedPages = Math.ceil(totalCount / per_page);
      setTotalPages(calculatedPages);

    } catch (error) {
      setAllPayment([]);
    }
  };

  useEffect(() => {
    getAllPaymentList(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1)
  };

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Amount", accessor: "amount" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <div className="flex">
          <Tag variant={PAYMENT_STATUS[value]} className="!pt-1 !pb-[3px]">
            <ChildText text={value} className="!text-[#ffffff]" />
          </Tag>
        </div>
      ),
    },
    { header: "Method", accessor: "method" },
  ];

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-4">
        <PageTitle title="Payments" />
        <PageSubTitle title="Manage payment providers, transactions, and billing settings" />
      </div>
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        <div>
          <div className="bg-[#006FFF1A] mb-4 sm:mb-5 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex gap-3 sm:gap-4 items-center">
              <span className="hidden sm:inline-block">
                <PaymentProviderIcon height={24} width={24} fill="#000000" />
              </span>
              <span className="sm:hidden">
                <PaymentProviderIcon height={20} width={20} fill="#000000" />
              </span>
              <CardSubtitle type={1} subtitle="Payment Providers" />
            </div>
            <div className="text-sm sm:text-base text-[#000000]">
              Configure payment processing services
            </div>
          </div>
          <div>
            <DataDetailsTable
              rowType="MapProvider"
              companies={paymentProviderData}
              isOnActionClick={false}
            />
          </div>
        </div>
        <div className="pt-6 sm:pt-8 lg:pt-10 mt-6 sm:mt-8 lg:mt-10 border-t border-[#00000033]">
          <div className="bg-[#006FFF1A] mb-6 sm:mb-8 lg:mb-10 border border-[#00000033] py-3 sm:py-4 lg:py-[15px] px-4 sm:px-6 lg:pl-10 lg:pr-5 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex gap-3 sm:gap-4 items-center">
              <span className="hidden sm:inline-block">
                <PaymentsIcon height={24} width={24} fill="#000000" />
              </span>
              <span className="sm:hidden">
                <PaymentsIcon height={20} width={20} fill="#000000" />
              </span>
              <CardSubtitle type={1} subtitle="Recent Transactions" />
            </div>
            <div className="w-full sm:max-w-[400px] sm:w-auto">
              <SearchBar className="w-full" />
            </div>
          </div>
          <div className="bg-[#ffffff] rounded-[10px] overflow-x-auto">
            <PaymentTable columns={columns} data={allPayment} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={PAGE_SIZE_OPTIONS}
            pageKey="payments"
          />
        </div>
      </CardContainer>
    </div>
  );
};

export default Payments;
