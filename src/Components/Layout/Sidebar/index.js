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
import Avatar from "react-avatar";
import { base_url } from "../../../Api/base_url";

export const Sidebar = (props) => {

  const location = useLocation();
  const LogoutData = localStorage.getItem('login');

  const handleBoard = (boardID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${base_url}/api/view-lists/${boardID}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        document.querySelector('.loaderBox').classList.add("d-none");
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })

  }
  return (
    <div className={`sidebar ${props?.sideBarClass}`} id="sidebar">
      <div className="boardTitle">
        <h6><Avatar name={props?.workspace?.title} size={40} round="8px" />{props?.workspace?.title}</h6>
      </div>
      <ul className="list-unstyled">
        {props?.workspace?.boards && props?.workspace?.boards.map((item, index) => (
          <li key={index} className={`sidebar-li ${location.pathname.includes(`/${item?.code}`) ? 'active' : ''}`}>
            <Link className={`border-0 btn shadow-0 sideLink text-lg-start w-100`} to={`/b/${item?.code}`}>
              <span className="sideLinkText">{item.title}</span>
            </Link>
          </li>
        ))}

        {/* {
          userID == '1' && (
            <li className="sidebar-li px-3">
              <button className={`customButton primaryButton w-100`} onClick={() => { setShowForm(true) }}>
                <span className="sideLinkText">Add Board +</span>
              </button>
            </li>
          )
        } */}


      </ul>
    </div>
  );
};
