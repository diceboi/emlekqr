import GoogleProvider from "next-auth/providers/google"

export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile)

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            },
            clienId: process.env.GOOGLE_ID,
            clienSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) token.role = user.role
            return token
        },
        async session({session, token}) {
            if(session?.user) session.user.role = token.role
            return session;
        }
    }
}