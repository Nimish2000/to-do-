import React from "react";
import Hamburger from "hamburger-react";
import "./header.css";

function Header({ enableSideBar }) {
  return (
    <>
      <div className="header">
        <div className="hamburger">
          <span
            onClick={enableSideBar}
            className="material-icons"
            style={{ fontSize: "32px" }}
          >
            menu
          </span>
        </div>
        <div className="header-components">
          <a href="https://tekion.com/" target="_blank">
            <h3>Tekion</h3>
          </a>
          <h6>to-do</h6>
        </div>
      </div>
    </>
  );
}

export default Header;
