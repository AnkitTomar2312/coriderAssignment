import React from "react";
import InBox from "./InBox";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "#E5E5E0",
      }}
    >
      <InBox />
    </div>
  );
};

export default Footer;
