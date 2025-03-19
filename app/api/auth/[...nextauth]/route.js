import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"

 export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
       if(account.provider == "github") { 
        await mongoose.connect("mongodb://localhost:27017/details")
        // Check if the user already exists in the database
        const currentUser =  await User.findOne({email: email}) 
        if(!currentUser){
          // Create a new user
           const newUser = await User.create({
            email: user.email, 
            username: user.email.split("@")[0], 
          })   
        } 
        return true
       }
    },
    
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
      return session
    },
  } 
})

export {authOptions as GET, authOptions as POST}
