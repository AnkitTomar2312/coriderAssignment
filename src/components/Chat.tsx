import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
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

  const [focus, setFocus] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [show3Overlay, setShow3Overlay] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const newChat: Chatchat = {
      id: uuidv4(),
      message: newMessage,
      sender: {
        image: "sender-image-url",
        is_kyc_verified: true,
        self: true,
        user_id: "user-id",
      },
      time: new Date().toISOString(),
    };
    setData((prevData) => ({
      ...prevData,
      chats: [...prevData.chats, newChat],
    }));
    setNewMessage("");
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: "1000",
          backgroundColor: "#E5E5E0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 16px 0 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <img
              style={{ width: "24px" }}
              src="./assets/icons/Back.svg"
              alt="backarrow"
            />
            <p
              style={{
                marginBottom: "0",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "30px",
                fontFamily: "Mulish",
              }}
            >
              {data.name}
            </p>
          </div>
          <div>
            <img
              style={{ width: "20px" }}
              src="./assets/icons/edit.svg"
              alt="backarrow"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgb(183, 183, 183, 0.5) ",
            padding: " 24px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <img
              style={{ width: "48px" }}
              src="./assets/images/Profile.png"
              alt="TripProfile"
            />
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "22px",
                fontFamily: "Mulish",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  opacity: "0.5",
                }}
              >
                From
              </span>{" "}
              {data.from} <br />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  opacity: "0.5",
                }}
              >
                To
              </span>{" "}
              {data.to}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "24px" }}
              src="./assets/icons/dots-vertical.svg"
              alt="backarrow"
              onClick={() => {
                setShow3Overlay(!show3Overlay);
              }}
            />
            {show3Overlay && (
              <div
                style={{
                  position: "fixed",
                  top: "116px",
                  right: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px 0px #0000001F",
                  zIndex: "9999",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    borderBottom: "1px solid #E5E5E0",
                    padding: "7px 12px",
                  }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="./assets/icons/Members.svg"
                    alt=""
                  />
                  <p
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                  >
                    Members
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    borderBottom: "1px solid #E5E5E0",
                    padding: "7px 12px",
                  }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="./assets/icons/Call.svg"
                    alt=""
                  />
                  <p
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                  >
                    Share Number
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    borderBottom: "1px solid #E5E5E0",
                    padding: "7px 12px",
                  }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="./assets/icons/Report.svg"
                    alt=""
                  />
                  <p
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                  >
                    Report
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat data */}
      <div
        ref={chatContainerRef}
        style={{
          padding: "22vh 0 0 0",
          overflowY: "auto",
          maxHeight: "60vh",
          backgroundColor: "#E5E5E0",
        }}
      >
        {Object.entries(
          data.chats
            .sort(
              (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
            )
            .reduce<{ [date: string]: Chatchat[] }>((acc, chat) => {
              const chatDate = new Date(chat.time);
              const date = chatDate.getDate();
              const month = chatDate.toLocaleString("default", {
                month: "short",
              });
              const year = chatDate.getFullYear();
              const monthYear = `${date} ${month}, ${year}`;
              acc[monthYear] = acc[monthYear] || [];
              acc[monthYear].push(chat);
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
              <p
                style={{
                  fontFamily: "Mulish",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#B7B7B7",
                }}
              >
                {date}
              </p>
              <div
                style={{
                  width: "116px",
                  height: "1px",
                  border: "1px",
                  background: "#B7B7B7",
                }}
              />
            </div>
            {chats
              .slice()
              .reverse()
              .map((chat: Chatchat) => (
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
                            fontFamily: "Mulish",
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
                        padding: "16px 16px 16px 16px",
                        width: "287px",
                        marginLeft: "40px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div
                          style={{
                            fontFamily: "Mulish",
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
      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "1000",
          backgroundColor: "#E5E5E0",
          height: "90px",
        }}
      >
        <div style={{ padding: " 8px 16px" }}>
          <div
            style={{
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 12px ",
              borderRadius: "8px",
            }}
          >
            <input
              style={{
                width: "80%",
                border: "none",
                fontFamily: "Mulish",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "18px",
                outline: "none",
                color: focus ? "#000" : "#B7B7B7",
              }}
              type="text"
              placeholder="Reply to @Rohit Yadav"
              value={newMessage}
              onChange={(e) => {
                setFocus(true);
                setNewMessage(e.target.value);
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <img
                src="./assets/icons/paperclip.svg"
                alt=""
                onClick={() => {
                  setShowOverlay(!showOverlay);
                }}
              />
              {showOverlay && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "95px",
                    right: "6px",
                    backgroundColor: "#008000",
                    boxShadow: "0px -1px 8px 0px #0000000D",
                    padding: "12px 16px",
                    zIndex: "9999",
                    borderRadius: "999px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <img
                      style={{ width: "20px" }}
                      src="./assets/icons/camera.svg"
                      alt=""
                    />
                    <img
                      style={{ width: "20px" }}
                      src="./assets/icons/video.svg"
                      alt=""
                    />
                    <img
                      style={{ width: "20px" }}
                      src="./assets/icons/document.svg"
                      alt=""
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "-9px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #008000",
                    }}
                  ></div>
                </div>
              )}
              <img
                onClick={(e) => {
                  handleSubmit(e);
                }}
                src="./assets/icons/send.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
