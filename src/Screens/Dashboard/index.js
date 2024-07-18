import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import { usePost, useGet, useDelete } from "../../Api/usePost";
import { SelectBox } from "../../Components/CustomSelect"
import { userData } from "../../Config/Data";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const Dashboard = () => {

      const [workspace, setWorkSpace] = useState();
      const LogoutData = localStorage.getItem('login');
      const userID = localStorage.getItem('userID');

      const { ApiData: workspaceData, loading: workspaceLoading, error: workspaceError, get: WorkPlaceList } = useGet(`/api/workspaces`);

      useEffect(() => {
            setLoading(true);
      }, [workspaceLoading])


      useEffect(() => {
            setLoading(false);
            setWorkSpace(workspaceData?.workspaces)
      }, [workspaceData])


      const [showModal, setShowModal] = useState(false);
      const [showModal2, setShowModal2] = useState(false);
      const [showForm, setShowForm] = useState(false);
      const [formData, setFormData] = useState();
      const [message, setMessage] = useState('Successfully Logged Out');


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
                        WorkPlaceList();
                  })
                  .catch((error) => {
                        document.querySelector('.loaderBox').classList.add("d-none");
                        console.log(error)
                  })
      }




      const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevData) => ({
                  ...prevData,
                  [name]: value,
            }));
            console.log(formData)
      };

      // onCardClick(cardId, metadata, laneId)

      useEffect(() => {
            document.title = "Trello WorkPlace | Dashboard";
            WorkPlaceList()

      }, []);




      const [userList, setUserList] = useState();
      const [isLoading, setLoading] = useState(false);
      const { ApiData: usersData, loading: usersLoading, error: usersError, get: GetUsers } = useGet(`/api/users`);

      useEffect(() => {
            GetUsers()
      }, [])

      useEffect(() => {
            setLoading(false)
            setUserList(usersData?.Users)
      }, [usersData])

      useEffect(() => {
            setLoading(true)
      }, [usersLoading])

      const [addUser, setAddUser] = useState();
      const { ApiData: addmember, loading: addmemberLoading, error: addmemberError, post: addmemberResult } = usePost('/api/auth/register-member');

      const handleAddUser = (e) => {
            e.preventDefault();

            console.log(formData)
            if (formData?.username && formData?.role && formData?.password && formData?.password_confirmation && formData?.email) {
                  addmemberResult(formData)
            }
      }

      useEffect(() => {
            GetUsers()
            setAddUser(false);
      }, [addmember])



      const roleList = [
            {
                  name: 'Member',
                  id: 'member'
            },
            {
                  name: 'Moderator',
                  id: 'moderator'
            }
      ]
      return (
            <DashboardLayout>
                  <div className="container dashCard dashData">

                        <div className="row my-3">
                              <div className="col-md-4">
                                    {userList && (
                                          <>
                                                <div className="titleBox">
                                                      <h5 className="text-light text-center font-weight-600">User List ({userList?.length})</h5>
                                                      {
                                                            userID == '1' && (
                                                                  <div className="d-flex justify-content-center gap-4">
                                                                        <CustomButton variant="primaryButton" text="Add user +" onClick={() => { setAddUser(true) }}></CustomButton>
                                                                  </div>
                                                            )
                                                      }
                                                </div>

                                                <div className="dashboardCards">
                                                      {userList?.map((item, index) => (
                                                            <SkeletonTheme baseColor="grey" highlightColor="silver" key={index}>
                                                                  <div className="shadow bgWorkCard p-3 rounded-4 d-flex mb-4">
                                                                        {isLoading ? (
                                                                              <>
                                                                                    <Skeleton circle={true} round={50} height={40} width={40} />
                                                                                    <div className="ms-3">
                                                                                          <Skeleton width={150} height={20} />
                                                                                          <Skeleton width={100} height={15} />
                                                                                    </div>
                                                                              </>
                                                                        ) : (
                                                                              <>
                                                                                    <Avatar name={item?.username} size={40} round="50px" />
                                                                                    <div className="ms-3">
                                                                                          <p className="mb-0">{item?.email}</p>
                                                                                          <small>{`@${item?.username}`}</small>
                                                                                    </div>
                                                                              </>
                                                                        )}


                                                                  </div>
                                                            </SkeletonTheme>
                                                      ))}
                                                </div>
                                          </>
                                    )}

                              </div>

                              <div className="col-md-8">
                                    <div className="titleBox">
                                          <h5 className="text-light text-center font-weight-600">Your Workspace</h5>
                                          {
                                                userID == '1' && (

                                                      <div className="data">
                                                            <CustomButton variant="primaryButton" text="Create Workspace +" onClick={() => { setShowForm(true) }}></CustomButton>
                                                      </div>
                                                )
                                          }
                                    </div>

                                    <div className="row">
                                          <div className="col-md-12 mb-4">
                                                <div className="dashboardCards">
                                                      <div className="row">
                                                            {workspace && workspace.map((item, index) => (

                                                                  <div className="col-6">
                                                                        <SkeletonTheme baseColor="grey" highlightColor="silver" key={index}>

                                                                              <div className="shadow bgWorkCard p-3 rounded-4 mb-4" key={index}>
                                                                                    {isLoading ? (
                                                                                          <>
                                                                                                <Skeleton round={8} height={40} width={40} />
                                                                                                <div className="ms-3">
                                                                                                      <Skeleton width={150} height={20} />
                                                                                                </div>
                                                                                          </>
                                                                                    ) : (

                                                                                          <Link
                                                                                                to={`/w/${item?.code}/${item?.id}`}
                                                                                                className="nav-link"

                                                                                          >
                                                                                                <Avatar name={item?.title} size={40} round="8px" />
                                                                                                {item?.title}
                                                                                          </Link>
                                                                                    )
                                                                                    }

                                                                              </div>
                                                                        </SkeletonTheme>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>


                              </div>

                        </div>


                  </div>


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

                  <CustomModal show={addUser} close={() => { setAddUser(false) }} heading='Create User' handleSubmit={handleAddUser}>

                        <CustomInput
                              label="User Name"
                              placeholder="Enter User Name"
                              type="text"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              name="username"
                              required
                              onChange={handleChange}

                        />

                        <CustomInput
                              label="Email"
                              placeholder="Enter Email"
                              type="email"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              name="email"
                              required
                              onChange={handleChange}

                        />

                        <CustomInput
                              label="Password"
                              placeholder="Enter Password"
                              type="password"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              name="password"
                              id='pass'
                              required
                              onChange={handleChange}

                        />

                        <CustomInput
                              label="Confirm Password"
                              placeholder="Enter Confirm Password"
                              type="password"
                              id='confrimPassword'
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              name="password_confirmation"
                              required
                              onChange={handleChange}

                        />

                        <SelectBox
                              label="Select Role"
                              required
                              name="role"
                              option={roleList}
                              selectClass="mainInput"
                              onChange={handleChange}
                        />

                        <CustomButton variant="primaryButton" text="Add User" type="submit"></CustomButton>

                  </CustomModal>
            </DashboardLayout>
      );
};
