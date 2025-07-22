'use client'
import { handleLogin } from "@/utils/actions";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
type ErrorObjType = {
    email?: string;
    password?: string;
    message?: string;
}
export default function Login() {
    const router = useRouter();
    const [open, setOpen] = useState(true);
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
        const resp = await handleLogin({ email, password });
        if (!resp.success) {
            setErrorObj({ message: resp.message });
            return;
        }else{
            setOpen(false);
            redirect("/");
        }
    }
    return (
        <>
            {open &&
                (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => router.back()}>
                        <div className="w-96 bg-white rounded shadow-lg p-6 relative text-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => router.back()}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>

                            <div className="flex justify-center mb-6">
                                <img
                                    src="/amazon_black.png"
                                    alt="Amazon"
                                    className="h-10 object-contain"
                                />
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Log in</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                    />
                                </div>
                                        {errorObj.message && <p className="text-red-600">{errorObj.message}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
                                >
                                    Continue
                                </button>

                                <p className="text-xs text-gray-600 mt-2">
                                    By continuing, you agree to Amazon's{" "}
                                    <span className="text-blue-600 cursor-pointer hover:underline">
                                        Conditions of Use
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-blue-600 cursor-pointer hover:underline">
                                        Privacy Notice
                                    </span>.
                                </p>
                            </form>
                        <div className="mt-8 text-sm text-gray-600">
                New to Amazon?{" "}
                <Link href={"/signup"}>
                <span className="text-blue-600 cursor-pointer hover:underline">
                    Create your Amazon account
                </span>
                </Link>
            </div>
                        </div>
                    </div>)
            }
        </>
    )
}