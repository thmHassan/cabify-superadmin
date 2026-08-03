import { useEffect, useMemo, useState } from "react";
import Button from "../../../../components/ui/Button/Button";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import Modal from "../../../../components/shared/Modal";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import {
  apiCreateCurrency,
  apiGetCurrencies,
  apiUpdateCurrency,
  apiUpdateCurrencyStatus,
} from "../../../../services/CurrencyService";

const EMPTY_FORM = {
  code: "",
  name: "",
  symbol: "",
  decimal_places: 2,
  symbol_position: "before",
  is_active: true,
  exchange_enabled: true,
  stripe_enabled: true,
  sort_order: 0,
};

const Toggle = ({ checked, onChange, disabled, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${checked ? "bg-[#10B981]" : "bg-[#C5C5C5]"}`}
  >
    <span className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`} />
  </button>
);

const inputClass = "mt-2 h-11 w-full rounded-lg border border-[#C5C5C5] px-3 text-sm outline-none focus:border-[#1F41BB] disabled:bg-[#F3F4F6]";

const CurrencyManagement = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadCurrencies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiGetCurrencies();
      setCurrencies(response?.data?.currencies || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load currencies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCurrencies(); }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return currencies;
    return currencies.filter((currency) => `${currency.code} ${currency.name} ${currency.symbol}`.toLowerCase().includes(term));
  }, [currencies, search]);

  const openCreate = () => {
    setEditing({ type: "create" });
    setForm(EMPTY_FORM);
    setError("");
  };

  const openEdit = (currency) => {
    setEditing(currency);
    setForm({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      decimal_places: currency.decimal_places,
      symbol_position: currency.symbol_position,
      is_active: currency.is_active,
      exchange_enabled: currency.exchange_enabled,
      stripe_enabled: currency.stripe_enabled,
      sort_order: currency.sort_order,
    });
    setError("");
  };

  const saveCurrency = async () => {
    setError("");
    if (!/^[A-Z]{3}$/.test(form.code) || !form.name.trim() || !form.symbol.trim()) {
      setError("Enter a 3-letter ISO code, currency name, and symbol.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        symbol: form.symbol.trim(),
        decimal_places: Number(form.decimal_places),
        sort_order: Number(form.sort_order || 0),
      };
      if (editing?.type === "create") await apiCreateCurrency(payload);
      else await apiUpdateCurrency(editing.id, payload);
      setEditing(null);
      await loadCurrencies();
    } catch (err) {
      const validation = err?.response?.data?.errors;
      setError(validation ? Object.values(validation).flat()[0] : err?.response?.data?.message || "Unable to save currency.");
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (currency, isActive) => {
    setError("");
    try {
      await apiUpdateCurrencyStatus(currency.id, isActive);
      setCurrencies((current) => current.map((item) => item.id === currency.id ? { ...item, is_active: isActive } : item));
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update currency status.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-5 sm:p-6 lg:p-7 2xl:p-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2.5">
          <PageTitle title="Currency Management" />
          <PageSubTitle title="Manage company currencies, symbols, formatting, and provider availability" />
        </div>
        <Button type="filled" btnSize="md" onClick={openCreate} className="w-full sm:w-auto">+ Add Currency</Button>
      </div>

      {error && <div className="mb-5 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">{error}</div>}

      <CardContainer className="overflow-hidden">
        <div className="border-b border-[#E5E7EB] p-4 sm:p-5">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by code, name, or symbol..." className="h-11 w-full max-w-md rounded-lg border border-[#C5C5C5] px-4 text-sm outline-none focus:border-[#1F41BB]" />
        </div>
        {loading ? (
          <div className="flex min-h-64 items-center justify-center"><AppLogoLoader /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-[#6C6C6C]">No currencies found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-[#F8FAFC] text-[#6C6C6C]"><tr><th className="px-5 py-4">Currency</th><th className="px-5 py-4">Display</th><th className="px-5 py-4">Decimals</th><th className="px-5 py-4">Exchange</th><th className="px-5 py-4">Stripe</th><th className="px-5 py-4">Active</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
              <tbody>
                {filtered.map((currency) => (
                  <tr key={currency.id} className="border-t border-[#E5E7EB] text-[#252525]">
                    <td className="px-5 py-4"><div className="font-semibold">{currency.code}</div><div className="text-xs text-[#6C6C6C]">{currency.name}</div></td>
                    <td className="px-5 py-4 font-semibold">{currency.symbol_position === "after" ? `1,000.00 ${currency.symbol}` : `${currency.symbol}1,000.00`}</td>
                    <td className="px-5 py-4">{currency.decimal_places}</td>
                    <td className="px-5 py-4"><span className={currency.exchange_enabled ? "text-[#047857]" : "text-[#9CA3AF]"}>{currency.exchange_enabled ? "Enabled" : "Disabled"}</span></td>
                    <td className="px-5 py-4"><span className={currency.stripe_enabled ? "text-[#047857]" : "text-[#9CA3AF]"}>{currency.stripe_enabled ? "Enabled" : "Disabled"}</span></td>
                    <td className="px-5 py-4"><Toggle checked={currency.is_active} onChange={(value) => changeStatus(currency, value)} label={`${currency.code} status`} /></td>
                    <td className="px-5 py-4 text-right"><Button type="outline" btnSize="md" onClick={() => openEdit(currency)}>Edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContainer>

      <Modal isOpen={Boolean(editing)} size="md" className="w-full p-5 sm:p-7">
        <h2 className="text-xl font-semibold text-[#252525]">{editing?.type === "create" ? "Add Currency" : `Edit ${form.code}`}</h2>
        <p className="mt-1 text-sm text-[#6C6C6C]">Currency codes cannot be changed after creation.</p>
        {error && <div className="mt-4 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">{error}</div>}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">ISO code<input value={form.code} maxLength={3} disabled={editing?.type !== "create"} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value.toUpperCase().replace(/[^A-Z]/g, "") }))} className={inputClass} placeholder="USD" /></label>
          <label className="text-sm font-semibold">Name<input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} placeholder="US Dollar" /></label>
          <label className="text-sm font-semibold">Symbol<input value={form.symbol} maxLength={12} onChange={(event) => setForm((current) => ({ ...current, symbol: event.target.value }))} className={inputClass} placeholder="$" /></label>
          <label className="text-sm font-semibold">Decimal places<input type="number" min="0" max="4" value={form.decimal_places} onChange={(event) => setForm((current) => ({ ...current, decimal_places: event.target.value }))} className={inputClass} /></label>
          <label className="text-sm font-semibold">Symbol position<select value={form.symbol_position} onChange={(event) => setForm((current) => ({ ...current, symbol_position: event.target.value }))} className={inputClass}><option value="before">Before amount</option><option value="after">After amount</option></select></label>
          <label className="text-sm font-semibold">Sort order<input type="number" min="0" max="9999" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} className={inputClass} /></label>
        </div>
        <div className="mt-5 grid gap-3 rounded-lg bg-[#F8FAFC] p-4 sm:grid-cols-3">
          {[['is_active', 'Active'], ['exchange_enabled', 'Exchange API'], ['stripe_enabled', 'Stripe']].map(([field, label]) => (
            <div key={field} className="flex items-center justify-between gap-3 sm:flex-col sm:items-start"><span className="text-sm font-semibold">{label}</span><Toggle checked={form[field]} onChange={(value) => setForm((current) => ({ ...current, [field]: value }))} label={label} /></div>
          ))}
        </div>
        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button type="filledGray" btnSize="md" disabled={saving} onClick={() => { setEditing(null); setError(""); }}>Cancel</Button>
          <Button type="filled" btnSize="md" disabled={saving} onClick={saveCurrency}>{saving ? "Saving..." : "Save Currency"}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CurrencyManagement;
