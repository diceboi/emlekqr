import NextAuth from "next-auth";
import { AuthOptions } from "@/app/utils/AuthOptions";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
