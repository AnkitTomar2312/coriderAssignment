import React from "react";

const ChatInfo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E5E5E0",
        padding: " 24px 16px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          style={{ width: "48px" }}
          src="./assets/images/Profile.png"
          alt="backarrow"
        />
        <div
          style={{ fontSize: "18px", fontWeight: "700", lineHeight: "22px" }}
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
          IGI Airport, T3 <br />
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
          Sector 28
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
