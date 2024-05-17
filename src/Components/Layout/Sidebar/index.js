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

// export const Sidebar = (props) => {

//   const location = useLocation();
//   const LogoutData = localStorage.getItem('login');

//   const handleBoard = (boardID) => {
//     document.querySelector('.loaderBox').classList.remove("d-none");
//     fetch(`${base_url}/api/view-lists/${boardID}`,
//       {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${LogoutData}`
//         },
//       },
//     )
//       .then((response) => {
//         return response.json()
//       })
//       .then((data) => {
//         console.log(data);
//         document.querySelector('.loaderBox').classList.add("d-none");
//       })
//       .catch((error) => {
//         document.querySelector('.loaderBox').classList.add("d-none");
//         console.log(error);
//       })

//   }
//   return (
//     <div className={`sidebar ${props.sideClass}`} id="sidebar">
//       <div className="boardTitle">
//         <h6><Avatar name={props?.title} size={40} round="8px" />{props?.title}</h6>
//       </div>
//       <ul className="list-unstyled">
//         {props?.boards && props?.boards.map((item, index) => (
//           <li className="sidebar-li">
//             <button className={`sideLink border-0 shadow-0 btn`} onClick={() => { handleBoard(item?.id) }}>
//               <span className="sideLinkText">{item?.title}</span>
//             </button>
//           </li>
//         ))}

//       </ul>
//     </div>
//   );
// };
