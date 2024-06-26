import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./Components/Nav";
import { ProductsProvider } from "./Components/Context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee-shop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductsProvider>
        <Nav />
        {children}
        </ProductsProvider>
        </body>
    </html>
  );
}
