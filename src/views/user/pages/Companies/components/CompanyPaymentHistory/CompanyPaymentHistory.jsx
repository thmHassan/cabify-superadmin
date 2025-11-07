import React, { useEffect, useState, useCallback } from "react";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Tag from "../../../../../../components/ui/Tag";
import PaymentTable from "../../../../../../components/shared/PaymentTable";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const PAYMENT_STATUS = {
  paid: "green",
  failed: "red",
  pending: "yellow",
  processing: "lightPurple",
};

const CompanyPaymentHistory = ({ companyId }) => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getCompanyDetails(companyId);
      setCompanyDetails(response?.data || null);
    } catch (err) {
      setError(err.message || "Failed to fetch company details");
      console.error("Error fetching company details:", err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId, fetchCompanyDetails]);

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
          onClick={fetchCompanyDetails}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1F41BB] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#1a3599] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-sm sm:text-base">
          No payment history found
        </p>
      </div>
    );
  }
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

  const paymentHistory = companyDetails?.data?.payment_history || [];

  const data = paymentHistory.map((payment) => ({
    date: payment.date || "N/A",
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
