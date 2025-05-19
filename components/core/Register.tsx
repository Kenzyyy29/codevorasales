"use client";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {
 FiUser,
 FiMail,
 FiPhone,
 FiLock,
 FiArrowRight,
 FiAlertCircle,
} from "react-icons/fi";
import Link from "next/link";

export default function Register() {
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  password: "",
 });
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 const router = useRouter();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
   const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (data.status) {
    router.push("/auth/login?registered=true");
   } else {
    setError(data.message);
   }
  } catch (err: unknown) {
   setError("Failed to connect to server");
   console.error("Registration error:", err); // Added error logging
  } finally {
   setIsLoading(false);
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
       Create an Account
      </motion.h1>
      <motion.p
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       transition={{delay: 0.3}}
       className="text-indigo-100 mt-2">
       Join us today
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
         htmlFor="fullname"
         className="block text-sm font-medium text-gray-700 mb-1">
         Full Name
        </label>
        <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiUser className="text-gray-400" />
         </div>
         <input
          id="fullname"
          name="fullname"
          type="text"
          autoComplete="name"
          required
          value={formData.fullname}
          onChange={handleChange}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="John Doe"
         />
        </div>
       </div>

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
          value={formData.email}
          onChange={handleChange}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="you@example.com"
         />
        </div>
       </div>

       <div>
        <label
         htmlFor="phone"
         className="block text-sm font-medium text-gray-700 mb-1">
         Phone Number
        </label>
        <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiPhone className="text-gray-400" />
         </div>
         <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="+628123456789"
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
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="••••••••"
         />
        </div>
       </div>

       <div className="flex items-center">
        <input
         id="terms"
         name="terms"
         type="checkbox"
         required
         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
         htmlFor="terms"
         className="ml-2 block text-sm text-gray-700">
         I agree to the{" "}
         <span className="text-indigo-600 hover:text-indigo-500">
          Terms of Service
         </span>{" "}
         and{" "}
         <span className="text-indigo-600 hover:text-indigo-500">
          Privacy Policy
         </span>
        </label>
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
          Create Account
          <FiArrowRight className="flex-shrink-0" />
         </>
        )}
       </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
       Already have an account?{" "}
       <Link
        href="/auth/login"
        className="font-medium text-indigo-600 hover:text-indigo-500">
        Sign in
       </Link>
      </div>
     </div>
    </div>
   </motion.div>
  </div>
 );
}
