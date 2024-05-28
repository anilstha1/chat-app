"use client";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function SignupPage() {
  const {data}: any = useSession();
  if (data) {
    redirect("/");
  }
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  async function handleSignup(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", user);
      console.log(res);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed", error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full">
      <div className="w-full md:w-96 flex flex-col md:border rounded-md p-5 md:shadow-md ">
        <h1 className="text-xl text-center font-bold">Signup</h1>
        <hr />
        <div className="flex flex-col gap-5 pt-5">
          <div className="flex flex-col">
            <label htmlFor="name">Username</label>
            <input
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="name"
              type="text"
              value={user.username}
              onChange={(e) => {
                setUser({...user, username: e.target.value});
              }}
              placeholder="name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="w-full text-black mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
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
            className="p-2 mx-3 mb-3 border border-grey-300 rounded-lg bg-blue-600 hover:bg-blue-400"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
        <p className="text-center text-gray-600 mt-5">
          Aready have an account?
          <Link href={"/login"} className="text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
