import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentDots, faLink } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import Avatar from 'react-avatar';
import { base_url } from '../../Api/base_url';

const CustomCard = ({ title, userIcon, notificationCount, onClick, commentCount, attachmentCount, members, cover_image }) => (
    <div className="custom-card" onClick={onClick}>
        <div className="card-header flex-column align-items-start">
            {
                cover_image && (
                    <div className='cardImage'>
                        <img src={base_url + cover_image} className='mw-100' />
                    </div>
                )
            }
            <h4>{title}</h4>
            <div className='countData'>
                <div className='commentCount'>
                    <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon><span>{commentCount}</span>
                </div>
                <div className='attachedCount'>
                    <FontAwesomeIcon icon={faLink}></FontAwesomeIcon><span>{attachmentCount}</span>
                </div>
                {
                    notificationCount && (
                        <span className="notification-counter">{notificationCount}</span>
                    )
                }
            </div>
            <div className="user-info">
                {
                    members && members.map((item, index) => (
                        <Avatar name={item?.username} size={25} round="50px" />
                    ))
                }



            </div>
        </div>
    </div>
);

export default CustomCard;
