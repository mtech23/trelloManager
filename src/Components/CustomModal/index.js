import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

import CustomButton from '../CustomButton';

import { check, question } from '../../Assets/images';

import './style.css'
import CustomInput from '../CustomInput';

const CustomModal = (props) => {
    
    return (
        <>
            <Modal show={props?.show} centered onHide={props?.close} size={props?.size}>
                <button className={`closeButton ${props?.className}`} onClick={props?.close}><FontAwesomeIcon icon={faTimes} /></button>
                <Modal.Body className={props.children ? '' : 'text-center'}>
                    {props?.children ? (
                        ''
                    ) : (
                        // You can add alternative content here, like an image or text
                        props?.success ? (
                            <FontAwesomeIcon icon={faCheckCircle} className='checkMark' />
                        ) : (
                            <FontAwesomeIcon icon={faQuestionCircle} className='questionMark' />
                        )
                    )}


                    <div className="modalContent">
                        {props?.editData ? (
                            <CustomInput
                                value={props?.title}
                                type="text"
                                inputClass='mainInput mt-3 rounded-1'
                                onBlur={props?.onBlur}
                                onChange={(e) => {
                                    props?.setTitle(e.target.value);
                                }}

                            />
                        ) : (

                            <h2 className="modalHeading" onClick={props?.onClick} >{props?.heading}</h2>
                        )}
                        {props?.children ? (
                            <p>
                                <form onSubmit={props?.handleSubmit} className='formDataStyle'>
                                    {props?.children}
                                </form>
                            </p>
                        ) : (
                            props?.success ? <CustomButton onClick={props?.close} variant='primaryButton' text={props?.btnTxt ? props?.btnTxt : 'Ok'} />
                                :
                                <>
                                    <CustomButton onClick={props?.action} variant='primaryButton' text="Yes" className="me-2" />
                                    <CustomButton onClick={props?.close} variant='secondaryButton' text="No" />
                                </>
                        )
                        }



                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomModal