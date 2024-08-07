import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faBars, faFile, faFileAlt, faLaughWink, faLink, faList, faPenAlt, faPlus, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { json, useNavigate, useParams } from "react-router";
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
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { CustomLaneHeader } from "../../Components/CustomLane"
import { socket } from "../../socket";



export const Boards = () => {



    const initialData = {
        lanes: [

        ]
    };


    const [data, setData] = useState(initialData);
    const [boardData, setBoardData] = useState();



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




    const LogoutData = localStorage.getItem('login');

    const { id, slug } = useParams();


    useEffect(() => {
        document.title = "Trello WorkPlace | Board";

    }, []);

    const [isAllowed, setIsAllowed] = useState('');
    const [boardID, setBoardID] = useState();
    const handleBoard = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${base_url}/api/view-lists/${id}`,
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
                console.log('check', data?.workspace?.boards.find((item) => item?.code == id));
                setBoardID(data?.board);
                setData(data?.workspace?.boards.find((item) => item?.code == id));
                setBoardData(data)
                console.log('sdasa', data)
                setIsAllowed(data?.is_allowed);

                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })

    }


    const boardRoom = "board-" + id + '-room';
    console.log(boardRoom)


    const handleBoardAdd = (e) => {
        e.preventDefault();
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        formDataMethod.append('workspace_id', boardData?.workspace?.id)

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${base_url}/api/storeboard`, {
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
                setTimeout(() => {
                    setShowModal2(false)
                }, 1000)
                handleBoard()
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


    const [activeItem, setActiveItem] = useState(null);
    console.log(activeItem);

    // const handleBoardClick = (itemId) => {
    //     setActiveItem(itemId);

    //     handleBoard(itemId);
    // };

    const { ApiData: addTaskApiData, loading: addTaskLoading, error: addTaskError, post: addTaskPost } = usePost('/api/add-task');
    const { ApiData: storeListApiData, loading: storeListLoading, error: storeListError, post: storeListPost } = usePost('/api/storelist');
    const { ApiData: lanePositionData, loading: laneLoader, error: LanerErrorData, post: UpdateLanePos } = usePost('/api/update-position');

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [lanePositionData])

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [addTaskApiData])

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [storeListApiData])


    const [taskID, setTaskID] = useState('');
    const [cardShow, setCardShow] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [openSlug, setOpenSlug] = useState(null);

    const { ApiData: detailData, loading: detailLoading, error: detailError, get: GetDetail, setData: liveData } = useGet(`/api/b/${id}/${openSlug ? openSlug : ''}`, null);


    useEffect(() => {
        if (openSlug != null && id) {
            if (trigger) {
                window.history.pushState("object or string", "Title", `${window.location.href}/${openSlug}`)

                console.log('slugTesting', openSlug)
            }

            GetDetail();


        }



    }, [openSlug]);


    // useEffect(()=>{
    //     document.querySelector('.loaderBox').classList.remove("d-none");
    // },[detailLoading])




    // useEffect(()=>{
    //     document.querySelector('.loaderBox').classList.add("d-none");
    // },[detailError])



    useEffect(() => {
        const orignUrl = window.location.href;
        const sliceUrl = orignUrl.indexOf('/b');
        const urlPart = orignUrl.slice(sliceUrl);
        const apiSlug = urlPart.split('/')[3];
        console.log('ss', apiSlug);
        if (apiSlug) {
            setOpenSlug(apiSlug)
            setTrigger(false)
        } else {
            setCardShow(false);
        }
    }, [])


    const orignUrl = window.location.href;
    const sliceUrl = orignUrl.indexOf('/b');
    const urlPart = orignUrl.slice(sliceUrl);
    const apiSlug = urlPart.split('/')[3];

    useEffect(() => {

        console.log('ss', apiSlug);
        if (apiSlug) {
            setOpenSlug(apiSlug)
            setTrigger(false)
        } else {
            setCardShow(false);
        }
    }, [apiSlug])



    useEffect(() => {
        // document.querySelector('.loaderBox').classList.add("d-none");
        if (detailData) {
            setEditorContent(detailData?.data?.card?.description);
            setCardShow(true);
        }
    }, [detailData])





    // useEffect(() => {
    //     setCardShow(false);
    //     // setOpenSlug('')
    //     window.history.pushState("object or string", "Title", `/trello/b/${id}`);
    // }, [detailError])



    const getBoardDetails = (cardID) => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${base_url}/api/task-detail/${cardID}`,
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
                document.querySelector('.loaderBox').classList.add("d-none");
                setOpenSlug(data?.card?.slug);
                setTrigger(true)
                // navigate(`/b/${id}/${data?.card?.slug}`)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })

    }

    const handleOpenBox = (card) => {
        getBoardDetails(card)
    }


    const [lane, setLane] = useState();


    const onDataChange = (card, laneId) => {
        console.log(card)
    }

    const handleCardAdd = (card, laneId) => {
        const taskData = card;

        setFormData((prevData) => ({
            ...prevData,
            title: taskData.title,
            description: taskData.description,
            board_id: data?.id,
            board_list_id: laneId,
            position: laneId
        }));


        setFormData(prevData => {
            console.log('listItem', prevData);
            return prevData;
        });

        // Log the card id
        console.log('Task ID:', taskData.id);

    };

    const onLaneAdd = (card, laneId) => {

        setLane((prevData) => ({
            ...prevData,
            title: card?.title,
            board_id: data?.id,
        }));

        setLane(prevData => {
            console.log('listItem', prevData);
            return prevData;
        });

        console.log(lane)
    }


    useEffect(() => {
        if (formData?.board_id && formData?.board_list_id && formData?.title) {  // Check if formData has the necessary fields
            console.log('listItem', formData);
            addTaskPost(formData);
        }
    }, [formData])



    useEffect(() => {
        if (lane?.board_id && lane?.title) {  // Check if formData has the necessary fields
            console.log('laneData', lane);
            storeListPost(lane);
        }
    }, [lane])






    useEffect(() => {
        handleBoard()
    }, [id])



    const [positionData, setPositionData] = useState();
    const handleDrag = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        const taskData = cardDetails;
        console.log('dsadsdasd', taskData)

        setPositionData((prevData) => ({
            ...prevData,
            board_id: taskData?.board_id,
            board_list_id: taskData.laneId,
            position: taskData?.laneId,
            id: taskData?.id,
            // laneId: taskData?.laneId

        }));


        setPositionData(prevData => {
            console.log('listItem', prevData);
            return prevData;
        });



    }

    useEffect(() => {
        UpdateLanePos(positionData);
    }, [positionData])


    const navigate = useNavigate();

    const closeTask = () => {
        setCardShow(false);
        setOpenSlug('')
        window.history.pushState("object or string", "Title", `/trello/b/${id}`);
        // navigate(`/b/${id}/`)
    }


    // Add Attachement 

    const [file, setFile] = useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {


            const formDataAttached = new FormData();
            formDataAttached.append('attachment_url', file);
            formDataAttached.append('user_id', detailData?.user?.id);
            formDataAttached.append('task_id', detailData?.data?.card?.id);
            document.querySelector('.loaderBox').classList.remove("d-none");
            fetch(`${base_url}/api/add-attachment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: formDataAttached // Use the FormData object as the request body
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(data);

                    socket.emit('saveChanges', id, userID, boardRoom);
                })
                .catch((error) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(error)
                })
        }
    };


    // Delete Attachment 


    const [AttachementID, setAttachementID] = useState('');
    const { ApiData: deleteAttachmentID, loading: AttachementLoading, error: AttachementError, del: GetdeleteAttachment } = useDelete(`/api/remove-attachment/`, null, AttachementID);

    const deleteAttachment = (commentID) => {
        console.log('del', commentID)
        setAttachementID(commentID);
    }

    useEffect(() => {
        if (AttachementID) {
            GetdeleteAttachment(AttachementID);
        }
    }, [AttachementID])


    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [deleteAttachmentID])



    // editor 

    const [editorContent, setEditorContent] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [showEditorDescription, setShowEditorDescription] = useState(false);
    const [descriptionFormData, setDescriptionFormData] = useState();
    const [newContent, setNewContent] = useState();

    const handleEditorData = (content, delta, source, editor) => {
        setEditorContent(content);
        console.log(content)
    };

    const handleNewComment = (content, delta, source, editor) => {
        setNewContent(content)
    }


    const { ApiData: updateDescription, loading: updateDescriptionLoading, error: updateDescriptionError, post: updateDescriptionData } = usePost('/api/add-task');

    const handleEditDescription = () => {
        setDescriptionFormData((prevData) => ({
            ...prevData,
            title: title ? title : detailData?.data?.card?.title,
            description: editorContent,
            board_id: data?.id,
            board_list_id: detailData?.data?.card?.board_list_id,
            position: detailData?.data?.card?.position,
            id: detailData?.data?.card?.id
        }));


        setDescriptionFormData(prevData => {
            console.log('updateItem', prevData);
            return prevData;
        });
    }

    useEffect(() => {
        if (descriptionFormData?.board_id && descriptionFormData?.board_list_id && descriptionFormData?.title && descriptionFormData?.id) {  // Check if descriptionFormData has the necessary fields
            console.log('updateData', descriptionFormData);
            updateDescriptionData(descriptionFormData);
        }
    }, [descriptionFormData])


    useEffect(() => {
        setShowEditorDescription(false);
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [updateDescription])



    // add comment 


    const [addComnet, setAddCommet] = useState();
    const { ApiData: addComment, loading: addCommentLoading, error: addCommentError, post: addCommentData } = usePost('/api/add-comment');

    const handleAddComment = () => {
        setAddCommet((prevData) => ({
            ...prevData,
            comment: newContent,
            user_id: detailData?.user?.id,
            task_id: detailData?.data?.card?.id,
        }));


        setAddCommet(prevData => {
            console.log('updateItem', prevData);
            return prevData;
        });
    }

    useEffect(() => {
        if (addComnet?.comment && addComnet?.user_id && addComnet?.task_id) {  // Check if addComnet has the necessary fields
            console.log('updateData', addComnet);
            addCommentData(addComnet);
        }
    }, [addComnet])


    useEffect(() => {
        setShowEditor(false)
        socket.emit('saveChanges', id, userID, boardRoom);
        setNewContent('')
        setAddCommet('')
    }, [addComment])


    // edit Comment 


    const [editCommentData, setEditCommentData] = useState();
    const [comment, setComment] = useState(null);
    const { ApiData: editComment, loading: editCommentLoading, error: editCommentError, post: editCommentResult } = usePost('/api/add-comment');


    const handleEditCommentData = (content, delta, source, editor) => {
        setComment(content);
        console.log(content)
    };


    const [editCommentIndex, setEditCommentIndex] = useState(null);
    const editCommentBox = (commentID) => {
        setEditCommentData((prevData) => ({
            ...prevData,
            comment: comment,
            user_id: detailData?.user?.id,
            task_id: detailData?.data?.card?.id,
            id: commentID
        }));
    }

    useEffect(() => {
        console.log(editCommentData);
    }, [editCommentData])


    useEffect(() => {
        if (editCommentData?.comment && editCommentData?.user_id && editCommentData?.task_id && editCommentData?.id) {  // Check if editCommentData has the necessary fields
            console.log('updateData', editCommentData);
            editCommentResult(editCommentData);
        }
    }, [editCommentData])


    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
        setEditCommentIndex(null)
    }, [editComment])


    // Delete Comment 

    const [deleteID, setDeleteID] = useState('')
    const { ApiData: deleteData, loading: deleteLoading, error: deleteError, del: Getdelete } = useDelete(`/api/remove-comment/`, null, deleteID);

    const deleteComment = (commentID) => {
        console.log('del', commentID)
        setDeleteID(commentID);
    }

    useEffect(() => {
        if (deleteID) {
            Getdelete(deleteID);
        }
    }, [deleteID])


    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [deleteData])

    const userID = localStorage.getItem('userID');

    const [isEditable, setIsEditable] = useState(false);
    const [title, setTitle] = useState();
    const [coverImage, setCover] = useState();


    useEffect(() => {
        console.log('iii', coverImage)
        if (coverImage) {
            const formDataAttached = new FormData();
            formDataAttached.append('cover_image', coverImage);
            // formDataAttached.append('task_id', detailData?.data?.card?.id);
            document.querySelector('.loaderBox').classList.remove("d-none");
            fetch(`${base_url}/api/update-cover/${detailData?.data?.card?.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: formDataAttached // Use the FormData object as the request body
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(data);
                    socket.emit('saveChanges', id, userID, boardRoom);
                })
                .catch((error) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(error)
                })
        }

    }, [coverImage])


    // get all users 

    const [userList, setUserList] = useState();
    const [memberData, setAddMember] = useState();
    const { ApiData: usersData, loading: usersLoading, error: usersError, get: GetUsers } = useGet(`/api/users`);

    useEffect(() => {
        GetUsers()
        console.log('user', usersData)
        setUserList(usersData?.Users)
    }, [id])

    useEffect(() => {
        GetUsers()
    }, [])


    useEffect(() => {
        setUserList(usersData?.Users)
    }, [usersData])


    const addMember = (memberID) => {
        setAddMember((prevData) => ({
            ...prevData,
            user_id: memberID,
            board_id: data?.id
        }));
    }


    // add Member on  board 

    const { ApiData: addmember, loading: addmemberLoading, error: addmemberError, post: addmemberResult } = usePost('/api/mapboardmember');

    useEffect(() => {
        if (memberData?.user_id && memberData?.board_id) {
            addmemberResult(memberData)
        }
    }, [memberData])


    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
        setAddMember('');
    }, [addmember])



    // Remove Member on  board 
    const [removeBoardMember, setRemoveBoardMember] = useState();
    const { ApiData: removeBoard, loading: removeBoardLoading, error: removeBoardError, post: removeBoardResult } = usePost('/api/remove-member');

    const removeBoardUser = (memberID) => {
        setRemoveBoardMember((prevData) => ({
            ...prevData,
            user_id: memberID,
            board_id: data?.id
        }));
    }


    useEffect(() => {
        if (removeBoardMember?.user_id && removeBoardMember?.board_id) {
            removeBoardResult(removeBoardMember)
        }
    }, [removeBoardMember])


    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
        setAddMember('');
    }, [removeBoard])

    // add task member 


    const addTaskMember = (memberID) => {
        setTaskMember((prevData) => ({
            ...prevData,
            user_id: memberID,
            task_id: detailData?.data?.card?.id
        }));
    }


    // add Member on  board 
    const [taskMemberData, setTaskMember] = useState();
    const { ApiData: taskAddmember, loading: taskAddmemberLoading, error: taskAddmemberError, post: taskAddmemberResult } = usePost('/api/maptaskmember');

    useEffect(() => {
        if (taskMemberData?.user_id && taskMemberData?.task_id) {
            taskAddmemberResult(taskMemberData)
        }
    }, [taskMemberData])

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [taskAddmember])


    const removeTaskMember = (memberID) => {
        setRmoveMember((prevData) => ({
            ...prevData,
            user_id: memberID,
            task_id: detailData?.data?.card?.id
        }));
    }


    // add Member on  board 
    const [removeMemberData, setRmoveMember] = useState();
    const { ApiData: removeMember, loading: removeMemberLoading, error: removeMemberError, post: removeMemberResult } = usePost('/api/remove-taskmember');

    useEffect(() => {
        if (removeMemberData?.user_id && removeMemberData?.task_id) {
            removeMemberResult(removeMemberData)
        }
    }, [removeMemberData])

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [removeMember])


    // request board member 

    const [requestData, setRequestData] = useState();
    const { ApiData: requestMember, loading: requestMemberLoading, error: requestMemberError, post: requestMemberResult } = usePost('/api/mapboardmember');
    const requestDataMember = () => {
        alert();
        setRequestData((prevData) => ({
            ...prevData,
            user_id: userID,
            board_id: boardID
        }));

        console.log('requeest', requestData)
    }

    useEffect(() => {
        if (requestData?.user_id && requestData?.board_id) {
            requestMemberResult(requestData)
        }
    }, [requestData])

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
        handleBoard()
    }, [requestMember])



    useEffect(() => {
        socket.on("connect", () => {
            console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
        });

        socket.on("disconnect", () => {
            console.log('disconnected', socket.id);
        });


        socket.on('chat json', (data, from) => {
            console.log(data, from, 'text')
            if (boardRoom === from) {
                const socketData = data;
                console.log('socketData', socketData);
                const boardData = socketData?.workspace?.boards?.find((item) => item?.code == id);
                console.log('bb', boardData);
                if (openSlug != null && id) {
                    boardData?.lanes?.forEach((item) => {
                        const cardFound = item?.cards?.filter((cardItem) => cardItem?.slug == openSlug);
                        console.log('open', cardFound);
                        if (cardFound?.length > 0) {
                            console.log('cardFound', { data: { card: cardFound[0] } })
                            liveData({ data: { card: cardFound[0] } });
                        }
                    });
                }

                setData(boardData);
                setBoardData(socketData);
            }



        });

        return () => {
            socket.off('chat json', data, boardRoom);
        };


    }, [])




    const username = localStorage.getItem('userInfo');

    const userData = detailData?.data?.card?.members
    // console.log('sss', userData)

    const { ApiData: editLaneApiData, loading: editLaneLoading, error: editLaneError, post: editLanePost } = usePost('/api/storelist');
    const [laneData, setLaneData] = useState();

    const handleLaneUpdate = (laneId, title) => {
        setLaneData({
            ...laneData,
            id: laneId,
            board_id: data?.id,
            title: title
        });

        setLaneData(prevData => {
            console.log('listItemssss', prevData);
            return prevData;
        });
    };

    useEffect(() => {
        if (laneData?.id && laneData?.board_id && laneData?.title) {
            editLanePost(laneData)
        }
    }, [laneData]);

    useEffect(() => {
        socket.emit('saveChanges', id, userID, boardRoom);
    }, [editLaneApiData])



    return (

        <>
            <Header
                sidebarToggle={sidebarToggle}
            />
            {
                isAllowed && isAllowed ? (
                    <>
                        <div className={`sidebar ${sideBarClass}`} id="sidebar">
                            <div className="boardTitle">
                                <h6 className="ps-3"><Avatar name={boardData?.workspace?.title} size={40} round="8px" />{boardData?.workspace?.title}</h6>
                            </div>
                            <div className="titleBoard">
                                <p className="mt-2 text-white ps-3">Your Board</p>
                            </div>
                            <ul className="list-unstyled">
                                {boardData?.workspace?.boards && boardData?.workspace?.boards.map((item, index) => (
                                    <li key={index} className={`sidebar-li ${location.pathname.includes(`/${item?.code}`) ? 'active' : ''}`}>
                                        <Link className={`border-0 btn shadow-0 sideLink text-lg-start w-100`} to={`/b/${item?.code}`}>
                                            <span className="sideLinkText"><Avatar name={item.title} size={20} round="4px" /> {item.title}</span>
                                        </Link>
                                    </li>
                                ))}

                                {
                                    userID == '1' && (
                                        <li className="sidebar-li px-3 mt-4">
                                            <button className={`customButton primaryButton w-100`} onClick={() => { setShowForm(true) }}>
                                                <span className="sideLinkText">Add Board +</span>
                                            </button>
                                        </li>
                                    )
                                }


                            </ul>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 p-0">
                                    <div className={`dashboardBody heightRistrcit ${bodyClass}`}>
                                        <div className="container-fluid">
                                            <div className="topBarNav">
                                                <div className="row justify-content-between">
                                                    <div className="col-md-5">
                                                        <div className="boardTitle">
                                                            <h3 className="mb-md-0">{data?.title}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="userShown">
                                                            {
                                                                data?.users && data?.users.slice(0, 5).map((item, index) => (
                                                                    <Avatar key={index} name={item.username} size={30} round="50px" />
                                                                ))
                                                            }
                                                            {
                                                                <span className="mx-2">+{data?.users.length}</span>
                                                            }

                                                            {
                                                                userID == '1' && (
                                                                    <DropdownButton id="dropdown-basic-button" title="Add+">

                                                                        <div className="dropdownSubTitle">
                                                                            <p>Board Members:</p>
                                                                        </div>
                                                                        {data?.users && data?.users && data?.users && data?.users?.map((item, index) => (

                                                                            <Dropdown.Item >
                                                                                <div className="userListData" onClick={() => { removeBoardUser(item?.id) }}>
                                                                                    <Avatar key={index} name={item.username} size={30} round="50px" />
                                                                                    <span>{item?.username} <button type="button"><FontAwesomeIcon icon={faRemove}></FontAwesomeIcon></button></span>
                                                                                </div>
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                        <div className="dropdownSubTitle">
                                                                            <p>All Members:</p>
                                                                        </div>
                                                                        {userList && userList?.map((item, index) => (
                                                                            !data?.users?.some(member => member.id === item.id) && (
                                                                                <Dropdown.Item key={index}>
                                                                                    <div className="userListData" onClick={() => { addMember(item?.id) }}>
                                                                                        <Avatar key={index} name={item.username} size={30} round="50px" />
                                                                                        <span>{item?.username} <button type="button"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button></span>
                                                                                    </div>
                                                                                </Dropdown.Item>
                                                                            )
                                                                        ))}

                                                                    </DropdownButton>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-fluid">

                                            <div className="row">

                                                <div className="col-12">
                                                    <div className="dashCard pt-0">
                                                        <div>
                                                            <Board
                                                                data={data}
                                                                components={{
                                                                    Card: CustomCard,
                                                                    LaneHeader: (props) => (
                                                                        <CustomLaneHeader
                                                                            {...props}
                                                                            updateTitle={handleLaneUpdate}
                                                                        />
                                                                    )
                                                                }}
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

                        <CustomModal show={showForm} close={() => { setShowForm(false) }} heading='Create Board' handleSubmit={handleBoardAdd}>

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

                            <CustomButton variant="primaryButton" text="Add Board" type="submit"></CustomButton>

                        </CustomModal>
                        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading={message} />

                        <div className="detailTaskBox">
                            <CustomModal
                                show={cardShow}
                                close={() => { closeTask() }}
                                setTitle={setTitle}
                                title={title ? title : detailData?.data?.card?.title}
                                heading={detailData?.data?.card?.title}
                                onClick={() => { setIsEditable(true) }}
                                onBlur={() => {
                                    setIsEditable(false);
                                    handleEditDescription()
                                }}
                                editData={isEditable}
                                size="lg"
                                className="taskBoardHeader"
                                cover
                                setCover={setCover}
                                cover_image={detailData?.data?.card?.cover_image}
                                dialogClassName="dark-theme"
                            >

                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="modalDataBox px-3">
                                            {
                                                detailData?.data?.card?.members && (
                                                    <div className="membersBox mb-4">
                                                        <h6>Members</h6>
                                                        {detailData?.data?.card?.members && detailData?.data?.card?.members.map((item, index) => (
                                                            <Avatar name={item?.username} size={25} round="50px" />
                                                        ))}

                                                        <div className="userShownIntenal">
                                                            <DropdownButton id="dropdown-basic-button" title="Add+" >

                                                                <div className="dropdownSubTitle">
                                                                    <p>Card Members:</p>
                                                                </div>
                                                                {detailData?.data?.card?.members && detailData?.data?.card?.members.map((item, index) => (

                                                                    <Dropdown.Item >
                                                                        <div className="userListData" onClick={() => { removeTaskMember(item?.id) }}>
                                                                            <Avatar key={index} name={item.username} size={30} round="50px" />
                                                                            <span>{item?.username} <button type="button"><FontAwesomeIcon icon={faRemove}></FontAwesomeIcon></button></span>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                ))}
                                                                <div className="dropdownSubTitle">
                                                                    <p>Board Members:</p>
                                                                </div>
                                                                {data?.users && data?.users.map((item, index) => (
                                                                    !detailData?.data?.card?.members.some(member => member.id === item.id) && (
                                                                        <Dropdown.Item key={index}>
                                                                            <div className="userListData" onClick={() => addTaskMember(item?.id)}>
                                                                                <Avatar name={item.username} size={30} round="50px" />
                                                                                <span>{item?.username} <button type="button"><FontAwesomeIcon icon={faPlus} /></button></span>
                                                                            </div>
                                                                        </Dropdown.Item>
                                                                    )
                                                                ))}

                                                            </DropdownButton>

                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <div className="descriptionBox">
                                                <div className="titleSummary attachmendHead">
                                                    <h3><FontAwesomeIcon icon={faBars}></FontAwesomeIcon>Description</h3>
                                                    <div class="addAttachment">
                                                        <button className="editBtn border-0 text-white bg-black" type="button" onClick={() => { setShowEditorDescription(true) }}>{editorContent != '' ? 'Edit' : 'Add'}</button>
                                                    </div>
                                                </div>
                                                <div className="descBox">
                                                    {

                                                        showEditorDescription === true ? (
                                                            <>
                                                                <div className="commentAreaBox shadow">
                                                                    <TextEditor value={editorContent} onChange={handleEditorData} userInfo={userData} />

                                                                </div>
                                                                <div className="btnBoxes">
                                                                    <button className="btnPrimary text-dark" type="button" onClick={handleEditDescription}>Save</button>
                                                                    <button className="btnSecondary text-dark" type="button" onClick={() => { setShowEditorDescription(false) }}>Cancel</button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="commentAreaBox shadow">
                                                                {editorContent ? (
                                                                    <div dangerouslySetInnerHTML={{ __html: editorContent }} />

                                                                ) : (
                                                                    <span>Add a more detailed description…</span>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="attachmentSection my-5">
                                                <div className="titleSummary attachmendHead">
                                                    <h3><FontAwesomeIcon icon={faLink}></FontAwesomeIcon>Attachment</h3>
                                                    <div class="addAttachment">
                                                        <CustomInput
                                                            type="file"
                                                            label="Add"
                                                            labelClass="btnBox bg-black text-white"
                                                            inputClass="d-none"
                                                            id="add"
                                                            multiple
                                                            onChange={onFileChange}

                                                        />


                                                    </div>
                                                </div>
                                                {
                                                    detailLoading ? <Skeleton count={20} height={50} /> : detailData?.data && detailData?.data?.card && detailData?.data?.card?.mergedActivity && detailData.data?.card?.mergedActivity?.map((item, index) => {

                                                        switch (item?.type) {
                                                            case "attachment":
                                                                return (
                                                                    <div className="attachmentBox mb-4">
                                                                        <div className="dataExist">
                                                                            {
                                                                                (

                                                                                    item?.ext?.toLowerCase() === 'txt' || item?.ext?.toLowerCase() === 'doc' || item?.ext?.toLowerCase() === 'docx' || item?.ext?.toLowerCase() === 'pdf' || item?.ext?.toLowerCase() === 'csv' || item?.ext?.toLowerCase() === 'xls' || item?.ext?.toLowerCase() === 'xlsx' || item?.ext?.toLowerCase() === 'ppt' || item?.ext?.toLowerCase() === 'pptx') ? (
                                                                                    <div className="attachmentData">
                                                                                        <a href={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} target="_blank" className="documentFile" >
                                                                                            <span className="attachment-thumbnail-preview-ext">{item?.ext?.toLowerCase()}</span>
                                                                                        </a>

                                                                                    </div>
                                                                                ) : item?.ext?.toLowerCase() === 'mp4' || item?.ext?.toLowerCase() === 'avi' || item?.ext?.toLowerCase() === 'mov' || item?.ext?.toLowerCase() === 'wmv' || item?.ext?.toLowerCase() === 'flv' ? (
                                                                                    <div className="attachmentData">
                                                                                        <video controls width={150}>
                                                                                            <source src={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} type={`video/${item?.ext?.toLowerCase()}`} />
                                                                                            {/* Your browser does not support the video tag. */}
                                                                                        </video>
                                                                                    </div>
                                                                                ) : item?.ext?.toLowerCase() == 'png' || item?.ext?.toLowerCase() == 'jpg' || item?.ext?.toLowerCase() == 'jpeg' || item?.ext?.toLowerCase() == 'gif' || item?.ext?.toLowerCase() == 'bmp' || item?.ext?.toLowerCase() == 'tiff' ? (
                                                                                    <div className="attachmentData">
                                                                                        <a href={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} target="_blank" style={{ backgroundImage: `url(${item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url})`, backgroundPosition: 'center', display: 'block', font: "14px" }}></a>
                                                                                    </div>
                                                                                ) : null
                                                                            }


                                                                            <div className="dateTime">
                                                                                <FormatDateTime isoDateString={item?.created_at} />
                                                                            </div>
                                                                            <div class="actionBtn">
                                                                                <button type="button">Comment</button>
                                                                                <button type="button">Download</button>
                                                                                <button type="button" onClick={() => { deleteAttachment(item?.id) }}>Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );

                                                            default:
                                                                return null;
                                                        }
                                                    })
                                                }

                                            </div>
                                            <div className="activitySection">
                                                <div className="titleSummary">
                                                    <h3><FontAwesomeIcon icon={faList}></FontAwesomeIcon>Activity</h3>
                                                    <div className={`commentBox ${showEditor ? 'align-items-start' : 'align-items-center'}`}>
                                                        <div className="userName">
                                                            <Avatar name={detailData?.user?.name} size={40} round="50px" />
                                                        </div>
                                                        {
                                                            showEditor === true ? (
                                                                <div className="data flex-grow-1">
                                                                    <div className="commentAreaBox shadow">
                                                                        <TextEditor value={newContent} onChange={handleNewComment} userInfo={userData} />

                                                                    </div>
                                                                    <div className="btnBoxes">
                                                                        <button className="btnPrimary" type="button" onClick={handleAddComment}>Save</button>
                                                                        <button className="btnSecondary" type="button" onClick={() => { setShowEditor(false) }}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="commentAreaBox shadow" onClick={() => { setShowEditor(true) }}>
                                                                    <span>Write a comment...</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="dataEditor">

                                                    </div>
                                                </div>
                                                {
                                                    detailLoading ? <Skeleton count={20} height={50} /> : detailData && detailData?.data?.card && detailData?.data?.card.mergedActivity && detailData?.data?.card?.mergedActivity?.map((item, index) => {
                                                        switch (item?.type) {
                                                            case "activity":
                                                                return (
                                                                    <>
                                                                        <div className="activityBox" key={index}>
                                                                            <div className="userName">
                                                                                <Avatar name={item?.user?.username} size={40} round="50px" />
                                                                            </div>
                                                                            <div className="activityContent">
                                                                                <div dangerouslySetInnerHTML={{ __html: item?.activity }} />
                                                                                <FormatDateTime isoDateString={item?.created_at} />
                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                );
                                                            case "attachment":
                                                                return (
                                                                    <div className="attachmentBox mb-4">
                                                                        <div className="activityBox" key={index}>
                                                                            <div className="userName">
                                                                                <Avatar name={item?.user?.username} size={40} round="50px" />
                                                                            </div>
                                                                            <div className="activityContent">
                                                                                <div className="activityAttached">
                                                                                    <strong>{item?.user?.username}</strong> attachment <a href={item?.attachment_url} target="_blank" rel="noopener noreferrer">{item?.attachment_name}</a>
                                                                                    <FormatDateTime isoDateString={item?.created_at} />

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="ps-5">
                                                                            {
                                                                                (item?.ext?.toLowerCase() === 'txt' || item?.ext?.toLowerCase() === 'doc' || item?.ext?.toLowerCase() === 'docx' || item?.ext?.toLowerCase() === 'pdf' || item?.ext?.toLowerCase() === 'csv' || item?.ext?.toLowerCase() === 'xls' || item?.ext?.toLowerCase() === 'xlsx' || item?.ext?.toLowerCase() === 'ppt' || item?.ext?.toLowerCase() === 'pptx') ? (
                                                                                    <a href={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} target="_blank" className="documentFile">
                                                                                        <FontAwesomeIcon icon={faFileAlt} />
                                                                                        <p>{item?.attachment_name}</p>
                                                                                    </a>
                                                                                ) : (
                                                                                    item?.ext?.toLowerCase() === 'mp4' || item?.ext?.toLowerCase() === 'avi' || item?.ext?.toLowerCase() === 'mov' || item?.ext?.toLowerCase() === 'wmv' || item?.ext?.toLowerCase() === 'flv' ? (
                                                                                        <div className="attachmentData">
                                                                                            <video controls width={300}>
                                                                                                <source src={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} type={`video/${item?.ext?.toLowerCase()}`} />
                                                                                                Your browser does not support the video tag.
                                                                                            </video>
                                                                                        </div>
                                                                                    ) : (
                                                                                        item?.ext?.toLowerCase() === 'png' || item?.ext?.toLowerCase() === 'jpg' || item?.ext?.toLowerCase() === 'jpeg' || item?.ext?.toLowerCase() === 'gif' || item?.ext?.toLowerCase() === 'bmp' || item?.ext?.toLowerCase() === 'tiff' ? (
                                                                                            <a href={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} target="_blank">
                                                                                                <img src={item?.attachment_url.includes('trello') ? item?.attachment_url : base_url + item?.attachment_url} className="mw-100 d-block" />
                                                                                            </a>
                                                                                        ) : null
                                                                                    )
                                                                                )
                                                                            }

                                                                            {
                                                                                item?.user?.id == userID ? (
                                                                                    <div className="commentActions">
                                                                                        <button type="button" className="text-danger" onClick={() => { deleteAttachment(item?.id) }}>
                                                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                                                        </button>
                                                                                    </div>
                                                                                ) : ''
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                );
                                                            case "comment":
                                                                return (
                                                                    <div className="activityBox" key={index}>
                                                                        <div className="userName">
                                                                            <Avatar name={username} size={40} round="50px" />
                                                                        </div>
                                                                        <div className="commentBar">
                                                                            {editCommentIndex === index ? (
                                                                                <>
                                                                                    <div className="commentAreaBox shadow">
                                                                                        <TextEditor value={comment} onChange={handleEditCommentData} userInfo={userData} />
                                                                                    </div>
                                                                                    <div className="btnBoxes">
                                                                                        <button className="btnPrimary" type="button" onClick={() => { editCommentBox(item?.id) }}>Save</button>
                                                                                        <button className="btnSecondary" type="button" onClick={() => setEditCommentIndex(null)}>Cancel</button>
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div className="d-flex gap-2 align-items-center activityContent">
                                                                                        <span className="text-capitalize"><strong>{item?.user?.username}</strong></span> <FormatDateTime isoDateString={item?.updated_at ? item?.updated_at : item?.created_at} />
                                                                                        {item?.updated_at ? (
                                                                                            <small>(edited)</small>
                                                                                        ) : ''}

                                                                                    </div>
                                                                                    <div className="activityContent shadow rounded-4 flex-grow-1 p-3">
                                                                                        {item?.comment && (
                                                                                            <div dangerouslySetInnerHTML={{ __html: item?.comment }} />
                                                                                        )}


                                                                                    </div>

                                                                                </>
                                                                            )}
                                                                            {
                                                                                item?.user?.id == userID || userID == '1' ? (
                                                                                    <div className="commentActions">
                                                                                        <button type="button" onClick={() => {
                                                                                            setEditCommentIndex(index);
                                                                                            setComment(item?.comment);
                                                                                        }}>
                                                                                            <FontAwesomeIcon icon={faPenAlt} /> Edit
                                                                                        </button>

                                                                                        <button type="button" className="text-danger" onClick={() => { deleteComment(item?.id) }}>
                                                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                                                        </button>
                                                                                    </div>
                                                                                ) : ""
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            default:
                                                                return null;
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </CustomModal >
                        </div >
                    </>
                ) : (
                    <div className="memberRistriction">
                        <div className="memberBoardInfo text-center">
                            <p>Your are not the member of this board.</p>
                            <CustomButton variant="primaryButton" text="Request Board" type="button" onClick={requestDataMember}></CustomButton>
                        </div>
                    </div>
                )
            }

        </>
    );
};
