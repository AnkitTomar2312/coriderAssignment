import React, { useEffect, useState, useRef } from "react";
import InBox from "./InBox";

interface Sender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
}

interface Chatchat {
  id: string;
  message: string;
  sender: Sender;
  time: string;
}

interface ChatResponse {
  chats: Chatchat[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

const Chat = () => {
  const [data, setData] = useState<ChatResponse>({
    chats: [],
    from: "",
    message: "",
    name: "",
    status: "",
    to: "",
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://qa.corider.in/assignment/chat?page=0"
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
    }
  }, [data]);
  console.log(data.chats);

  return (
    <>
      <div
        ref={chatContainerRef}
        style={{ padding: "22vh 0", overflowY: "auto", maxHeight: "60vh" }}
      >
        {Object.entries(
          data.chats
            .sort(
              (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
            )
            .reduce<{ [date: string]: Chatchat[] }>((acc, chat) => {
              const chatDate = new Date(chat.time).toLocaleDateString();
              acc[chatDate] = acc[chatDate] || [];
              acc[chatDate].push(chat);
              return acc;
            }, {})
        ).map(([date, chats]) => (
          <div key={date}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "116px",
                  height: "1px",
                  border: "1px",
                  background: "#B7B7B7",
                }}
              />
              {date}
              <div
                style={{
                  width: "116px",
                  height: "1px",
                  border: "1px",
                  background: "#B7B7B7",
                }}
              />
            </div>
            {chats.reverse().map((chat: Chatchat) => (
              <div key={chat.id}>
                {chat.sender.self === false ? (
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ position: "relative" }}>
                        <img
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                          }}
                          src={chat.sender.image}
                          alt="Chat Profile"
                        />
                        {chat.sender.is_kyc_verified && (
                          <img
                            style={{
                              position: "absolute",
                              width: "10px",
                              top: "16.36px",
                              left: " 16.36px ",
                            }}
                            src="./assets/icons/check-verified-02.svg"
                            alt=""
                          />
                        )}
                      </div>

                      <div
                        style={{
                          background: "#FFFFFF",
                          padding: "8px",
                          borderRadius: "0px 12px 12px 12px",
                          boxShadow: "0px 4px 8px 0px #00000014",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "400",
                          color: "#606060",
                          width: "287px",
                        }}
                      >
                        {chat.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "16px 16px 0 16px",
                      width: "287px",
                      marginLeft: "40px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div
                        style={{
                          background: "#1C63D5",
                          padding: "8px",
                          borderRadius: "12px 12px 0px 12px",
                          boxShadow: "0px 4px 8px 0px #00000014",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "400",
                          color: "#fff",
                          width: "287px",
                        }}
                      >
                        {chat.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
