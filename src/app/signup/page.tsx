"use client";

import { handleSignup } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ErrorObjType = {
    email?: string;
    password?: string;
    message?: string;
}
export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorObj, setErrorObj] = useState<ErrorObjType>({});

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newErrorObj: ErrorObjType = {};
        if (!email.trim()) {
            newErrorObj.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrorObj.email = "Please enter a valid email address.";
        }

        if (password.trim().length < 6) {
            newErrorObj.password = "Password must contain at least 6 characters!";
        }
        if (Object.keys(newErrorObj).length > 0) {
            setErrorObj(newErrorObj);
            return;
        }
        const resp = await handleSignup({ email, password });
        if (!resp.success) {
            setErrorObj({ message: resp.message });
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="mb-8">
                <Image src="/amazon_black.png" alt="Amazon" width={120} height={40} priority />
            </div>

            <div className="bg-white w-full max-w-md rounded border border-gray-300 p-6">
                <h1 className="text-2xl font-medium mb-4">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errorObj.email && <p className="text-red-500 text-xs mt-1">{errorObj.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errorObj.password && <p className="text-red-500 text-xs mt-1">{errorObj.password}</p>}
                        {errorObj.message && <p className="text-red-500 text-xs text-center">{errorObj.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-xs text-gray-600 mt-4">
                    By continuing, you agree to Amazon's{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Conditions of Use
                    </span>{" "}
                    and{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Privacy Notice
                    </span>.
                </p>

            </div>

            <div className="mt-8 text-sm text-gray-600">
                Already have an Amazon account?{" "}
                <Link href={"/login"}>
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Login to your Amazon account
                    </span>
                </Link>
            </div>
        </main>
    );
}
