export type PaperSize = "A4" | "A5" | "80mm" | "58mm";
export type InvoiceItem = { id:string; name:string; qty:number; price:number };
export type Invoice = {
 id:string; invoice_number:string; buyer_name:string; buyer_phone:string; buyer_address:string;
 vehicle:string; plate_number:string; invoice_date:string; paper_size:PaperSize;
 workshop_name:string; workshop_address:string; workshop_phone:string; discount:number;
 paid:number; payment_method:string; note:string; items:InvoiceItem[]; created_at:string;
};
export const money = (n:number) => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);
export const totalOf = (items:InvoiceItem[]) => items.reduce((s,x)=>s+(Number(x.qty)||0)*(Number(x.price)||0),0);
