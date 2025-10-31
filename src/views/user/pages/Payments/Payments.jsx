import React from "react";
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

const Payments = () => {
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

  const data = [
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "online" },
    { date: "2024-12-01", amount: "$199", status: "Failed", method: "$199" },
    {
      date: "2024-12-01",
      amount: "$199",
      status: "Processing",
      method: "$199",
    },
    { date: "2024-12-01", amount: "$199", status: "Pending", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
    { date: "2024-12-01", amount: "$199", status: "Paid", method: "$199" },
  ];
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Payments" />
          {/* <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <MonthlyRevenueIcon width={24} height={24} fill="#ffffff" />
              <span>Test Connection</span>
            </div>
          </Button> */}
        </div>
        <div>
          <PageSubTitle title="Manage payment providers, transactions, and billing settings" />
        </div>
      </div>
      <CardContainer className="p-5">
        <div>
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <PaymentProviderIcon height={24} width={24} fill="#000000" />
              <CardSubtitle type={1} subtitle="Payment Providers" />
            </div>
            <div className="text-[#000000]">
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
        <div className="pt-10 mt-10 border-t border-[#00000033]">
          <div className="bg-[#006FFF1A] mb-10 border border-[#00000033] py-[15px] pl-10 pr-5 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <PaymentsIcon height={24} width={24} fill="#000000" />
              <CardSubtitle type={1} subtitle="Recent Transactions" />
            </div>
            <div className="max-w-[400px] w-full">
              <SearchBar />
            </div>
          </div>
          <div className="bg-[#ffffff] rounded-[10px]">
            <PaymentTable columns={columns} data={data} />
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default Payments;
