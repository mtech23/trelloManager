import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, userImage, mtech } from './../../../Assets/images/'
import React from 'react';

import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../CustomModal";
import { useNavigate } from "react-router-dom";
import {
  faBell,
  faUser,
  faBars,
  faEllipsisV,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { notifications } from "../../../Config/Data";

import "./style.css";
import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput"
import Form from 'react-bootstrap/Form';
import { base_url } from "../../../Api/base_url";
import Avatar from 'react-avatar';
import SearchAutocomplete from "../../SearchAutoComplete";


export const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [workspace, setWorkSpace] = useState();
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState('Successfully Logged Out');
  const LogoutData = localStorage.getItem('login');
  const [showDropDown, setShowDropDown] = useState(false);

  const navigate = useNavigate();

  const Continue = () => {
    setShowModal(false)
    handleRedirect();
    // setShowModal2(true)
  }

  const handleClickPopup = () => {
    setShowModal(true)
  }

  const WorkPlaceList = () => {
    fetch(`${base_url}/api/workspaces`,
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
        setWorkSpace(data?.workspaces);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const handleRedirect = () => {
    const LogoutData = localStorage.getItem('login');
    fetch(`${base_url}/api/auth/logout`,
      {
        method: 'POST',
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
        console.log(data)
        localStorage.removeItem('login');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })

    navigate('/');
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };

  const handleCreateWorkPlace = (e) => {
    e.preventDefault();
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    console.log(formData)
    document.querySelector('.loaderBox').classList.remove("d-none");
    // Make the fetch request
    fetch(`${base_url}/api/addworkspace`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
      },
      body: formDataMethod // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data);
        setShowForm(false);
        setMessage(data?.message)
        setShowModal2(true)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  useEffect(() => {
    WorkPlaceList()
  }, [])

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
          <Link to={"/dashboard"} className="siteLogo order-2 order-lg-3 text-decoration-none">
            {/* <h1>Mtech <span>Task Manager</span></h1> */}
            <img src={mtech} className="mw-100 navLogo" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="justify-content-end navbar-nav w-100">
              {/* <div className="workPlaces">
                <Dropdown className="notiDropdown me-2">
                  <Dropdown.Toggle variant="transparent" className="notButton">
                    Workspaces
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="notiMenu" align="end">
                    <div className="notiHead p-3 pb-0">
                      <h4 className="mainTitle">Workspaces</h4>
                    </div>

                    <div className="notificationsBody">
                      <ul className="navbar-nav d-block">
                        {workspace && workspace.map((item, index) => (
                          <li className="nav-item" key={index}>

                            <Link
                              to={`/w/${item?.code}/${item?.id}`}
                              className="nav-link"
                              onClick={() => {

                                document.querySelector('.notiDropdown .dropdown-toggle').click();
                              }}
                            >
                              <Avatar name={item?.title} size={40} round="8px" />
                              {item?.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}

              <div className="otherOptions d-flex align-items-center">
                {/* <Dropdown className="notiDropdown me-2">
                  <Dropdown.Toggle variant="transparent" className="notButton">
                    <FontAwesomeIcon className="bellIcon" icon={faBell} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="notiMenu" align="end">
                    <div className="notiHead p-3 pb-0">
                      <h4 className="mainTitle">Notifications</h4>
                    </div>
                    <div className="notificationsBody">
                      {notificationState.slice(0, 5).map((notification) => (
                        <>
                          <Link className="singleNoti" key={notification.id}>
                            <div className="singleNotiIcon">
                              <FontAwesomeIcon
                                className="notiIcon"
                                icon={faBell}
                              />
                            </div>
                            <div className="singleNotiContent">
                              <p className="notiText">{notification.text}</p>
                              <p className="notiDateTime">
                                {notification.date} | {notification.time}
                              </p>
                            </div>
                          </Link>
                        </>
                      ))}
                    </div>
                    <div className="notiFooter">
                      <Link to={"/notifications"}>View All</Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown> */}
                <Dropdown className="userDropdown">
                  <div className="headerAction">
                    <div>
                      <SearchAutocomplete />
                    </div>
                    <Link to="#" className="userMenuItem" onClick={handleClickPopup}>
                      <FontAwesomeIcon
                        className="me-1 yellow-text"
                        icon={faSignOut}

                      />{" "}
                      Logout
                    </Link>
                  </div>

                </Dropdown>
                <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
                  <FontAwesomeIcon
                    className="bell-icon"
                    onClick={props.sidebarToggle}
                    icon={faBars}
                  />
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
          {/* <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
            <FontAwesomeIcon
              className="bell-icon"
              onClick={props.sidebarToggle}
              icon={faBars}
            />
          </button> */}
        </Container>
      </Navbar>

      <CustomModal show={showModal} close={() => { setShowModal(false) }} action={Continue} heading='Are you sure you want to logout?' />
      <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading={message} />


      <CustomModal show={showForm} close={() => { setShowForm(false) }} heading='Create Workspace' handleSubmit={handleCreateWorkPlace}>

        <CustomInput
          label="Title"
          placeholder="Enter Title"
          type="text"
          labelClass="mainLabel"
          inputClass="mainInput"
          name="title"
          required
          onChange={handleChange}

        />

        <CustomButton variant="primaryButton" text="Add Workspace" type="submit"></CustomButton>

      </CustomModal>
    </header>
  );
};
