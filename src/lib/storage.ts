import { AppSettings, DEFAULT_SETTINGS, Invoice } from "@/lib/types";
const KEY = "notpad.invoices.v1";
const SETTINGS_KEY = "notpad.settings.v1";
function readAll(): Invoice[] {
 if (typeof window === "undefined") return [];
 try { const raw=window.localStorage.getItem(KEY); return raw ? JSON.parse(raw) as Invoice[] : []; } catch { return []; }
}
function writeAll(rows:Invoice[]) { window.localStorage.setItem(KEY,JSON.stringify(rows)); }
export function getInvoices():Invoice[]{return readAll().sort((a,b)=>(b.created_at||"").localeCompare(a.created_at||""));}
export function getInvoice(id:string):Invoice|undefined{return readAll().find(row=>row.id===id);}
export function saveInvoice(invoice:Invoice):Invoice{
 const rows=readAll();const saved:Invoice={...invoice,id:invoice.id||(typeof crypto!=="undefined"&&"randomUUID"in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`),created_at:invoice.created_at||new Date().toISOString()};
 const index=rows.findIndex(row=>row.id===saved.id);if(index>=0)rows[index]=saved;else rows.unshift(saved);writeAll(rows);return saved;
}
export function deleteInvoice(id:string):void{writeAll(readAll().filter(row=>row.id!==id));}
export function getSettings():AppSettings{
 if(typeof window==="undefined")return DEFAULT_SETTINGS;
 try{return {...DEFAULT_SETTINGS,...JSON.parse(window.localStorage.getItem(SETTINGS_KEY)||"{}")};}catch{return DEFAULT_SETTINGS;}
}
export function saveSettings(settings:AppSettings):void{window.localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}
export function exportBackup():string{return JSON.stringify({version:1,exported_at:new Date().toISOString(),settings:getSettings(),invoices:getInvoices()},null,2);}
export function importBackup(raw:string):number{
 const data=JSON.parse(raw);if(!Array.isArray(data.invoices))throw new Error("File cadangan tidak memiliki daftar nota yang valid.");
 const valid=data.invoices.filter((x:Invoice)=>x&&typeof x.id==="string"&&typeof x.invoice_number==="string");
 writeAll(valid);if(data.settings&&typeof data.settings==="object")saveSettings({...DEFAULT_SETTINGS,...data.settings});return valid.length;
}
