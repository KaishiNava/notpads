export type PaperSize = "A4" | "A5" | "80mm" | "58mm";
export type InvoiceItem = { id:string; name:string; qty:number; price:number };
export type Invoice = {
 id:string; invoice_number:string; buyer_name:string; buyer_phone:string; buyer_address:string;
 vehicle:string; plate_number:string; invoice_date:string; paper_size:PaperSize;
 workshop_name:string; workshop_address:string; workshop_phone:string; discount:number;
 paid:number; payment_method:string; note:string; items:InvoiceItem[]; created_at:string;
 workshop_logo?:string; workshop_footer?:string; show_vehicle?:boolean; show_buyer_address?:boolean; signature_label?:string;
};
export type AppSettings = {
 workshop_name:string; workshop_address:string; workshop_phone:string;
 logo_data_url:string; default_paper_size:PaperSize; footer_text:string;
 signature_label:string; invoice_prefix:string; show_vehicle:boolean; show_buyer_address:boolean;
};
export const DEFAULT_SETTINGS:AppSettings = {
 workshop_name:"BENGKEL HONDA", workshop_address:"", workshop_phone:"",
 logo_data_url:"/honda-logo.png", default_paper_size:"A4",
 footer_text:"Terima kasih atas kepercayaan Anda.\nSemoga perjalanan Anda selalu aman.",
 signature_label:"Hormat kami,", invoice_prefix:"BH", show_vehicle:true, show_buyer_address:true
};
export const money = (n:number) => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);
export const totalOf = (items:InvoiceItem[]) => items.reduce((s,x)=>s+(Math.max(0,Number(x.qty)||0))*(Math.max(0,Number(x.price)||0)),0);
