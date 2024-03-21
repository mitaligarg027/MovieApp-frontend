import React from 'react'
import '../login.css'
import Vector from '../images/Vectors.svg'
import { Link } from 'react-router-dom'
const AddMovie = () => {
    return (
        <>
            <div id='box1'>
                <h1 style={{ color: "white", marginLeft: "-17%" }}>Your movie list is empty</h1>
                <Link to="/my_movies"><button className='addMovieButton'>Add a new movie</button></Link>

            </div> <img src={Vector} className="fix" alt="logo" />

        </>

    )
}
export default AddMovie;
