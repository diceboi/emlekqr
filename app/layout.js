import { Geologica } from "next/font/google";
import "./globals.css";
import MainNav from "./components/UI/MainNav";

const geologica = Geologica({ subsets: ["latin"] });

export const metadata = {
  title: "A digitális emlékmegőrző",
  description: "Készítsd el saját emlékérméd és oszd meg szeretteiddel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geologica.className}>
        <MainNav/>
        {children}
      </body>
    </html>
  );
}
