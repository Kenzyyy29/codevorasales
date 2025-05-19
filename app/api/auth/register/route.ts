import {NextResponse} from "next/server";
import {register} from "@/lib/auth/auth-service";
import {
 UserRegisterPayload,
 ApiResponse,
 ErrorResponse,
} from "@/lib/types/user";

export async function POST(request: Request) {
 try {
  const requestData: UserRegisterPayload = await request.json();

  // Validasi field required
  const requiredFields = ["fullname", "email", "phone", "password"];
  const missingFields = requiredFields.filter(
   (field) => !requestData[field as keyof UserRegisterPayload]
  );

  if (missingFields.length > 0) {
   return NextResponse.json<ErrorResponse>(
    {
     status: false,
     message: `Missing required fields: ${missingFields.join(", ")}`,
     statusCode: 400,
    },
    {status: 400}
   );
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(requestData.email)) {
   return NextResponse.json<ErrorResponse>(
    {
     status: false,
     message: "Invalid email format",
     statusCode: 400,
    },
    {status: 400}
   );
  }

  // Validasi password
  if (requestData.password.length < 6) {
   return NextResponse.json<ErrorResponse>(
    {
     status: false,
     message: "Password must be at least 6 characters",
     statusCode: 400,
    },
    {status: 400}
   );
  }

  // Panggil service register
  const result = await register(requestData);

  if (result.status) {
   return NextResponse.json<ApiResponse<Omit<UserRegisterPayload, "password">>>(
    {
     status: true,
     message: "Registration successful",
     data: {
      fullname: requestData.fullname,
      email: requestData.email,
      phone: requestData.phone,
     },
    },
    {status: 200}
   );
  } else {
   return NextResponse.json<ErrorResponse>(
    {
     status: false,
     message: result.message,
     statusCode: result.statusCode || 400,
    },
    {status: result.statusCode || 400}
   );
  }
 } catch (error: unknown) {
  console.error("Registration error:", error);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json<ErrorResponse>(
   {
    status: false,
    message: "Internal server error",
    error: errorMessage,
    statusCode: 500,
   },
   {status: 500}
  );
 }
}
