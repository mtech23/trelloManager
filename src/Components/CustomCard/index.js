import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentDots, faLink } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

const CustomCard = ({ title, userIcon, notificationCount, onClick, commentCount, attachmentCount }) => (
    <div className="custom-card" onClick={onClick}>
        <div className="card-header flex-column align-items-start">
            <h4>{title}</h4>
            <div className='countData'>
                <div className='commentCount'>
                    <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon><span>{commentCount}</span>
                </div>
                <div className='attachedCount'>
                    <FontAwesomeIcon icon={faLink}></FontAwesomeIcon><span>{attachmentCount}</span>
                </div>
            </div>
            <div className="user-info">
                {
                    userIcon && (
                        <img src={userIcon} alt="User Icon" className="user-icon" />
                    )
                }

                {
                    notificationCount && (
                        <span className="notification-counter">{notificationCount}</span>
                    )
                }

            </div>
        </div>
    </div>
);

export default CustomCard;
