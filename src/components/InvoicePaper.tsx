"use client";
import {Invoice,money,totalOf} from "@/lib/types";
export default function InvoicePaper({invoice}:{invoice:Invoice}){
 const subtotal=totalOf(invoice.items||[]),total=Math.max(0,subtotal-(Number(invoice.discount)||0)),change=Math.max(0,(Number(invoice.paid)||0)-total);
 const thermal=invoice.paper_size==="80mm"||invoice.paper_size==="58mm";
 return <article className="print-sheet invoice-paper card" data-size={invoice.paper_size}>
  <header className="receipt-head">
   <div className="receipt-brand">{invoice.workshop_logo&&<img className="receipt-logo" src={invoice.workshop_logo} alt="Logo bengkel"/>}<div><div className="receipt-workshop">{invoice.workshop_name||"BENGKEL HONDA"}</div><div className="receipt-contact">{invoice.workshop_address||""}</div>{invoice.workshop_phone&&<div className="receipt-contact">{invoice.workshop_phone}</div>}</div></div>
   <div className="receipt-meta"><strong>NOTA PEMBAYARAN</strong><span>{invoice.invoice_number}</span><span>{invoice.invoice_date}</span></div>
  </header>
  <div className="receipt-parties">
   <section><div className="receipt-label">DITERIMA DARI</div><b>{invoice.buyer_name||"-"}</b>{invoice.buyer_phone&&<span>{invoice.buyer_phone}</span>}{invoice.show_buyer_address!==false&&invoice.buyer_address&&<span>{invoice.buyer_address}</span>}</section>
   {invoice.show_vehicle!==false&&<section><div className="receipt-label">INFORMASI KENDARAAN</div><b>{invoice.vehicle||"-"}</b><span>No. Polisi: {invoice.plate_number||"-"}</span></section>}
  </div>
  <div className="receipt-table-wrap"><table className="invoice-table"><thead><tr><th>No</th><th>Keterangan Barang / Jasa</th><th className="align-right">Qty</th><th className="align-right">Harga</th><th className="align-right">Jumlah</th></tr></thead><tbody>
   {(invoice.items||[]).map((item,i)=><tr key={item.id}><td>{i+1}</td><td>{item.name||"-"}</td><td className="align-right">{item.qty}</td><td className="align-right">{money(item.price)}</td><td className="align-right">{money(item.qty*item.price)}</td></tr>)}
  </tbody></table></div>
  <div className="receipt-bottom"><div className="receipt-note">{invoice.note&&<><b>Catatan</b><p>{invoice.note}</p></>}</div><div className="receipt-totals"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Diskon</span><b>{money(invoice.discount)}</b></div><div className="grand-total"><strong>TOTAL</strong><strong>{money(total)}</strong></div><div><span>Dibayar</span><b>{money(invoice.paid)}</b></div><div><span>Kembalian</span><b>{money(change)}</b></div><small>Metode pembayaran: {invoice.payment_method||"Tunai"}</small></div></div>
  <footer className="receipt-footer"><p>{invoice.workshop_footer||"Terima kasih atas kepercayaan Anda."}</p><div><span>{invoice.signature_label||"Hormat kami,"}</span><i> </i><b>{invoice.workshop_name||"BENGKEL HONDA"}</b></div></footer>
  {!thermal&&<div className="receipt-bottomline">NOTPAD • BUKTI PEMBAYARAN RESMI</div>}
 </article>
}
