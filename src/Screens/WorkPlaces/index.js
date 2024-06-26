import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";

export const WorkPlace = () => {

    const [boardData, setBoardData] = useState();
    const LogoutData = localStorage.getItem('login');
    const { slug, id } = useParams();
    console.log('slug', id)


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
                setBoardData(data?.workspace)
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })

    }

    console.log(boardData)


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
                // WorkPlaceList();
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
        GetBoardData()
    }, [slug]);


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

    return (
        <DashboardLayout>
            <div className="container">

                <div className="row mb-3 dashCard">
                    <div className="col-md-12 mb-5 text-center">
                        <h2 className="text-light font-weight-600">Your Boards</h2>
                    </div>
                    {boardData?.boards && boardData?.boards?.map((item, index) => (
                        <div className="col-md-4 mb-4">
                            <div className="shadow bg-light p-3 rounded-4" key={index}>
                                {/* Adding onClick handler to close the dropdown */}
                                <Link
                                    to={`/b/${item?.code}/`}
                                    className="nav-link"

                                >
                                    <Avatar name={item?.title} size={40} round="8px" />
                                    {item?.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-12 text-center">
                        <CustomButton variant="primaryButton" text="Add Board" onClick={() => { setShowForm(true) }}></CustomButton>
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
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading={message} />

            </CustomModal>


           
        </DashboardLayout>
    );
};
