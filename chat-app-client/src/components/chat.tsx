"use client";

import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/navigation";

let socket: any;

const Chat = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages]: any = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/user/getUser").then((res) => {
      setUser(res.data.userData);
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket = io("http://localhost:8000", {
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("register", user);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      socket.on("message", ({sender, message, gif}: any) => {
        console.log(message);
        const newMessage = {sender: sender, message: message, gif: gif};
        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      sender: user?.username,
      message: message,
      gif: {},
    });

    const newMessage = {sender: user?.username, message: message, gif: {}};
    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    setMessage(""); // Clear the message input after sending
  };

  useEffect(() => {
    axios
      .get("/api/upload")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendGif = (item: any) => {
    axios
      .post("/api/user/removegifs", {
        gif: item._id,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.updatedUser);
      });
    socket.emit("sendMessage", {
      sender: user?.username,
      message: "",
      gif: item,
    });

    const newMessage = {sender: user?.username, message: "", gif: item};
    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    setMessage(""); // Clear the message input after sending
  };
  const purchaseGif = (item: any) => {
    console.log(item);
    const amount = 5;
    router.push(`/checkout?amount=${amount}&gif=${item._id}`);
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="w-full">
        <h1 className="text-lg font-bold">Chat</h1>
        <div className="flex flex-col w-full h-full justify-between">
          <div className="p-5">
            {!!messages.length && (
              <div className="h-full">
                {messages.map((message: any) => {
                  return (
                    <div key={message.message}>
                      {!!message.message.length && (
                        <div>
                          <div
                            className={`border rounded-md py-2 px-3 w-1/2 my-2 ${
                              user?.username == message.sender
                                ? "ml-auto text-white bg-blue-600"
                                : "mr-auto"
                            }`}
                          >
                            {message.message}
                          </div>
                        </div>
                      )}

                      <div>
                        {!!message.gif.url?.length && (
                          <Image
                            key={message.gif._id}
                            src={message.gif.url}
                            alt={message.gif.name}
                            width={400}
                            height={500}
                            className={`h-[200px] w-[200px] ${
                              user?.username == message.sender
                                ? "ml-auto"
                                : "mr-auto"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full p-5 border-t">
            <div className="flex w-full">
              <input
                type="text"
                value={message}
                placeholder="write message...."
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-600 rounded-sm p-2"
              />
              <button
                onClick={sendMessage}
                className="border border-gray-600 rounded-sm py-2 px-3 hover:bg-blue-600"
              >
                Send
              </button>
            </div>
            <div>
              <div>
                <h2>Your Gifs</h2>
                <div className="flex flex-row gap-5 mt-5">
                  {user?.purchased_gifs && (
                    <div className="flex flex-row gap-5 mt-5">
                      {user?.purchased_gifs?.map((item: any) => {
                        return (
                          <Image
                            key={item._id}
                            src={item.url}
                            alt={item.name}
                            width={400}
                            height={500}
                            className="h-[200px] w-auto"
                            onClick={() => sendGif(item)}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2>Premium Gifs</h2>
                {data && (
                  <div className="flex flex-row gap-5 mt-5">
                    {data?.map((item: any) => {
                      return (
                        <Image
                          key={item._id}
                          src={item.url}
                          alt={item.name}
                          width={400}
                          height={500}
                          className="h-[200px] w-auto"
                          onClick={() => purchaseGif(item)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
