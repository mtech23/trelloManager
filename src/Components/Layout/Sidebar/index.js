import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faPenFancy,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";
import React from 'react';

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <div className="boardTitle">
        <h6>Your Boards</h6>
      </div>
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideLinkText">Custom Development</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="/dashboard">
            <span className="sideLinkText">Digital Marketing</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideLinkText">Hyder Web Production</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
            <span className="sideLinkText">Yameen Web Production</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
