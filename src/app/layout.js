import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "JusBuy Website",
  description: "E-commerce",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <body
        className={`${geistSans.variable} bg-white ${geistMono.variable} antialiased`}
      >



        
         <ReduxProvider>
       
            <div className="">
               <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
              <ClientLayout>{children}</ClientLayout>
            </div>
     
        </ReduxProvider>
      </body>
    </html>
  );
}
