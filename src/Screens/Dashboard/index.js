import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";
import { base_url } from "../../Api/base_url";
import { Link } from "react-router-dom";

export const Dashboard = () => {

      const [workspace, setWorkSpace] = useState();
      const LogoutData = localStorage.getItem('login');
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


      const initialData = {
            lanes: [
                  {
                        id: 'lane1',
                        title: 'Todo',

                        cards: [
                              { id: 'Card1', title: 'Task 1', description: 'Description of Task 1', draggable: false, },
                              { id: 'Card2', title: 'Task 2', description: 'Description of Task 2', draggable: false, }
                        ]
                  },
                  {
                        id: 'lane2',
                        title: 'In Progress',
                        cards: []
                  },
                  {
                        id: 'lane3',
                        title: 'Done',
                        cards: []
                  },
            ]
      };

      const [data, setData] = useState(initialData);

      const handleCardAdd = (laneId) => {
            const newCard = {
                  id: `Card${Math.random().toString(36).substr(2, 9)}`,
                  title: 'New Task',
                  description: 'Description of New Task',
                  draggable: false
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

      // onCardClick(cardId, metadata, laneId)

      useEffect(() => {
            document.title = "Trello WorkPlace | Dashboard";
            WorkPlaceList()
      }, []);

      return (
            <DashboardLayout>
                  <div className="container">

                        <div className="row mb-3">
                              <div className="col-md-12 mb-5 text-center">
                                    <h2 className="text-light font-weight-600">Your Workspace</h2>
                              </div>
                              {workspace && workspace.map((item, index) => (
                                    <div className="col-md-4 mb-4">
                                          <div className="shadow bg-light p-3 rounded-4" key={index}>
                                                {/* Adding onClick handler to close the dropdown */}
                                                <Link
                                                      to={`/board/${item?.id}`}
                                                      className="nav-link"
                                                     
                                                >
                                                      <Avatar name={item?.title} size={40} round="8px" />
                                                      {item?.title}
                                                </Link>
                                          </div>
                                    </div>
                              ))}
                              <div className="col-12">

                              </div>
                        </div>
                  </div>
            </DashboardLayout>
      );
};
