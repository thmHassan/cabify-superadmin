import React, { useEffect, useState, useCallback } from "react";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Tag from "../../../../../../components/ui/Tag";
import PaymentTable from "../../../../../../components/shared/PaymentTable";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import { apiGetCompanyPaymentHistoryById } from "../../../../../../services/CompanyService";

const PAYMENT_STATUS = {
  paid: "green",
  failed: "red",
  pending: "yellow",
  processing: "lightPurple",
};

const CompanyPaymentHistory = ({ companyId }) => {
  const [companyPaymentHistory, setCompanyPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPaymentHistoryDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiGetCompanyPaymentHistoryById({ user_id: companyId })
      setCompanyPaymentHistory(response.data.list)
    } catch (err) {
      setError(err.message || "Failed to fetch company details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (companyId) {
      getPaymentHistoryDetails()
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12">
        <AppLogoLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 sm:py-8 px-4">
        <p className="text-red-500 text-sm sm:text-base mb-3 sm:mb-4">
          Error: {error}
        </p>
        <button
          onClick={getPaymentHistoryDetails}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1F41BB] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#1a3599] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!companyPaymentHistory) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-sm sm:text-base">
          No payment history found
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0]; // formats to YYYY-MM-DD
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

  const data = companyPaymentHistory.map((payment) => ({
    date: formatDate(payment.created_at),
    amount: payment.amount || "N/A",
    status: payment.status || "Unknown",
    method: payment.method || "N/A",
  }));

  return (
    <div className="w-full overflow-x-auto">
      <PaymentTable columns={columns} data={data} />
    </div>
  );
};

export default CompanyPaymentHistory;
