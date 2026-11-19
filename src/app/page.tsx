"use client";
import {useEffect,useState} from "react";import Link from "next/link";import {motion} from "framer-motion";import {Plus,FileText,Wallet,ArrowUpRight,Search,Trash2,CalendarDays,Wrench} from "lucide-react";import Topbar from "@/components/Topbar";import {Invoice,money,totalOf} from "@/lib/types";import {getInvoices,deleteInvoice} from "@/lib/storage";
export default function Home(){
 const [rows,setRows]=useState<Invoice[]>([]),[loading,setLoading]=useState(true),[query,setQuery]=useState(""),[error,setError]=useState("");
 async function load(){setLoading(true);try{setRows(getInvoices());setError("")}catch(e){setError(e instanceof Error?e.message:"Gagal memuat nota")}finally{setLoading(false)}}
 useEffect(()=>{load()},[]);
 async function remove(id:string){if(!confirm("Hapus nota ini?"))return;deleteInvoice(id);load()}
 const filtered=rows.filter(x=>(x.invoice_number+" "+x.buyer_name).toLowerCase().includes(query.toLowerCase()));
 const revenue=rows.reduce((s,x)=>s+Math.max(0,totalOf(x.items||[])-Number(x.discount||0)),0);
 return <div className="shell"><Topbar/><main className="page">
 <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45}} style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:20,flexWrap:"wrap"}}>
 <div><div className="eyebrow">WORKSHOP INVOICE SYSTEM / 2026</div><h1>Catat. Hitung.<br/><span style={{background:"#f5d547",padding:"0 8px"}}>Selesai.</span></h1><p className="muted" style={{maxWidth:440}}>Semua nota pembayaran bengkel dalam satu tempat. Cepat dibuat, otomatis dihitung, siap dicetak.</p></div>
 <Link href="/new" className="btn btn-primary"><Plus size={19}/> Buat Nota Baru</Link></motion.div>
 <div className="grid-3" style={{marginTop:34}}>
 {[{label:"TOTAL NOTA",value:rows.length,icon:<FileText/>},{label:"TOTAL TRANSAKSI",value:money(revenue),icon:<Wallet/>},{label:"BENGKEL AKTIF",value:"BENGKEL HONDA",icon:<Wrench/>}].map((s,i)=><motion.div className="card stat" key={s.label} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}><div style={{display:"flex",justifyContent:"space-between"}}><span className="eyebrow">{s.label}</span>{s.icon}</div><strong style={{fontSize:i===2?21:30}}>{s.value}</strong></motion.div>)}
 </div>
 <section style={{marginTop:42}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginBottom:17,flexWrap:"wrap"}}><div><div className="eyebrow">YOUR WORKSPACE</div><h2 className="section-title" style={{fontSize:25,margin:"5px 0 0"}}>Daftar Nota</h2></div><div style={{position:"relative",width:260,maxWidth:"100%"}}><Search size={16} style={{position:"absolute",left:11,top:12}}/><input className="input" style={{paddingLeft:36}} placeholder="Cari nota / pembeli..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div>
 {error&&<div className="card" style={{padding:15,background:"#ffe3df",marginBottom:15}}>{error}<br/><small>Data nota disimpan di penyimpanan lokal browser perangkat ini.</small></div>}
 {loading?<div className="card empty">Memuat data nota...</div>:filtered.length===0?<motion.div className="card empty" initial={{opacity:0}} animate={{opacity:1}}><div className="empty-icon"><FileText size={32}/></div><div className="eyebrow">NOTHING HERE — YET</div><h2 style={{fontSize:26,margin:"10px 0"}}>{query?"Nota tidak ditemukan":"Belum ada nota pembayaran"}</h2><p className="muted" style={{marginBottom:24}}>{query?"Coba kata kunci lain.":"Mulai dari nota pertama untuk bengkel Honda."}</p>{!query&&<Link href="/new" className="btn btn-primary"><Plus size={18}/> Buat Nota Pertama</Link>}</motion.div>:
 <div className="card" style={{overflow:"hidden"}}>{filtered.map((x,i)=><motion.div key={x.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.04}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,padding:"16px 18px",borderBottom:"1px solid #ddd",flexWrap:"wrap"}}>
 <div style={{display:"flex",alignItems:"center",gap:13}}><div style={{width:42,height:42,background:"#f5d547",border:"2px solid #171717",display:"grid",placeItems:"center"}}><FileText/></div><div><b>{x.buyer_name||"Tanpa nama"}</b><div className="eyebrow" style={{marginTop:4}}>{x.invoice_number} · {x.invoice_date}</div></div></div>
 <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{textAlign:"right"}}><b>{money(Math.max(0,totalOf(x.items||[])-Number(x.discount||0)))}</b><div className="eyebrow">{x.items?.length||0} ITEM</div></div><Link href={`/invoice/${x.id}`} className="btn btn-small"><ArrowUpRight size={15}/></Link><button onClick={()=>remove(x.id)} className="btn btn-small" aria-label="Hapus"><Trash2 size={15}/></button></div>
 </motion.div>)}</div>}
 </section>
 <footer className="eyebrow" style={{textAlign:"center",marginTop:55}}>NOTPAD © 2026 — MADE FOR WORKSHOP</footer>
 </main></div>
}
