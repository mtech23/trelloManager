import React, { useState } from 'react';

export const CustomLaneHeader = ({ title, id, updateTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const saveTitle = () => {
        setIsEditing(false);
        updateTitle(id, newTitle);
    };

    return (
        <div className='editableLane'>
            {isEditing ? (
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={handleTitleChange}
                    onBlur={saveTitle} 
                    onKeyPress={(e) => e.key === 'Enter' && saveTitle()}
                />
            ) : (
                <h6 onClick={() => setIsEditing(true)}>{title}</h6>
            )}
        </div>
    );
};

export default CustomLaneHeader;
