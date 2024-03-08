import React, { useState } from "react";

const InBox = () => {
  const [isTyping, setIsTyping] = useState(false);
  return (
    <div style={{ padding: " 8px 16px" }}>
      <form>
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
              color: isTyping ? "#000" : "#B7B7B7",
            }}
            type="text"
            placeholder="Reply to @Rohit Yadav"
            onChange={() => setIsTyping(true)}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <img src="./assets/icons/paperclip.svg" alt="" />
            <img src="./assets/icons/send.svg" alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InBox;
