import React, { useEffect, useState } from "react";
import ChatInfo from "./ChatInfo";
interface ChatResponse {
  name: string;
}
const Header = () => {
  const [data, setData] = useState<ChatResponse>({
    name: "",
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
  console.log(data);

  return (
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
      <ChatInfo />
    </div>
  );
};

export default Header;
