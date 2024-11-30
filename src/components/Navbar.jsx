import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import fblogo from "../../images/logo.png";
import { Modal } from 'bootstrap';

function Navbar() {
    const navigate = useNavigate();
    const account = JSON.parse(localStorage.getItem('userData'));
    const [searchInput, setSearchInput] = useState('');
    const [animeSynopsis, setAnimeSynopsis] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const modalRef = useRef(null);

    function handleInputChange(e) {
        setSearchInput(e.target.value);
    }

    async function handleSearchSubmit(e) {
        e.preventDefault();
        if (searchInput) {
            await fetchAnimeSynopsis(searchInput);
            const modalInstance = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
            modalInstance.show();
        }
    }

    // Fetch anime synopsis
    async function fetchAnimeSynopsis(title) {
        try {
            const response = await fetch(`https://minifb-project.onrender.com/anime/synopsis?title=${title}`);
            if (response.ok) {
                const data = await response.json();
                setAnimeSynopsis(data.synopsis);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Error fetching synopsis');
                setAnimeSynopsis('');
            }
        } catch (error) {
            console.error('Error fetching anime synopsis: ', error);
            setErrorMessage('An unexpected error occurred.');
            setAnimeSynopsis('');
        }
    }

    function handleLogout() {
        navigate('/login');
        localStorage.clear();
    }

    return (
        <div>
            <Grid container className="navbar_main">
                <Grid size={3}>
                    <div className='navbar_leftbar'>
                        <img className="navbar_logo" src={fblogo} width="35px" alt="Logo" />
                        <form onSubmit={handleSearchSubmit}>
                            <input 
                                className="navbar_search" 
                                type="text" 
                                placeholder='Search Anime Synopsis'
                                value={searchInput}
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>
                </Grid>
                <Grid size={6}></Grid>
                <Grid size={3}>
                    <div className='navbar_right'>
                        <div className='navbar_righttab'>
                            <Avatar 
                                className='navbar_rightimg' 
                                src={account.profilePicture}
                            />
                        </div>
                        <button className='btn' onClick={handleLogout}>Logout</button>
                    </div>
                </Grid>
            </Grid>
            <div className="modal fade" id="synopsisModal" tabIndex="-1" aria-labelledby="synopsisModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="synopsisModalLabel">{searchInput} Synopsis</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {animeSynopsis ? (
                                <p>{animeSynopsis}</p>
                            ) : errorMessage ? (
                                <p className="text-danger">{errorMessage}</p>
                            ) : (
                                <p>No Results Found.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;