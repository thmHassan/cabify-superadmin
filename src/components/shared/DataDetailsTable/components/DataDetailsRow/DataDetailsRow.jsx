import SubscriptionTableRow from "../SubscriptionTableRow";
import SystemAnalyticsTableRow from "../SystemAnalyticsTableRow";
import UsageMonitoringTableRow from "../UsageMonitoringTableRow";

const TABLE_ROW_CONFIG = {
  subscription: SubscriptionTableRow,
  usageMonitoring: UsageMonitoringTableRow,
  systemAnalytics: SystemAnalyticsTableRow,
};

const DataDetailsRow = ({ type = "subscription", ...props }) => {
  const Row = TABLE_ROW_CONFIG[type];
  return <Row {...props} />;
};

export default DataDetailsRow;
