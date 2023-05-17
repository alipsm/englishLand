import React, { PropsWithChildren } from "react";
import NavBar from "./Nav";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
export default Layout;