import { Geologica } from "next/font/google";
import "./globals.css";
import MainNav from "./components/UI/MainNav";
import AuthProvider from "./Utils/AuthProvider";
import { getServerSession } from "next-auth";
import ContextProvider from "./Context";
import UpdateEmlekadatlapContextProvider from "./UpdateEmlekadatlapContext";
import { Toaster } from 'sonner'

const geologica = Geologica({ subsets: ["latin"] });

export const metadata = {
  title: "A digitális emlékmegőrző",
  description: "Készítsd el saját emlékérméd és oszd meg szeretteiddel",
};

export default async function RootLayout({ children }) {
  const session = getServerSession();

  return (
    <html lang="en">
      <ContextProvider>
        <UpdateEmlekadatlapContextProvider>
          <AuthProvider session={session}>
            <body className={`${geologica.className} mt-[70px] bg-neutral-50`}>
              <MainNav />
              {children}
            </body>
          </AuthProvider>
        </UpdateEmlekadatlapContextProvider>
      </ContextProvider>
      <Toaster 
      richColors 
      position="bottom-center"
      />
    </html>
  );
}
