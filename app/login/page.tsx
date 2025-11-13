"use client";

import Image from "next/image";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-semibold text-center text-black mb-3">
          Welcome 
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in with Google to continue
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl bg-white hover:bg-gray-50 transition active:scale-[0.98]"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            width={24}
            height={24}
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

      </div>
    </div>
  );
}
