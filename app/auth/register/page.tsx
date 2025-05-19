import Register from "@/components/core/Register";
import {Suspense} from "react";

export default function RegisterPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <Register />
  </Suspense>
 );
}
