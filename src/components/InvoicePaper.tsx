"use client";
import {Invoice,money,totalOf} from "@/lib/types";
export default function InvoicePaper({invoice}:{invoice:Invoice}){
 const subtotal=totalOf(invoice.items||[]),total=Math.max(0,subtotal-(Number(invoice.discount)||0)),change=Math.max(0,(Number(invoice.paid)||0)-total);
 return <article className="print-sheet card" data-size={invoice.paper_size} style={{padding:32,background:"white",color:"#111",maxWidth:invoice.paper_size==="80mm"?420:invoice.paper_size==="58mm"?310:850,margin:"0 auto"}}>
 <div style={{display:"flex",justifyContent:"space-between",gap:18,borderBottom:"2px solid #111",paddingBottom:18,marginBottom:18}}>
  <div><div style={{fontSize:25,fontWeight:900,letterSpacing:-1}}>{invoice.workshop_name||"BENGKEL HONDA"}</div><div style={{fontSize:12,marginTop:5}}>{invoice.workshop_address||"Alamat bengkel"}</div><div style={{fontSize:12}}>{invoice.workshop_phone}</div></div>
  <div style={{textAlign:"right",minWidth:100}}><div style={{fontSize:20,fontWeight:900}}>NOTA</div><div style={{fontSize:12,marginTop:5}}>{invoice.invoice_number}</div><div style={{fontSize:12}}>{invoice.invoice_date}</div></div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:12,marginBottom:18}}>
  <div><b>DITERIMA DARI</b><div>{invoice.buyer_name||"-"}</div><div>{invoice.buyer_phone}</div><div>{invoice.buyer_address}</div></div>
  <div><b>INFORMASI KENDARAAN</b><div>{invoice.vehicle||"-"}</div><div>No. Polisi: {invoice.plate_number||"-"}</div></div>
 </div>
 <table className="invoice-table" style={{minWidth:0,border:"1px solid #111",fontSize:12}}><thead><tr><th style={{background:"#eee"}}>No</th><th style={{background:"#eee"}}>Keterangan Barang / Jasa</th><th style={{background:"#eee",textAlign:"right"}}>Qty</th><th style={{background:"#eee",textAlign:"right"}}>Harga</th><th style={{background:"#eee",textAlign:"right"}}>Jumlah</th></tr></thead><tbody>
 {invoice.items.map((item,i)=><tr key={item.id}><td>{i+1}</td><td>{item.name||"-"}</td><td style={{textAlign:"right"}}>{item.qty}</td><td style={{textAlign:"right"}}>{money(item.price)}</td><td style={{textAlign:"right"}}>{money(item.qty*item.price)}</td></tr>)}
 </tbody></table>
 <div style={{display:"flex",justifyContent:"flex-end",marginTop:16}}><div style={{width:260,fontSize:13}}><div style={{display:"flex",justifyContent:"space-between",padding:"5px 0"}}><span>Subtotal</span><b>{money(subtotal)}</b></div><div style={{display:"flex",justifyContent:"space-between",padding:"5px 0"}}><span>Diskon</span><b>{money(invoice.discount)}</b></div><div style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderTop:"2px solid #111",fontSize:17}}><b>TOTAL</b><b>{money(total)}</b></div><div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>Dibayar</span><b>{money(invoice.paid)}</b></div><div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span>Kembalian</span><b>{money(change)}</b></div><div style={{paddingTop:5}}>Metode: {invoice.payment_method}</div></div></div>
 {invoice.note&&<div style={{fontSize:12,marginTop:18}}><b>Catatan:</b> {invoice.note}</div>}
 <div style={{display:"flex",justifyContent:"space-between",marginTop:40,fontSize:12,textAlign:"center"}}><div>Terima kasih atas kepercayaan Anda.</div><div style={{width:140}}>Hormat kami,<br/><br/><br/>(________________)</div></div>
 </article>
}
