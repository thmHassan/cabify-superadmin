import { useEffect, useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import Button from "../../../../components/ui/Button/Button";
import CardContainer from "../../../../components/shared/CardContainer";
import SettingIcon from "../../../../components/svg/SettingIcon";
import {
  apiGetAppMaintenance,
  apiUpdateAppMaintenance,
} from "../../../../services/AppMaintenanceService";

const DEFAULT_MESSAGE = "Now this app is under maintenance";

const toLocalDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const toApiDateTime = (value) => (value ? new Date(value).toISOString() : null);

const AppToggle = ({ title, description, enabled, onChange, disabled }) => (
  <div className="flex min-h-[112px] items-center justify-between gap-5 border-b border-[#E5E7EB] py-5 last:border-b-0">
    <div>
      <h3 className="text-base font-semibold text-[#252525]">{title}</h3>
      <p className="mt-1 text-sm text-[#6C6C6C]">{description}</p>
      <span className={`mt-2 inline-block text-xs font-semibold ${enabled ? "text-[#10B981]" : "text-[#DC2626]"}`}>
        {enabled ? "App enabled" : "Maintenance active"}
      </span>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={`${title} ${enabled ? "enabled" : "under maintenance"}`}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${enabled ? "bg-[#10B981]" : "bg-[#DC2626]"}`}
    >
      <span className={`inline-block h-[27px] w-[27px] rounded-full bg-white shadow-md transition-transform ${enabled ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  </div>
);

const AppMaintenance = () => {
  const [form, setForm] = useState({
    driver_app: "enable",
    customer_app: "enable",
    message: DEFAULT_MESSAGE,
    starts_at: "",
    ends_at: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const applySetting = (setting) => {
    setForm({
      driver_app: setting?.driver_app || "enable",
      customer_app: setting?.customer_app || "enable",
      message: setting?.message || DEFAULT_MESSAGE,
      starts_at: toLocalDateTime(setting?.starts_at),
      ends_at: toLocalDateTime(setting?.ends_at),
    });
  };

  const loadSetting = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiGetAppMaintenance();
      applySetting(response?.data?.setting);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load maintenance settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSetting();
  }, []);

  const setAppEnabled = (field, enabled) => {
    setForm((current) => ({
      ...current,
      [field]: enabled ? "enable" : "disable",
    }));
  };

  const handleSave = async () => {
    setError("");
    if (form.starts_at && form.ends_at && new Date(form.ends_at) < new Date(form.starts_at)) {
      setError("End time must be after the start time.");
      return;
    }

    setSaving(true);
    try {
      const response = await apiUpdateAppMaintenance({
        ...form,
        message: form.message.trim() || DEFAULT_MESSAGE,
        starts_at: toApiDateTime(form.starts_at),
        ends_at: toApiDateTime(form.ends_at),
      });
      applySetting(response?.data?.setting);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update maintenance settings.");
    } finally {
      setSaving(false);
    }
  };

  const maintenanceSelected = form.driver_app === "disable" || form.customer_app === "disable";

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-5 sm:min-h-[calc(100vh-85px)] sm:p-6 lg:p-7 2xl:p-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2.5">
          <PageTitle title="App Maintenance" />
          <PageSubTitle title="Control customer and driver app availability for all companies" />
        </div>
        <div className={`rounded-md px-4 py-2 text-sm font-semibold ${maintenanceSelected ? "bg-[#FEE2E2] text-[#B91C1C]" : "bg-[#D1FAE5] text-[#047857]"}`}>
          {maintenanceSelected ? "Maintenance selected" : "All apps enabled"}
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">{error}</div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]">
        <CardContainer className="p-5 sm:p-6">
          <div className="flex items-center gap-3 border-b border-[#D1D5DB] pb-4">
            <SettingIcon width={24} height={24} fill="#252525" />
            <div>
              <h2 className="text-lg font-semibold text-[#252525]">App availability</h2>
              <p className="text-sm text-[#6C6C6C]">Changes apply globally across every company.</p>
            </div>
          </div>
          <AppToggle title="Customer App" description="Controls access for all riders and customers." enabled={form.customer_app === "enable"} onChange={(enabled) => setAppEnabled("customer_app", enabled)} disabled={loading || saving} />
          <AppToggle title="Driver App" description="Controls access for all drivers." enabled={form.driver_app === "enable"} onChange={(enabled) => setAppEnabled("driver_app", enabled)} disabled={loading || saving} />
        </CardContainer>

        <CardContainer className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#252525]">Maintenance message</h2>
          <p className="mt-1 text-sm text-[#6C6C6C]">This message is shown when maintenance is active.</p>
          <textarea
            value={form.message}
            maxLength={255}
            disabled={loading || saving}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="mt-4 min-h-[116px] w-full resize-y rounded-md border border-[#C5C5C5] px-4 py-3 text-sm text-[#252525] outline-none focus:border-[#1F41BB] disabled:bg-[#F3F4F6]"
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <label className="text-sm font-semibold text-[#252525]">
              Start time <span className="font-normal text-[#8D8D8D]">(optional)</span>
              <input type="datetime-local" value={form.starts_at} disabled={loading || saving} onChange={(event) => setForm((current) => ({ ...current, starts_at: event.target.value }))} className="mt-2 h-11 w-full rounded-md border border-[#C5C5C5] px-3 font-normal outline-none focus:border-[#1F41BB] disabled:bg-[#F3F4F6]" />
            </label>
            <label className="text-sm font-semibold text-[#252525]">
              End time <span className="font-normal text-[#8D8D8D]">(optional)</span>
              <input type="datetime-local" value={form.ends_at} disabled={loading || saving} onChange={(event) => setForm((current) => ({ ...current, ends_at: event.target.value }))} className="mt-2 h-11 w-full rounded-md border border-[#C5C5C5] px-3 font-normal outline-none focus:border-[#1F41BB] disabled:bg-[#F3F4F6]" />
            </label>
          </div>
        </CardContainer>
      </div>

      <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button type="outline" btnSize="md" disabled={loading || saving} onClick={loadSetting} className="w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">Refresh</Button>
        <Button type="filled" btnSize="md" disabled={loading || saving} onClick={handleSave} className="w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">{saving ? "Saving..." : "Save settings"}</Button>
      </div>
    </div>
  );
};

export default AppMaintenance;
