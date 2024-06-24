// src/components/SearchAutocomplete.jsx

import React, { useState, useEffect } from 'react';
import { base_url } from '../../Api/base_url';
import './style.css'
import CustomInput from '../CustomInput';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTabletScreenButton } from '@fortawesome/free-solid-svg-icons/faTabletScreenButton';
import { faDesktop, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

const SearchAutocomplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const LogoutData = localStorage.getItem('login');
    const [increaseWidth, setIncreaseWidth] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('search', query);

                const response = await fetch(`${base_url}/api/search`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${LogoutData}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
            setIsLoading(false);
        };

        fetchSuggestions();
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        console.log(query)
    };

    return (
        <div className='searchBar'>
            <CustomInput
                type="text"
                value={query}
                onChange={handleInputChange}
                onClick={() => { setIncreaseWidth(true) }}
                // onBlur={() => { setIncreaseWidth(false) }}
                inputClass={`mainInput ${increaseWidth === true ? 'w-550' : ''}`}
                placeholder="Search..."
            />
            {increaseWidth && (
                isLoading || suggestions?.cards?.length > 0 ? (
                    <div className='dropDownSearch'>
                        {isLoading && <div>Loading...</div>}
                        {suggestions?.cards?.length > 0 && (
                            <ul onMouseEnter={() => { setIncreaseWidth(true) }}>
                                {suggestions?.cards.map((suggestion, index) => (
                                    <li key={index} >
                                        <Link to={`/b/${suggestion?.boardcode}/${suggestion?.slug}`}>
                                            <div className='searchData'>
                                                <div className='iconBoxData'>
                                                    <FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon>
                                                </div>
                                                <div className='dataTitle'>
                                                    <p>{suggestion?.title}</p>
                                                    <small>{suggestion?.boardname} : {suggestion?.boardlist?.title}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : ''
            )

            }


        </div>
    );
};

export default SearchAutocomplete;
