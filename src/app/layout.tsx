import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"NotPad — Workshop Invoice",description:"Buat nota pembayaran bengkel dengan mudah."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
