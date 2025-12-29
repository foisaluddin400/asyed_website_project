import { Nunito } from "next/font/google";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Nunito Font
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "T-shirts Express",
  description: "Your One-Stop Shop for Custom T-Shirts",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <body className={`${nunito.variable} bg-white antialiased font-nunito`}>
        <ReduxProvider>
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
