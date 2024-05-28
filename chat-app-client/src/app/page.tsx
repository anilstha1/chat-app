"use client";

import Chat from "@/components/chat";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const {data}: any = useSession();
  const user = data?.user;

  useEffect(() => {
    axios.get("/api/user/getUsers").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-[200px] flex flex-col gap-3 border-r-2 h-full py-3">
        <h1 className="text-lg font-bold px-3">Users</h1>
        {users?.map((user: any) => {
          return (
            <div
              key={user._id}
              className="py-2 px-3 border rounded-sm text-lg font-bold cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              {user.username}
            </div>
          );
        })}
      </div>
      {user && <Chat />}
    </div>
  );
}
