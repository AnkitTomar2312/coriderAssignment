import React, { ReactNode } from "react";
import Header from "../components/Header";
import ChatInfo from "../components/ChatInfo";
import Chat from "../components/Chat";
import Footer from "../components/Footer";

interface Props {
  children: ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
