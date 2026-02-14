import React, { useEffect, useState } from "react";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import ActiveDoneIcon from "../../../../../../components/svg/ActiveDoneIcon";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import { apiGetMapApiCount } from "../../../../../../services/CompanyService";

const CompanyOverview = ({ companyId, companyDetails }) => {
  const [overviewData, setOverviewData] = useState(null);
  const [mapApiData, setMapApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyOverview = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewResponse, mapApiResponse] = await Promise.all([
        ApiService.getCompanyDetails(companyId),
        apiGetMapApiCount({ company_id: companyId })
      ]);

      console.log("Overview API Response:", overviewResponse);
      console.log("Map API Response:", mapApiResponse);

      setOverviewData(overviewResponse?.data || null);
      setMapApiData(mapApiResponse?.data || null);
    } catch (err) {
      setError(err.message || "Failed to fetch company overview");
      console.error("Error fetching company overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyOverview();
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
          onClick={fetchCompanyOverview}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!overviewData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No company details found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "paid":
      case "success":
      case "enable":
        return "#10B981";
      case "inactive":
      case "failed":
      case "disable":
        return "#EF4444";
      case "pending":
      case "processing":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  console.log("Overview Data:", overviewData);
  console.log("Map API Data:", mapApiData);
  console.log("Company Details from Props:", companyDetails);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-2.5 mb-4 sm:mb-5">
        {/* Map API Usage - નવી API નો data */}
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Map API Usage"
            serviceName="Google Maps"
            status={{
              text: mapApiData?.success ? "Active" : "Unknown",
              color: mapApiData?.success ? "#10B981" : "#6B7280",
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={mapApiData?.success ? "#10B981" : "#6B7280"}
                />
              ),
            }}
            details={[
              {
                label: "Total Count:",
                value: mapApiData?.maps_api_count || "0",
              },
              {
                label: "Last Used:",
                value: mapApiData?.last_used || "N/A",
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

        {/* Call API Usage - જૂની API નો data */}
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Call API Usage"
            serviceName={overviewData?.data?.call_api?.call_api_name || "N/A"}
            status={{
              text: overviewData?.data?.call_api?.call_api_status || "Unknown",
              color: getStatusColor(overviewData?.data?.call_api?.call_api_status),
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={getStatusColor(overviewData?.data?.call_api?.call_api_status)}
                />
              ),
            }}
            details={[
              {
                label: "Monthly Minutes:",
                value: overviewData?.data?.call_api?.monthly_minutes || "N/A",
              },
              {
                label: "Monthly Cost:",
                value: overviewData?.data?.call_api?.monthly_cost || "N/A",
              },
              {
                label: "Last Used:",
                value: overviewData?.data?.call_api?.last_used || "N/A",
              },
            ]}
            features={["Call Recording", "Call Forwarding", "Voicemail", "SMS"]}
          />
        </div>

        {/* Payment Information - companyDetails props નો data */}
        <div className="w-full lg:w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Payment Information"
            serviceName={companyDetails?.payment_method?.toUpperCase() || "N/A"}
            status={{
              text: companyDetails?.payment_status?.toUpperCase() || "Unknown",
              color: getStatusColor(companyDetails?.payment_status),
              icon: (
                <ActiveDoneIcon
                  width={12.19}
                  height={12.19}
                  fill={getStatusColor(companyDetails?.payment_status)}
                />
              ),
            }}
            details={[
              {
                label: "Last Payment:",
                value: companyDetails?.subscription_start_date || "N/A",
              },
              {
                label: "Next Payment:",
                value: companyDetails?.expiry_date || "N/A",
              },
              {
                label: "Amount:",
                value: companyDetails?.payment_amount
                  ? `${companyDetails.currency || ""} ${companyDetails.payment_amount}`
                  : "N/A",
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
            <table className="w-full" style={{ minWidth: "600px" }}>
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
                        overviewData?.data?.usage_statistic?.total_booking ||
                        "N/A"
                      }
                      className="!text-[#3D3D3D]"
                    />
                  </td>
                  <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                    <ChildText
                      size="md"
                      text={
                        overviewData?.data?.usage_statistic?.active_drivers ||
                        "N/A"
                      }
                      className="!text-[#3D3D3D]"
                    />
                  </td>
                  <td className="px-4 sm:px-[30px] py-3 sm:py-5">
                    <ChildText
                      size="md"
                      text={
                        overviewData?.data?.usage_statistic?.last_payment ||
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