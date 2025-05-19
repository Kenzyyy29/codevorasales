"use client";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {FiMail, FiLock, FiLogIn, FiAlertCircle} from "react-icons/fi";
import Link from "next/link";

export default function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const result = await signIn("credentials", {
   email,
   password,
   redirect: false,
  });

  setIsLoading(false);

  if (result?.error) {
   setError(result.error);
  } else {
   router.push("/");
  }
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
   <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className="w-full max-w-md">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
     <div className="bg-indigo-600 p-6 text-center">
      <motion.h1
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       transition={{delay: 0.2}}
       className="text-2xl font-bold text-white">
       Welcome Back
      </motion.h1>
      <motion.p
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       transition={{delay: 0.3}}
       className="text-indigo-100 mt-2">
       Sign in to your account
      </motion.p>
     </div>

     <div className="p-6">
      {error && (
       <motion.div
        initial={{opacity: 0, y: -10}}
        animate={{opacity: 1, y: 0}}
        className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
        <FiAlertCircle className="flex-shrink-0" />
        <span>{error}</span>
       </motion.div>
      )}

      <form
       onSubmit={handleSubmit}
       className="space-y-4">
       <div>
        <label
         htmlFor="email"
         className="block text-sm font-medium text-gray-700 mb-1">
         Email Address
        </label>
        <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMail className="text-gray-400" />
         </div>
         <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="you@example.com"
         />
        </div>
       </div>

       <div>
        <label
         htmlFor="password"
         className="block text-sm font-medium text-gray-700 mb-1">
         Password
        </label>
        <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="text-gray-400" />
         </div>
         <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="••••••••"
         />
        </div>
       </div>

       <div className="flex items-center justify-between">
        <div className="flex items-center">
         <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
         />
         <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-700">
          Remember me
         </label>
        </div>

        <div className="text-sm">
         <Link
          href="/auth/forgot-password"
          className="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot password?
         </Link>
        </div>
       </div>

       <motion.button
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70">
        {isLoading ? (
         <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
         <>
          <FiLogIn className="flex-shrink-0" />
          Sign in
         </>
        )}
       </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
       Don&apos;t have an account?{" "}
       <Link
        href="/auth/register"
        className="font-medium text-indigo-600 hover:text-indigo-500">
        Sign up
       </Link>
      </div>
     </div>
    </div>
   </motion.div>
  </div>
 );
}
