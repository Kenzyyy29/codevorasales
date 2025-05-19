export interface User {
 id?: string;
 fullname: string;
 email: string;
 phone: string;
 password: string;
 role?: string;
 created_at?: Date;
 updated_at?: Date;
}

export interface UserRegisterPayload {
 fullname: string;
 email: string;
 phone: string;
 password: string;
}

export interface UserResponse {
 id: string;
 fullname: string;
 email: string;
 phone: string;
 role: string;
 created_at: Date;
 updated_at: Date;
}

export interface ApiResponse<T> {
 status: boolean;
 message: string;
 data?: T;
 error?: string;
}

export interface ErrorResponse {
 status: false;
 message: string;
 error?: string;
 statusCode?: number;
}
