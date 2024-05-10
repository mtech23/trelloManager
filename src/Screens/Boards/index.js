import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { useParams } from "react-router";
import { Header } from "../../Components/Layout/Header";
import { Sidebar } from "../../Components/Layout/Sidebar";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

export const Boards = () => {


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

    const { id } = useParams();

    const handleCardAdd = (laneId) => {
        const newCard = {
            id: `Card${Math.random().toString(36).substr(2, 9)}`,
            title: 'New Task',
            description: 'Description of New Task',
        };

        const updatedData = {
            lanes: data.lanes.map(lane => {
                if (lane.id === laneId) {
                    return {
                        ...lane,
                        cards: [...lane.cards, newCard]
                    };
                }
                return lane;
            })
        };

        setData(updatedData);
    };

    const handleOpenBox = () => {
        alert()
    }


    const GetBoardData = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${base_url}/api/view-workspace/${id}`,
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
                setBoardData(data)
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })

    }

    console.log('board', boardData)
    useEffect(() => {
        GetBoardData()
        setData(initialData)
    }, [id])

    // onCardClick(cardId, metadata, laneId)

    useEffect(() => {
        document.title = "Trello WorkPlace | Board";

    }, []);


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
                setData(data);
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })

    }



    const handleBoardAdd = (e) => {
        e.preventDefault();
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        formDataMethod.append('workspace_id', id)

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
                GetBoardData()
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

    const handleBoardClick = (itemId) => {
      // Set the active item to the clicked item's ID
      setActiveItem(itemId);
      // Perform any other actions you want when an item is clicked
      // For example, navigating to the board or fetching data related to the board
      handleBoard(itemId);
    };


    return (

        <>
            <Header
                sidebarToggle={sidebarToggle}
            />
            {/* <Sidebar
                sideClass={sideBarClass}
                title={boardData?.workspace?.title}
                boards={boardData?.workspace?.boards}

            /> */}

            <div className={`sidebar sideBarClass`} id="sidebar">
                <div className="boardTitle">
                    <h6><Avatar name={boardData?.workspace?.title} size={40} round="8px" />{boardData?.workspace?.title}</h6>
                </div>
                <ul className="list-unstyled">
                    {boardData?.workspace?.boards && boardData?.workspace?.boards.map((item, index) => (
                        <li key={index} className={`sidebar-li ${item.id === activeItem ? 'active' : ''}`}>
                            <button className={`border-0 btn shadow-0 sideLink text-lg-start w-100`} onClick={() => handleBoardClick(item.id)}>
                                <span className="sideLinkText">{item.title}</span>
                            </button>
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
                                                <Board data={data}
                                                    canAddLanes
                                                    onCardAdd={(card, laneId) => handleCardAdd(laneId)}
                                                    // onCardClick={handleOpenBox}
                                                    editable
                                                    draggable

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

                <CustomButton variant="primaryButton" text="Add Workspace" type="submit"></CustomButton>

            </CustomModal>
            <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading={message} />

        </>

    );
};
