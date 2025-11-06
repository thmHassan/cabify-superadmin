import React, { useEffect, useState } from "react";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../../../components/shared/CardContainer";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import ActiveDoneIcon from "../../../../../../components/svg/ActiveDoneIcon";
import Tag from "../../../../../../components/ui/Tag";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const CompanyOverview = ({ companyId = "test2" }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <p className="text-gray-500">No company details found</p>
      </div>
    );
  }
  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "paid":
        return "#10B981";
      case "inactive":
      case "failed":
        return "#EF4444";
      case "pending":
      case "processing":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };
  console.log(companyDetails, "companyDetails");
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-2.5 mb-4 sm:mb-5">
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Map API Usage"
            serviceName={companyDetails?.data?.map_api?.map_api_name || "N/A"}
            status={{
              text: companyDetails?.data?.map_api?.map_api_status || "Unknown",
              color: getStatusColor(
                companyDetails?.data?.map_api?.map_api_status
              ),
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={getStatusColor(
                    companyDetails?.data?.map_api?.map_api_status
                  )}
                />
              ),
            }}
            details={[
              {
                label: "Monthly Requests:",
                value: companyDetails?.data?.map_api?.monthly_request || "N/A",
              },
              {
                label: "Monthly Cost:",
                value: companyDetails?.data?.map_api?.monthly_cost || "N/A",
              },
              {
                label: "Last Used:",
                value: companyDetails?.data?.map_api?.last_used || "N/A",
              },
            ]}
            features={[
              "Real-time Traffic",
              "Satellite View",
              "Street View",
              "Geocoding",
            ]}
          />
        </div>
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Call API Usage"
            serviceName={companyDetails?.data?.call_api?.call_api_name || "N/A"}
            status={{
              text:
                companyDetails?.data?.call_api?.call_api_status || "Unknown",
              color: getStatusColor(
                companyDetails?.data?.call_api?.call_api_status
              ),
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={getStatusColor(
                    companyDetails?.data?.call_api?.call_api_status
                  )}
                />
              ),
            }}
            details={[
              {
                label: "Monthly Minutes:",
                value: companyDetails?.data?.call_api?.monthly_minutes || "N/A",
              },
              {
                label: "Monthly Cost:",
                value: companyDetails?.data?.call_api?.monthly_cost || "N/A",
              },
              {
                label: "Last Used:",
                value: companyDetails?.data?.call_api?.last_used || "N/A",
              },
            ]}
            features={["Call Recording", "Call Forwarding", "Voicemail", "SMS"]}
          />
        </div>
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Payment Information"
            serviceName={
              companyDetails?.data?.payment_info?.payment_mode || "N/A"
            }
            status={{
              text:
                companyDetails?.data?.payment_info?.payment_status || "Unknown",
              color: getStatusColor(
                companyDetails?.data?.payment_info?.payment_status
              ),
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={getStatusColor(
                    companyDetails?.data?.payment_info?.payment_status
                  )}
                />
              ),
            }}
            details={[
              {
                label: "Last Payment:",
                value:
                  companyDetails?.data?.payment_info?.last_payment || "N/A",
              },
              {
                label: "Next Payment:",
                value:
                  companyDetails?.data?.payment_info?.next_payment || "N/A",
              },
              {
                label: "Amount:",
                value: companyDetails?.data?.payment_info?.amount || "N/A",
              },
            ]}
          />
        </div>
      </div>
      <div>
        <div className="mb-4 sm:mb-5">
          <h4 className="text-[#000000] text-lg sm:text-xl lg:text-[22px] leading-7 sm:leading-8 lg:leading-[30px] font-semibold text-center">
            Usage Statistics
          </h4>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="border-[0.5px] border-[#00000050] rounded-[10px] inline-block min-w-full">
            <table className="w-full" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th className="text-left bg-[#F5F7F9] pt-4 sm:pt-5 pb-4 sm:pb-[18px] px-4 sm:px-[30px]">
                  <ChildText
                    size="md"
                    text="Monthly Growth"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-4 sm:pt-5 pb-4 sm:pb-[18px] px-4 sm:px-[30px]">
                  <ChildText
                    size="md"
                    text="Total Booking"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-4 sm:pt-5 pb-4 sm:pb-[18px] px-4 sm:px-[30px]">
                  <ChildText
                    size="md"
                    text="Active Drivers"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-4 sm:pt-5 pb-4 sm:pb-[18px] px-4 sm:px-[30px]">
                  <ChildText
                    size="md"
                    text="Customer Rating"
                    className="!text-[#00000080]"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                  <ChildText
                    size="md"
                    text="+12%"
                    className="!text-[#10B981]"
                  />
                </td>
                <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                  <ChildText
                    size="md"
                    text={
                      companyDetails?.data?.usage_statistic?.total_booking ||
                      "N/A"
                    }
                    className="!text-[#3D3D3D]"
                  />
                </td>
                <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                  <ChildText
                    size="md"
                    text={
                      companyDetails?.data?.usage_statistic?.active_drivers ||
                      "N/A"
                    }
                    className="!text-[#3D3D3D]"
                  />
                </td>
                <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                  <ChildText
                    size="md"
                    text={
                      companyDetails?.data?.usage_statistic?.last_payment ||
                      "N/A"
                    }
                    className="!text-[#3D3D3D]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
