import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <div className="layout-wrapper"> 
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
