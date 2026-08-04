import Button from "../../../../../../components/ui/Button/Button";

const STATUS = {
  active: { label: "Active", className: "bg-[#D1FAE5] text-[#047857]" },
  expiring_soon: { label: "Expiring Soon", className: "bg-[#FEF3C7] text-[#B45309]" },
  expires_today: { label: "Expires Today", className: "bg-[#FEE2E2] text-[#B91C1C]" },
  payment_pending: { label: "Payment Pending", className: "bg-[#FEF3C7] text-[#B45309]" },
  expired: { label: "Expired", className: "bg-[#FEE2E2] text-[#B91C1C]" },
};

const valueOrDash = (value) => value || "—";

const paymentMethod = (value) => {
  const method = String(value || "").toLowerCase();
  if (method === "stripe" || method === "card") return "Online";
  if (method === "cash") return "Cash";
  return valueOrDash(value);
};

const remainingLabel = (item) => {
  const days = Number(item.days_remaining);
  if (item.days_remaining === null || item.days_remaining === undefined) return "—";
  if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
  if (days === 0) return "Expires today";
  return `${days} day${days === 1 ? "" : "s"} left`;
};

const StatusBadge = ({ status }) => {
  const config = STATUS[status] || STATUS.active;
  return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}>{config.label}</span>;
};

const SubscriptionManagementTable = ({ items, loading, onExtend }) => {
  if (loading) {
    return <div className="flex min-h-52 items-center justify-center text-sm text-[#6C6C6C]">Loading subscriptions...</div>;
  }

  if (!Array.isArray(items) || items.length === 0) {
    return <div className="min-h-52 p-12 text-center text-[#6C6C6C]">No active subscriptions found.</div>;
  }

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1450px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs font-semibold uppercase tracking-wide text-[#6C6C6C]">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Expiry Date</th>
              <th className="px-4 py-3">Remaining</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="bg-white text-[#252525] shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <td className="rounded-l-xl px-4 py-5 font-semibold">{valueOrDash(item.company_name)}</td>
                <td className="px-4 py-5">{valueOrDash(item.subscription?.plan_name)}</td>
                <td className="px-4 py-5">{valueOrDash(item.phone || item.email)}</td>
                <td className="px-4 py-5">{valueOrDash(item.city)}</td>
                <td className="px-4 py-5">{paymentMethod(item.payment_method)}</td>
                <td className="px-4 py-5 whitespace-nowrap">{valueOrDash(item.subscription_start_date)}</td>
                <td className="px-4 py-5 whitespace-nowrap">{valueOrDash(item.expiry_date)}</td>
                <td className="px-4 py-5 whitespace-nowrap font-semibold">{remainingLabel(item)}</td>
                <td className="px-4 py-5 whitespace-nowrap font-semibold">{item.formatted_payment_amount || `${item.currency || ""} ${item.payment_amount || 0}`}</td>
                <td className="px-4 py-5"><StatusBadge status={item.subscription_status} /></td>
                <td className="rounded-r-xl px-4 py-5"><Button type="outline" btnSize="md" onClick={() => onExtend(item)}>Extend</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] pb-3">
              <div><h3 className="font-semibold text-[#252525]">{valueOrDash(item.company_name)}</h3><p className="mt-1 text-sm text-[#6C6C6C]">{valueOrDash(item.subscription?.plan_name)}</p></div>
              <StatusBadge status={item.subscription_status} />
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {[
                ["Contact", item.phone || item.email],
                ["Location", item.city],
                ["Payment Method", paymentMethod(item.payment_method)],
                ["Start Date", item.subscription_start_date],
                ["Expiry Date", item.expiry_date],
                ["Remaining", remainingLabel(item)],
                ["Amount", item.formatted_payment_amount || `${item.currency || ""} ${item.payment_amount || 0}`],
              ].map(([label, value]) => <div key={label} className="rounded-lg bg-[#F8FAFC] p-3"><dt className="text-xs font-medium text-[#6C6C6C]">{label}</dt><dd className="mt-1 font-semibold text-[#252525]">{valueOrDash(value)}</dd></div>)}
            </dl>
            <Button type="outline" btnSize="md" className="mt-4 w-full" onClick={() => onExtend(item)}>Extend Subscription</Button>
          </article>
        ))}
      </div>
    </>
  );
};

export default SubscriptionManagementTable;
