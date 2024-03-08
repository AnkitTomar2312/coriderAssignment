import React, { useEffect, useState } from "react";
interface ChatResponse {
  from: string;
  to: string;
}
const ChatInfo = () => {
  const [data, setData] = useState<ChatResponse>({
    from: "",
    to: "",
  });

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
  return (
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
      <div>
        <img
          style={{ width: "24px" }}
          src="./assets/icons/dots-vertical.svg"
          alt="backarrow"
        />
      </div>
    </div>
  );
};

export default ChatInfo;
