import Login from "@/components/core/Login";
import {Suspense} from "react";

export default function LoginPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <Login />
  </Suspense>
 );
}
