import React from 'react'

export const detailCard = (detailData) => {
    return (
        <div className="row">
            <div className="col-md-10">
                {
                    detailData?.data?.card?.members && (
                        <div className="membersBox mb-4">
                            <h6>Members</h6>
                            {detailData?.data?.card?.members && detailData?.data?.card?.members.map((item, index) => (
                                <Avatar name={item?.username} size={25} round="50px" />
                            ))}
                        </div>
                    )
                }

                <div className="descriptionBox">
                    <div className="titleSummary attachmendHead">
                        <h3><FontAwesomeIcon icon={faBars}></FontAwesomeIcon>Description</h3>
                        <div class="addAttachment">
                            <button className="editBtn border-0" type="button" onClick={() => { setShowEditorDescription(true) }}>{editorContent != '' ? 'Edit' : 'Add'}</button>
                        </div>
                    </div>
                    <div className="descBox">
                        {

                            showEditorDescription === true ? (
                                <>
                                    <div className="commentAreaBox shadow">
                                        <TextEditor value={editorContent} onChange={handleEditorData} />

                                    </div>
                                    <div className="btnBoxes">
                                        <button className="btnPrimary" type="button" onClick={handleEditDescription}>Save</button>
                                        <button className="btnSecondary" type="button" onClick={() => { setShowEditorDescription(false) }}>Cancel</button>
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
                                labelClass="btnBox"
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

                                                        item?.ext.toLowerCase() === 'txt' || item?.ext.toLowerCase() === 'doc' || item?.ext.toLowerCase() === 'docx' || item?.ext.toLowerCase() === 'pdf' || item?.ext.toLowerCase() === 'csv' || item?.ext.toLowerCase() === 'xls' || item?.ext.toLowerCase() === 'xlsx' || item?.ext.toLowerCase() === 'ppt' || item?.ext.toLowerCase() === 'pptx') ? (
                                                        <div className="attachmentData">
                                                            <a href={base_url + item?.attachment_url} target="_blank" className="documentFile" >
                                                                <span className="attachment-thumbnail-preview-ext">{item?.ext.toLowerCase()}</span>
                                                            </a>

                                                        </div>
                                                    ) : item?.ext.toLowerCase() === 'mp4' || item?.ext.toLowerCase() === 'avi' || item?.ext.toLowerCase() === 'mov' || item?.ext.toLowerCase() === 'wmv' || item?.ext.toLowerCase() === 'flv' ? (
                                                        <div className="attachmentData">
                                                            <video controls width={150}>
                                                                <source src={base_url + item?.attachment_url} type={`video/${item?.ext.toLowerCase()}`} />
                                                                {/* Your browser does not support the video tag. */}
                                                            </video>
                                                        </div>
                                                    ) : item?.ext.toLowerCase() == 'png' || item?.ext.toLowerCase() == 'jpg' || item?.ext.toLowerCase() == 'jpeg' || item?.ext.toLowerCase() == 'gif' || item?.ext.toLowerCase() == 'bmp' || item?.ext.toLowerCase() == 'tiff' ? (
                                                        <div className="attachmentData">
                                                            <a href={base_url + item?.attachment_url} target="_blank" style={{ backgroundImage: `url(${base_url + item?.attachment_url})`, backgroundPosition: 'center', display: 'block' }}></a>
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
                                            <TextEditor value={newContent} onChange={handleNewComment} />

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
                        detailLoading ? <Skeleton count={20} height={50} /> : detailData && detailData?.data?.card && detailData?.data?.card.mergedActivity && detailData?.data?.card?.mergedActivity.map((item, index) => {
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
                                                    (item?.ext.toLowerCase() === 'txt' || item?.ext.toLowerCase() === 'doc' || item?.ext.toLowerCase() === 'docx' || item?.ext.toLowerCase() === 'pdf' || item?.ext.toLowerCase() === 'csv' || item?.ext.toLowerCase() === 'xls' || item?.ext.toLowerCase() === 'xlsx' || item?.ext.toLowerCase() === 'ppt' || item?.ext.toLowerCase() === 'pptx') ? (
                                                        <a href={base_url + item?.attachment_url} target="_blank" className="documentFile">
                                                            <FontAwesomeIcon icon={faFileAlt} />
                                                            <p>{item?.attachment_name}</p>
                                                        </a>
                                                    ) : (
                                                        item?.ext.toLowerCase() === 'mp4' || item?.ext.toLowerCase() === 'avi' || item?.ext.toLowerCase() === 'mov' || item?.ext.toLowerCase() === 'wmv' || item?.ext.toLowerCase() === 'flv' ? (
                                                            <div className="attachmentData">
                                                                <video controls width={300}>
                                                                    <source src={base_url + item?.attachment_url} type={`video/${item?.ext.toLowerCase()}`} />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            </div>
                                                        ) : (
                                                            item?.ext.toLowerCase() === 'png' || item?.ext.toLowerCase() === 'jpg' || item?.ext.toLowerCase() === 'jpeg' || item?.ext.toLowerCase() === 'gif' || item?.ext.toLowerCase() === 'bmp' || item?.ext.toLowerCase() === 'tiff' ? (
                                                                <a href={base_url + item?.attachment_url} target="_blank">
                                                                    <img src={base_url + item?.attachment_url} className="mw-100 d-block" />
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
                                                <Avatar name={item?.user?.username} size={40} round="50px" />
                                            </div>
                                            <div className="commentBar">
                                                {editCommentIndex === index ? (
                                                    <>
                                                        <div className="commentAreaBox shadow">
                                                            <TextEditor value={comment} onChange={handleEditCommentData} />
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
                                                    item?.user?.id == userID ? (
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
    )
}
