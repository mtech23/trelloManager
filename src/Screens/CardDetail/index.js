import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faBars,
  faFile,
  faFileAlt,
  faLaughWink,
  faLink,
  faList,
  faPenAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Board from "react-trello";
import Avatar from "react-avatar";
import "./style.css";
import { base_url } from "../../Api/base_url";
import { useNavigate, useParams } from "react-router";
import { Header } from "../../Components/Layout/Header";
import { Sidebar } from "../../Components/Layout/Sidebar";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import { usePost, useGet, useDelete } from "../../Api/usePost";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import FormatDateTime from "../../Components/DateFormate";
import { TextEditor } from "../../Components/TextEditor";
import CustomCard from "../../Components/CustomCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardDetail = () => {
  const [sideBarClass, setsideBarClass] = useState("");
  const [bodyClass, setbodyClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setsideBarClass("collapsed");
      setbodyClass("expanded");
    } else {
      setsideBarClass("");
      setbodyClass("");
    }
    function handleResize() {
      if (window.innerWidth <= 991) {
        setsideBarClass("collapsed");
        setbodyClass("expanded");
      } else {
        setsideBarClass("");
        setbodyClass("");
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);

  const location = useLocation();

  function sidebarToggle() {
    if (sideBarClass === "") {
      setsideBarClass("collapsed");
      setbodyClass("expanded");
    } else {
      setsideBarClass("");
      setbodyClass("");
    }
  }

  const initialData = {
    lanes: [],
  };

  const [data, setData] = useState(initialData);
  const [boardData, setBoardData] = useState();
  const LogoutData = localStorage.getItem("login");

  const { id, slug } = useParams();

  useEffect(() => {
    document.title = "Trello WorkPlace | Board";
  }, []);

  const handleBoard = () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${base_url}/api/view-lists/${id}`, {
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
        console.log(
          "check",
          data?.workspace?.boards.find((item) => item?.code == id)
        );
        setData(data?.workspace?.boards.find((item) => item?.code == id));
        setBoardData(data);
        console.log("sdasa", data);
        document.querySelector(".loaderBox").classList.add("d-none");
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const handleBoardAdd = (e) => {
    e.preventDefault();
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    formDataMethod.append("workspace_id", boardData?.workspace?.id);

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
        handleBoard();
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

  const [activeItem, setActiveItem] = useState(null);
  console.log(activeItem);

  // const handleBoardClick = (itemId) => {
  //     setActiveItem(itemId);

  //     handleBoard(itemId);
  // };

  const {
    ApiData: addTaskApiData,
    loading: addTaskLoading,
    error: addTaskError,
    post: addTaskPost,
  } = usePost("/api/add-task");
  const {
    ApiData: storeListApiData,
    loading: storeListLoading,
    error: storeListError,
    post: storeListPost,
  } = usePost("/api/storelist");
  const {
    ApiData: lanePositionData,
    loading: laneLoader,
    error: LanerErrorData,
    post: UpdateLanePos,
  } = usePost("/api/update-position");

  const [taskID, setTaskID] = useState("");
  const [cardShow, setCardShow] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const {
    ApiData: detailData,
    loading: detailLoading,
    error: detailError,
    get: GetDetail,
  } = useGet(`/api/b/${id}/${slug}`, null);

  useEffect(() => {
    GetDetail();
    setCardShow(true);
  }, [slug]);

  useEffect(() => {
    setEditorContent(detailData?.data?.card?.description);
  }, [detailData]);

  const handleOpenBox = (card) => {
    console.log(card);
  };

  const [lane, setLane] = useState();

  const onDataChange = (card, laneId) => {
    console.log(card);
  };

  const handleCardAdd = (card, laneId) => {
    const taskData = card;

    setFormData((prevData) => ({
      ...prevData,
      title: taskData.title,
      description: taskData.description,
      board_id: data?.id,
      board_list_id: laneId,
      position: laneId,
    }));

    setFormData((prevData) => {
      console.log("listItem", prevData);
      return prevData;
    });

    // Log the card id
    console.log("Task ID:", taskData.id);
  };

  const onLaneAdd = (card, laneId) => {
    setLane((prevData) => ({
      ...prevData,
      title: card?.title,
      board_id: data?.id,
    }));

    setLane((prevData) => {
      console.log("listItem", prevData);
      return prevData;
    });

    console.log(lane);
  };

  useEffect(() => {
    if (formData?.board_id && formData?.board_list_id && formData?.title) {
      // Check if formData has the necessary fields
      console.log("listItem", formData);
      addTaskPost(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (lane?.board_id && lane?.title) {
      // Check if formData has the necessary fields
      console.log("laneData", lane);
      storeListPost(lane);
    }
  }, [lane]);

  useEffect(() => {
    handleBoard();
  }, [id]);

  const [positionData, setPositionData] = useState();
  const handleDrag = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    const taskData = cardDetails;
    console.log("dsadsdasd", taskData);

    setPositionData((prevData) => ({
      ...prevData,
      board_id: taskData?.board_id,
      board_list_id: taskData.laneId,
      position: taskData?.laneId,
      id: taskData?.id,
      // laneId: taskData?.laneId
    }));

    setPositionData((prevData) => {
      console.log("listItem", prevData);
      return prevData;
    });
  };

  useEffect(() => {
    UpdateLanePos(positionData);
  }, [positionData]);

  const navigate = useNavigate();

  const closeTask = () => {
    setCardShow(false);
    navigate(`/b/${id}/`);
  };

  // Add Attachement

  const [file, setFile] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataAttached = new FormData();
      formDataAttached.append("attachment_url", file);
      formDataAttached.append("user_id", detailData?.user?.id);
      formDataAttached.append("task_id", detailData?.data?.card?.id);
      document.querySelector(".loaderBox").classList.remove("d-none");
      fetch(`${base_url}/api/add-attachment`, {
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

          GetDetail();
        })
        .catch((error) => {
          document.querySelector(".loaderBox").classList.add("d-none");
          console.log(error);
        });
    }
  };

  // Delete Attachment

  const [AttachementID, setAttachementID] = useState(null);
  const {
    ApiData: deleteAttachmentID,
    loading: AttachementLoading,
    error: AttachementError,
    del: GetdeleteAttachment,
  } = useDelete(`/api/remove-attachment/`, null, AttachementID);

  const deleteAttachment = (commentID) => {
    console.log("del", commentID);
    setAttachementID(commentID);
  };

  useEffect(() => {
    GetdeleteAttachment(AttachementID);
  }, [AttachementID]);

  useEffect(() => {
    GetDetail();
  }, [deleteAttachmentID]);

  // editor

  const [editorContent, setEditorContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [showEditorDescription, setShowEditorDescription] = useState(false);
  const [descriptionFormData, setDescriptionFormData] = useState();
  const [newContent, setNewContent] = useState();

  const handleEditorData = (content, delta, source, editor) => {
    setEditorContent(content);
    console.log(content);
  };

  const handleNewComment = (content, delta, source, editor) => {
    setNewContent(content);
  };

  const {
    ApiData: updateDescription,
    loading: updateDescriptionLoading,
    error: updateDescriptionError,
    post: updateDescriptionData,
  } = usePost("/api/add-task");

  const handleEditDescription = () => {
    setDescriptionFormData((prevData) => ({
      ...prevData,
      title: title ? title : detailData?.data?.card?.title,
      description: editorContent,
      board_id: data?.id,
      board_list_id: detailData?.data?.card?.board_list_id,
      position: detailData?.data?.card?.position,
      id: detailData?.data?.card?.id,
    }));

    setDescriptionFormData((prevData) => {
      console.log("updateItem", prevData);
      return prevData;
    });
  };

  useEffect(() => {
    if (
      descriptionFormData?.board_id &&
      descriptionFormData?.board_list_id &&
      descriptionFormData?.title &&
      descriptionFormData?.description
        ? descriptionFormData?.description
        : "" && descriptionFormData?.id
    ) {
      // Check if descriptionFormData has the necessary fields
      console.log("updateData", descriptionFormData);
      updateDescriptionData(descriptionFormData);
    }
  }, [descriptionFormData]);

  useEffect(() => {
    setShowEditorDescription(false);
    GetDetail();
  }, [updateDescription]);

  // add comment

  const [addComnet, setAddCommet] = useState();
  const {
    ApiData: addComment,
    loading: addCommentLoading,
    error: addCommentError,
    post: addCommentData,
  } = usePost("/api/add-comment");

  const handleAddComment = () => {
    setAddCommet((prevData) => ({
      ...prevData,
      comment: newContent,
      user_id: detailData?.user?.id,
      task_id: detailData?.data?.card?.id,
    }));

    setAddCommet((prevData) => {
      console.log("updateItem", prevData);
      return prevData;
    });
  };

  useEffect(() => {
    if (addComnet?.comment && addComnet?.user_id && addComnet?.task_id) {
      // Check if addComnet has the necessary fields
      console.log("updateData", addComnet);
      addCommentData(addComnet);
    }
  }, [addComnet]);

  useEffect(() => {
    setShowEditor(false);
    GetDetail();
    setNewContent("");
    setAddCommet("");
  }, [addComment]);

  // edit Comment

  const [editCommentData, setEditCommentData] = useState();
  const [comment, setComment] = useState(null);
  const {
    ApiData: editComment,
    loading: editCommentLoading,
    error: editCommentError,
    post: editCommentResult,
  } = usePost("/api/add-comment");

  const handleEditCommentData = (content, delta, source, editor) => {
    setComment(content);
    console.log(content);
  };

  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const editCommentBox = (commentID) => {
    setEditCommentData((prevData) => ({
      ...prevData,
      comment: comment,
      user_id: detailData?.user?.id,
      task_id: detailData?.data?.card?.id,
      id: commentID,
    }));
  };

  useEffect(() => {
    console.log(editCommentData);
  }, [editCommentData]);

  useEffect(() => {
    if (
      editCommentData?.comment &&
      editCommentData?.user_id &&
      editCommentData?.task_id &&
      editCommentData?.id
    ) {
      // Check if editCommentData has the necessary fields
      console.log("updateData", editCommentData);
      editCommentResult(editCommentData);
    }
  }, [editCommentData]);

  useEffect(() => {
    GetDetail();
    setEditCommentIndex(null);
  }, [editComment]);

  // Delete Comment

  const [deleteID, setDeleteID] = useState(null);
  const {
    ApiData: deleteData,
    loading: deleteLoading,
    error: deleteError,
    del: Getdelete,
  } = useDelete(`/api/remove-comment/`, null, deleteID);

  const deleteComment = (commentID) => {
    console.log("del", commentID);
    setDeleteID(commentID);
  };

  useEffect(() => {
    Getdelete(deleteID);
  }, [deleteID]);

  useEffect(() => {
    GetDetail();
  }, [deleteData]);

  const userID = localStorage.getItem("userID");

  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState();

  return (
    <>
      <Header sidebarToggle={sidebarToggle} />
      <div className={`sidebar ${sideBarClass}`} id="sidebar">
        <div className="boardTitle">
          <h6>
            <Avatar name={boardData?.workspace?.title} size={40} round="8px" />
            {boardData?.workspace?.title}
          </h6>
        </div>
        <ul className="list-unstyled">
          {boardData?.workspace?.boards &&
            boardData?.workspace?.boards.map((item, index) => (
              <li
                key={index}
                className={`sidebar-li ${
                  location.pathname.includes(`/${item?.code}`) ? "active" : ""
                }`}
              >
                <Link
                  className={`border-0 btn shadow-0 sideLink text-lg-start w-100`}
                  to={`/b/${item?.code}`}
                >
                  <span className="sideLinkText">{item.title}</span>
                </Link>
              </li>
            ))}

          {userID == "1" && (
            <li className="sidebar-li px-3">
              <button
                className={`customButton primaryButton w-100`}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <span className="sideLinkText">Add Board +</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className={`dashboardBody ${bodyClass}`}>
              <div className="container-fluid">
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="dashCard">
                      <div>
                        <Board
                          data={data}
                          components={{ Card: CustomCard }}
                          canAddLanes
                          editable
                          draggable
                          hideCardDeleteIcon
                          onCardAdd={handleCardAdd}
                          onCardClick={handleOpenBox}
                          onDataChange={onDataChange}
                          onLaneAdd={onLaneAdd}
                          handleDragEnd={handleDrag}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      </CustomModal>
      <CustomModal
        show={showModal2}
        close={() => {
          setShowModal2(false);
        }}
        success
        heading={message}
      />

      <div className="detailTaskBox">
        <CustomModal
          show={cardShow}
          close={() => {
            closeTask();
          }}
          setTitle={setTitle}
          title={title ? title : detailData?.data?.card?.title}
          heading={detailData?.data?.card?.title}
          onClick={() => {
            setIsEditable(true);
          }}
          onBlur={() => {
            setIsEditable(false);
            handleEditDescription();
          }}
          editData={isEditable}
          size="lg"
          className="taskBoardHeader"
        >
          <div className="row">
            <div className="col-md-10">
              {detailData?.data?.card?.members && (
                <div className="membersBox mb-4">
                  <h6>Members</h6>
                  {detailData?.data?.card?.members &&
                    detailData?.data?.card?.members.map((item, index) => (
                      <Avatar name={item?.username} size={25} round="50px" />
                    ))}
                </div>
              )}

              <div className="descriptionBox">
                <div className="titleSummary attachmendHead">
                  <h3>
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>Description
                  </h3>
                  <div class="addAttachment">
                    <button
                      className="editBtn border-0"
                      type="button"
                      onClick={() => {
                        setShowEditorDescription(true);
                      }}
                    >
                      {editorContent != "" ? "Edit" : "Add"}
                    </button>
                  </div>
                </div>
                <div className="descBox">
                  {showEditorDescription === true ? (
                    <>
                      <div className="commentAreaBox shadow">
                        <TextEditor
                          value={editorContent}
                          onChange={handleEditorData}
                        />
                      </div>
                      <div className="btnBoxes">
                        <button
                          className="btnPrimary"
                          type="button"
                          onClick={handleEditDescription}
                        >
                          Save
                        </button>
                        <button
                          className="btnSecondary"
                          type="button"
                          onClick={() => {
                            setShowEditorDescription(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="commentAreaBox shadow">
                      {editorContent ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: editorContent }}
                        />
                      ) : (
                        <span>Add a more detailed description…</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="attachmentSection my-5">
                <div className="titleSummary attachmendHead">
                  <h3>
                    <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>Attachment
                  </h3>
                  <div class="addAttachment">
                    <CustomInput
                      type="file"
                      label="Add"
                      labelClass="btnBox"
                      inputClass="d-none"
                      id="add"
                      multiple
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                {detailLoading ? (
                  <Skeleton count={20} height={50} />
                ) : (
                  detailData?.data &&
                  detailData?.data?.card &&
                  detailData?.data?.card?.mergedActivity &&
                  detailData.data?.card?.mergedActivity?.map((item, index) => {
                    switch (item?.type) {
                      case "attachment":
                        return (
                          <div className="attachmentBox mb-4">
                            <div className="dataExist">
                              {item?.ext.toLowerCase() === "txt" ||
                              item?.ext.toLowerCase() === "doc" ||
                              item?.ext.toLowerCase() === "docx" ||
                              item?.ext.toLowerCase() === "pdf" ||
                              item?.ext.toLowerCase() === "csv" ||
                              item?.ext.toLowerCase() === "xls" ||
                              item?.ext.toLowerCase() === "xlsx" ||
                              item?.ext.toLowerCase() === "ppt" ||
                              item?.ext.toLowerCase() === "pptx" ? (
                                <div className="attachmentData">
                                  <a
                                    href={base_url + item?.attachment_url}
                                    target="_blank"
                                    className="documentFile"
                                  >
                                    <span className="attachment-thumbnail-preview-ext">
                                      {item?.ext.toLowerCase()}
                                    </span>
                                  </a>
                                </div>
                              ) : item?.ext.toLowerCase() === "mp4" ||
                                item?.ext.toLowerCase() === "avi" ||
                                item?.ext.toLowerCase() === "mov" ||
                                item?.ext.toLowerCase() === "wmv" ||
                                item?.ext.toLowerCase() === "flv" ? (
                                <div className="attachmentData">
                                  <video controls width={150}>
                                    <source
                                      src={base_url + item?.attachment_url}
                                      type={`video/${item?.ext.toLowerCase()}`}
                                    />
                                    {/* Your browser does not support the video tag. */}
                                  </video>
                                </div>
                              ) : item?.ext.toLowerCase() == "png" ||
                                item?.ext.toLowerCase() == "jpg" ||
                                item?.ext.toLowerCase() == "jpeg" ||
                                item?.ext.toLowerCase() == "gif" ||
                                item?.ext.toLowerCase() == "bmp" ||
                                item?.ext.toLowerCase() == "tiff" ? (
                                <div className="attachmentData">
                                  <a
                                    href={base_url + item?.attachment_url}
                                    target="_blank"
                                    style={{
                                      backgroundImage: `url(${
                                        base_url + item?.attachment_url
                                      })`,
                                      backgroundPosition: "center",
                                      display: "block",
                                    }}
                                  ></a>
                                </div>
                              ) : null}

                              <div className="dateTime">
                                <FormatDateTime
                                  isoDateString={item?.created_at}
                                />
                              </div>
                              <div class="actionBtn">
                                <button type="button">Comment</button>
                                <button type="button">Download</button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteAttachment(item?.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })
                )}
              </div>
              <div className="activitySection">
                <div className="titleSummary">
                  <h3>
                    <FontAwesomeIcon icon={faList}></FontAwesomeIcon>Activity
                  </h3>
                  <div
                    className={`commentBox ${
                      showEditor ? "align-items-start" : "align-items-center"
                    }`}
                  >
                    <div className="userName">
                      <Avatar
                        name={detailData?.user?.name}
                        size={40}
                        round="50px"
                      />
                    </div>
                    {showEditor === true ? (
                      <div className="data flex-grow-1">
                        <div className="commentAreaBox shadow">
                          <TextEditor
                            value={newContent}
                            onChange={handleNewComment}
                          />
                        </div>
                        <div className="btnBoxes">
                          <button
                            className="btnPrimary"
                            type="button"
                            onClick={handleAddComment}
                          >
                            Save
                          </button>
                          <button
                            className="btnSecondary"
                            type="button"
                            onClick={() => {
                              setShowEditor(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="commentAreaBox shadow"
                        onClick={() => {
                          setShowEditor(true);
                        }}
                      >
                        <span>Write a comment...</span>
                      </div>
                    )}
                  </div>
                  <div className="dataEditor"></div>
                </div>
                {detailLoading ? (
                  <Skeleton count={20} height={50} />
                ) : (
                  detailData &&
                  detailData?.data?.card &&
                  detailData?.data?.card.mergedActivity &&
                  detailData?.data?.card?.mergedActivity.map((item, index) => {
                    switch (item?.type) {
                      case "activity":
                        return (
                          <>
                            <div className="activityBox" key={index}>
                              <div className="userName">
                                <Avatar
                                  name={item?.user?.username}
                                  size={40}
                                  round="50px"
                                />
                              </div>
                              <div className="activityContent">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item?.activity,
                                  }}
                                />
                                <FormatDateTime
                                  isoDateString={item?.created_at}
                                />
                              </div>
                            </div>
                          </>
                        );
                      case "attachment":
                        return (
                          <div className="attachmentBox mb-4">
                            <div className="activityBox" key={index}>
                              <div className="userName">
                                <Avatar
                                  name={item?.user?.username}
                                  size={40}
                                  round="50px"
                                />
                              </div>
                              <div className="activityContent">
                                <div className="activityAttached">
                                  <strong>{item?.user?.username}</strong>{" "}
                                  attachment{" "}
                                  <a
                                    href={item?.attachment_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {item?.attachment_name}
                                  </a>
                                  <FormatDateTime
                                    isoDateString={item?.created_at}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="ps-5">
                              {item?.ext.toLowerCase() === "txt" ||
                              item?.ext.toLowerCase() === "doc" ||
                              item?.ext.toLowerCase() === "docx" ||
                              item?.ext.toLowerCase() === "pdf" ||
                              item?.ext.toLowerCase() === "csv" ||
                              item?.ext.toLowerCase() === "xls" ||
                              item?.ext.toLowerCase() === "xlsx" ||
                              item?.ext.toLowerCase() === "ppt" ||
                              item?.ext.toLowerCase() === "pptx" ? (
                                <a
                                  href={base_url + item?.attachment_url}
                                  target="_blank"
                                  className="documentFile"
                                >
                                  <FontAwesomeIcon icon={faFileAlt} />
                                  <p>{item?.attachment_name}</p>
                                </a>
                              ) : item?.ext.toLowerCase() === "mp4" ||
                                item?.ext.toLowerCase() === "avi" ||
                                item?.ext.toLowerCase() === "mov" ||
                                item?.ext.toLowerCase() === "wmv" ||
                                item?.ext.toLowerCase() === "flv" ? (
                                <div className="attachmentData">
                                  <video controls width={300}>
                                    <source
                                      src={base_url + item?.attachment_url}
                                      type={`video/${item?.ext.toLowerCase()}`}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              ) : item?.ext.toLowerCase() === "png" ||
                                item?.ext.toLowerCase() === "jpg" ||
                                item?.ext.toLowerCase() === "jpeg" ||
                                item?.ext.toLowerCase() === "gif" ||
                                item?.ext.toLowerCase() === "bmp" ||
                                item?.ext.toLowerCase() === "tiff" ? (
                                <a
                                  href={base_url + item?.attachment_url}
                                  target="_blank"
                                >
                                  <img
                                    src={base_url + item?.attachment_url}
                                    className="mw-100 d-block"
                                  />
                                </a>
                              ) : null}

                              {item?.user?.id == userID ? (
                                <div className="commentActions">
                                  <button
                                    type="button"
                                    className="text-danger"
                                    onClick={() => {
                                      deleteAttachment(item?.id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      case "comment":
                        return (
                          <div className="activityBox" key={index}>
                            <div className="userName">
                              <Avatar
                                name={item?.user?.username}
                                size={40}
                                round="50px"
                              />
                            </div>
                            <div className="commentBar">
                              {editCommentIndex === index ? (
                                <>
                                  <div className="commentAreaBox shadow">
                                    <TextEditor
                                      value={comment}
                                      onChange={handleEditCommentData}
                                    />
                                  </div>
                                  <div className="btnBoxes">
                                    <button
                                      className="btnPrimary"
                                      type="button"
                                      onClick={() => {
                                        editCommentBox(item?.id);
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btnSecondary"
                                      type="button"
                                      onClick={() => setEditCommentIndex(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="d-flex gap-2 align-items-center activityContent">
                                    <span className="text-capitalize">
                                      <strong>{item?.user?.username}</strong>
                                    </span>{" "}
                                    <FormatDateTime
                                      isoDateString={
                                        item?.updated_at
                                          ? item?.updated_at
                                          : item?.created_at
                                      }
                                    />
                                    {item?.updated_at ? (
                                      <small>(edited)</small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="activityContent shadow rounded-4 flex-grow-1 p-3">
                                    {item?.comment && (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item?.comment,
                                        }}
                                      />
                                    )}
                                  </div>
                                </>
                              )}
                              {item?.user?.id == userID ? (
                                <div className="commentActions">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditCommentIndex(index);
                                      setComment(item?.comment);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faPenAlt} /> Edit
                                  </button>

                                  <button
                                    type="button"
                                    className="text-danger"
                                    onClick={() => {
                                      deleteComment(item?.id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    </>
  );
};
