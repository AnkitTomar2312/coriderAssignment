import React from "react";
import ChatInfo from "./ChatInfo";

const Header = () => {
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
          padding: "32px 16px 0 16px",
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
            }}
          >
            Trip 1
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
