"use client";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {BsGoogle, BsGithub} from "react-icons/bs";
import {useSession, signIn} from "next-auth/react";
import {redirect} from "next/navigation";

export default function LoginPage() {
  const {data}: any = useSession();
  if (data) {
    redirect("/");
  }
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  async function handleLogin() {
    try {
      const res = await signIn("credentials", {
        ...user,
        callbackUrl: "/",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="md:w-96 flex flex-col md:border rounded-lg p-8 md:shadow-xl">
        <h1 className="text-xl text-center font-bold">Login</h1>
        <hr />
        <div className="flex flex-col gap-5 pt-5">
          <div className="flex flex-col">
            <label htmlFor="email">Username</label>
            <input
              className="text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => {
                setUser({...user, username: e.target.value});
              }}
              placeholder="username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({...user, password: e.target.value});
              }}
              placeholder="password"
            />
          </div>

          <button
            className="p-2 mx-3 border border-grey-300 rounded-lg bg-blue-600 hover:bg-blue-400"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="text-center text-gray-600 mt-5">
          {"Don't have an account?"}
          <Link href={"/signup"} className="text-black underline">
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
