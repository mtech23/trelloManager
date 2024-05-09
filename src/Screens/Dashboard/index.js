import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Board from 'react-trello';
import Avatar from 'react-avatar';
import "./style.css";

export const Dashboard = () => {
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
      }, []);

      return (
            <DashboardLayout>
                  <div className="container-fluid">
                       
                        <div className="row mb-3">
                              <div className="col-12">
                                    <div className="dashCard">
                                          <div>
                                                <Board data={data}
                                                      canAddLanes
                                                      onCardAdd={(card, laneId) => handleCardAdd(laneId)}


                                                      onCardClick={handleOpenBox}

                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </DashboardLayout>
      );
};
