import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faEdit,
  faRecycle,
  faTrash,
  faTrashAlt,
  faTrashArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import Board from "react-trello";
import Avatar from "react-avatar";
import "./style.css";
import { base_url } from "../../Api/base_url";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDelete, useGet, usePost } from "../../Api/usePost";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const WorkPlace = () => {
  const [boardData, setBoardData] = useState();
  const LogoutData = localStorage.getItem("login");
  const { slug, id } = useParams();
  const location = useLocation();
  console.log("slug", id);

  const GetBoardData = () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${base_url}/api/view-workspace/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBoardData(data?.workspace);
        document.querySelector(".loaderBox").classList.add("d-none");
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  console.log(boardData);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState("Successfully Logged Out");

  const [workspace, setWorkSpace] = useState();
  const [isLoading, setLoading] = useState(false);
  const [boardID, setBoardID] = useState(null);
  const {
    ApiData: workspaceData,
    loading: workspaceLoading,
    error: workspaceError,
    get: WorkPlaceList,
  } = useGet(`/api/workspaces`);
  const {
    ApiData: DeleteBoard,
    loading: BoardLoading,
    error: BoardError,
    del: DeleteBoardCard,
  } = useDelete(`${boardID ? `/api/del-board/${boardID}` : ""}`);

  const deleteBoardCard = (idData) => {
    setBoardID(idData);
  };

  useEffect(() => {
    DeleteBoardCard();
  }, [boardID]);

  useEffect(() => {
    GetBoardData();
    WorkPlaceList();
    setBoardID(null);
  }, [DeleteBoard]);

  useEffect(() => {
    setLoading(true);
  }, [workspaceLoading]);

  useEffect(() => {
    setLoading(false);
    setWorkSpace(workspaceData?.workspaces);
  }, [workspaceData]);

  const handleCreateWorkPlace = (e) => {
    e.preventDefault();
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${base_url}/api/addworkspace`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);
        setShowForm(false);
        setMessage(data?.message);
        setShowModal2(true);
        // WorkPlaceList();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  // onCardClick(cardId, metadata, laneId)

  useEffect(() => {
    document.title = "Trello WorkPlace | Dashboard";
    GetBoardData();
    WorkPlaceList();
  }, [slug]);

  const handleBoardAdd = (e) => {
    e.preventDefault();
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    formDataMethod.append("workspace_id", id);

    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${base_url}/api/storeboard`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);
        setShowForm(false);
        setMessage(data?.message);
        setShowModal2(true);
        setTimeout(() => {
          setShowModal2(false);
        }, 1000);
        GetBoardData();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const userID = localStorage.getItem("userID");

  const [fileUpoad, setFileUpload] = useState();

  const handleUpload = (e) => {
    setFileUpload({
      ...fileUpoad,
      file: e.target.files[0],
      workspace: id,
    });
  };

  useEffect(() => {
    if (fileUpoad?.file && fileUpoad?.workspace) {
      document.querySelector(".loaderBox").classList.remove("d-none");
      const formDataAttached = new FormData();

      for (const key in fileUpoad) {
        formDataAttached.append(key, fileUpoad[key]);
      }

      fetch(`${base_url}/api/import-board`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${LogoutData}`,
        },
        body: formDataAttached, // Use the FormData object as the request body
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          document.querySelector(".loaderBox").classList.add("d-none");
          console.log(data);
          GetBoardData();
        })
        .catch((error) => {
          document.querySelector(".loaderBox").classList.add("d-none");
          console.log(error);
        });
    }
  }, [fileUpoad]);

  // update Board

  const [showUpdate, setShowUpdate] = useState(false);
  const {
    ApiData: boardUdpatedData,
    loading: boardUpdateLoading,
    error: boardUpdateError,
    post: BoardUpdate,
  } = usePost(`/api/storeboard`);

  const openBoard = (titleName, boardID) => {
    setFormData({
      ...formData,
      title: titleName,
      id: boardID,
      workspace_id: id,
    });

    setShowUpdate(true);

    console.log("clickData", formData);
  };

  const handleUpdateBoard = (e) => {
    e.preventDefault();
    console.log("dataCheck", formData);
    if (formData?.title && formData?.id) {
      BoardUpdate(formData);
    }
  };

  useEffect(() => {
    GetBoardData();
    WorkPlaceList();
    setShowUpdate(false);
  }, [boardUdpatedData]);

  return (
    <DashboardLayout>
      <div className="container">
        <div className="row mb-3 dashCard">
          <div className="col-md-12 text-center">
            <div className="d-flex justify-content-end mt-4">
              <div className="actionsImport d-flex flex-row ">
                <CustomInput
                  type="file"
                  label="Import Board"
                  id="board"
                  inputClass="d-none"
                  labelClass="buttonBoard p-2 px-4"
                  onChange={handleUpload}
                />
                {userID == "1" && (
                  <div className="text-center px-4">
                    <CustomButton
                      variant="primaryButton"
                      text="Add Board"
                      onClick={() => {
                        setShowForm(true);
                      }}
                    ></CustomButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="row">
              <div className="col-md-12">
                <h5 className="text-light mb-3">Workspaces</h5>
              </div>
              <div className="col-md-12 mb-4">
                <div className="dashboardCards">
                  <div className="row">
                    {workspace &&
                      workspace.map((item, index) => (
                        <div className="col-12 workspaceArea">
                          <SkeletonTheme
                            baseColor="grey"
                            highlightColor="silver"
                            key={index}
                          >
                            <div
                              className={`shadow bgWorkCard p-3 rounded-4 mb-4 ${
                                location.pathname.includes(`/${item?.code}`)
                                  ? "activeWspace"
                                  : ""
                              }`}
                              key={index}
                            >
                              {isLoading ? (
                                <>
                                  <div className="d-flex gap-2 align-items-center">
                                    <Skeleton
                                      round={8}
                                      height={40}
                                      width={40}
                                    />
                                    <Skeleton width={150} height={20} />
                                  </div>
                                </>
                              ) : (
                                <div className="boardItem">
                                  <Link
                                    to={`/w/${item?.code}/${item?.id}`}
                                    className="nav-link"
                                  >
                                    <Avatar
                                      name={item?.title}
                                      size={40}
                                      round="8px"
                                    />
                                    {item?.title}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </SkeletonTheme>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 borderLeft">
            <h5 className="text-light font-weight-600 mb-4">Your Boards</h5>
            <div className="row">
              {boardData?.boards &&
                boardData?.boards?.map((item, index) => (
                  <div className="col-md-6 mb-4">
                    <div
                      className={`shadow bgWorkCard p-3 rounded-4`}
                      key={index}
                    >
                      <div className="boardItem">
                        <Link to={`/b/${item?.code}`} className="nav-link">
                          <Avatar name={item?.title} size={40} round="8px" />

                          {item?.title}
                        </Link>
                        <button
                          type="button"
                          className="border-0 text-dark rounded-4 editBtnData"
                          onClick={() => {
                            openBoard(item?.title, item?.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        <button
                          type="button"
                          className="border-0 text-danger rounded-4 delBtn "
                          onClick={() => {
                            deleteBoardCard(item?.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        show={showForm}
        close={() => {
          setShowForm(false);
        }}
        heading="Create Board"
        handleSubmit={handleBoardAdd}
      >
        <CustomInput
          label="Board Title"
          placeholder="Enter Board Title"
          type="text"
          labelClass="mainLabel"
          inputClass="mainInput"
          name="title"
          required
          onChange={handleChange}
        />

        <CustomButton
          variant="primaryButton"
          text="Add Board"
          type="submit"
        ></CustomButton>
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading={message}
        />
      </CustomModal>

      {/* update board  */}

      <CustomModal
        show={showUpdate}
        close={() => {
          setShowUpdate(false);
        }}
        heading="Edit Board"
        handleSubmit={handleUpdateBoard}
      >
        <CustomInput
          label="Board Title"
          placeholder="Enter Board Title"
          type="text"
          value={formData?.title}
          labelClass="mainLabel"
          inputClass="mainInput"
          name="title"
          required
          onChange={handleChange}
        />

        <CustomButton
          variant="primaryButton"
          text="Update"
          type="submit"
        ></CustomButton>
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading={message}
        />
      </CustomModal>
    </DashboardLayout>
  );
};
