import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faFile, faFileAlt, faLaughWink, faLink, faList } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { useNavigate, useParams } from "react-router";
import { Header } from "../../Components/Layout/Header";
import { Sidebar } from "../../Components/Layout/Sidebar";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import { usePost, useGet } from "../../Api/usePost";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { CardDetail } from "../CardDetail";
import CustomCard from "../../Components/CustomCard";

export const Boards = () => {


    const [sideBarClass, setsideBarClass] = useState("");
    const [bodyClass, setbodyClass] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [formData, setFormData] = useState();
    const [message, setMessage] = useState();
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

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
        lanes: [

        ]
    };

    const [data, setData] = useState(initialData);
    const [boardData, setBoardData] = useState();
    const LogoutData = localStorage.getItem('login');

    const { id, type } = useParams();


    useEffect(() => {
        document.title = "Trello WorkPlace | Board";

    }, []);


    const handleBoard = () => {
        if (type != '') {
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
                    setData(data?.workspace?.boards.find((item) => item?.code == id));
                    setBoardData(data)
                    console.log('sdasa', data)
                    document.querySelector('.loaderBox').classList.add("d-none");
                })
                .catch((error) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(error);
                })
        }

    }





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
                navigate(`/b/${id}/${data?.card?.slug}`)

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






    return (

        <>
            <Header
                sidebarToggle={sidebarToggle}
            />
            <div className={`sidebar ${sideBarClass}`} id="sidebar">
                <div className="boardTitle">
                    <h6><Avatar name={boardData?.workspace?.title} size={40} round="8px" />{boardData?.workspace?.title}</h6>
                </div>
                <ul className="list-unstyled">
                    {boardData?.workspace?.boards && boardData?.workspace?.boards.map((item, index) => (
                        <li key={index} className={`sidebar-li ${location.pathname.includes(`/${item?.code}`) ? 'active' : ''}`}>
                            <Link className={`border-0 btn shadow-0 sideLink text-lg-start w-100`} to={`/b/${item?.code}`}>
                                <span className="sideLinkText">{item.title}</span>
                            </Link>
                        </li>
                    ))}


                    <li className="sidebar-li px-3">
                        <button className={`customButton primaryButton w-100`} onClick={() => { setShowForm(true) }}>
                            <span className="sideLinkText">Add Board +</span>
                        </button>
                    </li>

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




        </>

    );
};
