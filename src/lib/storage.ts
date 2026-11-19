import { AppSettings, DEFAULT_SETTINGS, Invoice } from "@/lib/types";

// Local-first storage contract. The current web adapter is localStorage.
// Capacitor builds can replace this adapter with SQLite without changing pages.
export type LocalRepository = {
  getInvoices(): Invoice[];
  getInvoice(id: string): Invoice | undefined;
  saveInvoice(invoice: Invoice): Invoice;
  deleteInvoice(id: string): void;
};
const KEY = "notpad.invoices.v1";
const SETTINGS_KEY = "notpad.settings.v1";
const SCHEMA_KEY = "notpad.local.schema";
const CURRENT_SCHEMA = 2;
function ensureSchema() {
  if (typeof window === "undefined") return;
  const version = Number(window.localStorage.getItem(SCHEMA_KEY) || 1);
  if (version < 2) {
    // v1 invoices are structurally compatible; add safe defaults for future fields.
    const rows = readAll();
    const migrated = rows.map((row) => ({ ...row, paid: Number(row.paid || 0), discount: Number(row.discount || 0), items: Array.isArray(row.items) ? row.items : [] }));
    window.localStorage.setItem(KEY, JSON.stringify(migrated));
    window.localStorage.setItem(SCHEMA_KEY, String(CURRENT_SCHEMA));
  }
}
function readAll(): Invoice[] {
  if (typeof window === "undefined") return [];
  try { const raw = window.localStorage.getItem(KEY); return raw ? JSON.parse(raw) as Invoice[] : []; } catch { return []; }
}
function writeAll(rows: Invoice[]) { window.localStorage.setItem(KEY, JSON.stringify(rows)); }
const browserRepository: LocalRepository = {
  getInvoices() { ensureSchema(); return readAll().sort((a,b)=>(b.created_at||"").localeCompare(a.created_at||"")); },
  getInvoice(id) { ensureSchema(); return readAll().find(row => row.id === id); },
  saveInvoice(invoice) {
    ensureSchema(); const rows = readAll();
    const saved: Invoice = { ...invoice, id: invoice.id || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`), created_at: invoice.created_at || new Date().toISOString() };
    const index = rows.findIndex(row => row.id === saved.id); if (index >= 0) rows[index] = saved; else rows.unshift(saved); writeAll(rows); return saved;
  },
  deleteInvoice(id) { ensureSchema(); writeAll(readAll().filter(row => row.id !== id)); }
};
export const getInvoices = () => browserRepository.getInvoices();
export const getInvoice = (id: string) => browserRepository.getInvoice(id);
export const saveInvoice = (invoice: Invoice) => browserRepository.saveInvoice(invoice);
export const deleteInvoice = (id: string) => browserRepository.deleteInvoice(id);
export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || "{}") }; } catch { return DEFAULT_SETTINGS; }
}
export function saveSettings(settings: AppSettings): void { window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
export function exportBackup(): string { return JSON.stringify({ version: CURRENT_SCHEMA, exported_at: new Date().toISOString(), settings: getSettings(), invoices: getInvoices() }, null, 2); }
export function importBackup(raw: string): number {
  const data = JSON.parse(raw); if (!Array.isArray(data.invoices)) throw new Error("File cadangan tidak memiliki daftar nota yang valid.");
  const valid = data.invoices.filter((x: Invoice) => x && typeof x.id === "string" && typeof x.invoice_number === "string");
  writeAll(valid); if (data.settings && typeof data.settings === "object") saveSettings({ ...DEFAULT_SETTINGS, ...data.settings });
  if (typeof window !== "undefined") window.localStorage.setItem(SCHEMA_KEY, String(CURRENT_SCHEMA)); return valid.length;
}
