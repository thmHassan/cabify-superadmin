import React, { useEffect, useState } from "react";
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

  const fetchCompanyDetails = async () => {
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
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  if (loading) {
    return <AppLogoLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchCompanyDetails}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No payment history found</p>
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

  return <PaymentTable columns={columns} data={data} />;
};

export default CompanyPaymentHistory;
