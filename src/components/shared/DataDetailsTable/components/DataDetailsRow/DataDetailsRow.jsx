import ApiKeyRowFields from "../ApiKeyRowFields";
import DriverDocumentsRowFields from "../DriverDocumentsRowFields";
import MapProviderRowField from "../MapProviderRowField";
import PendingSubscriptionTableRow from "../PendingSubscriptionTableRow";
import SubAdminManagementRowFields from "../SubAdminManagementRowFields";
import SubscriptionManagementRow from "../SubscriptionManagement";
import SubscriptionTableRow from "../SubscriptionTableRow";
import SystemAnalyticsTableRow from "../SystemAnalyticsTableRow";
import UsageMonitoringTableRow from "../UsageMonitoringTableRow";
import VehicleTypeFields from "../VehicleTypeFields";

const DataDetailsRow = ({ type = "subscription", ...props }) => {
  const TABLE_ROW_CONFIG = {
    company: (props) => <SubscriptionTableRow type="company" {...props} />,
    pendingsubscription: (props) => (
      <PendingSubscriptionTableRow type="pendingsubscription" {...props} />
    ),
    subscription: (props) => (
      <SubscriptionTableRow type="subscription" {...props} />
    ),
    managementsubscription: (props) => (
      <SubscriptionManagementRow type="managementsubscription" {...props} />
    ),
    // Backwards compatibility with previous camelCase naming
    subscriptionManagement: (props) => (
      <SubscriptionManagementRow type="managementsubscription" {...props} />
    ),
    usageMonitoring: UsageMonitoringTableRow,
    systemAnalytics: SystemAnalyticsTableRow,
    driverDocuments: DriverDocumentsRowFields,
    vehicleType: VehicleTypeFields,
    subAdminManagement: SubAdminManagementRowFields,
    ApiKeys: ApiKeyRowFields,
    MapProvider: MapProviderRowField,
  };

  const Row = TABLE_ROW_CONFIG[type];

  if (!Row) {
    console.warn(`Unknown DataDetailsRow type: ${type}`);
    return null;
  }

  return <Row {...props} />;
};

export default DataDetailsRow;
