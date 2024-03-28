import React, { useState } from 'react'
import { useRef } from 'react'
import Vector from '../images/Vectors.svg'
import { Link, useLocation } from 'react-router-dom'
import drop from '../images/Drop.svg'
// import image1 from '../images/image1.png'
import '../login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MyMovies from './MyMovies'
const EditMovie = (props) => {
    const location = useLocation();
    const propsData = location.state;
    const movieId = propsData.movieId;
    const currentYear = new Date().getFullYear();
    const [title, setTitle] = useState(propsData.title);
    const [publishingYear, setPublishingYear] = useState(propsData.publishingYear);
    const [poster, setPoster] = useState(propsData.poster);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();


    const [isShown, setIsShown] = useState(false);
    const [isDropImageShown, setIsDropImageShown] = useState(true);

    function handleTitle(event) {
        let new_Title = event.target.value;
        setTitle(new_Title);


    }
    function handleYear(event) {
        let new_Year = event.target.value;
        setPublishingYear(new_Year);

    }

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('user-info'));
        const token = userData?.token;
        const formData = new FormData();
        formData.append('movieId', movieId)
        formData.append('title', title)
        formData.append('publishingYear', publishingYear)

        formData.append('poster', poster)
        let result = await fetch("http://localhost:3000/api/movie/editMovie", {
            method: 'PATCH',
            headers: {
                // "Content-Type": "application/json",
                // "Accept": "application/json",
                "Authorization": `Bearer ${token} `
            },
            body: formData
        });
        result = await result.json();

        if (title === "" || title == null) {
            setMessage("Title is required")
        }
        if (publishingYear === "" || publishingYear == null) {
            setMessage("Year is required")
        }
        else if (result.status === "true") {


            navigate('/my_movies');
            toast.success(result.message)
        }
        else {
            toast.error(result.message)
        }

    }
    function handleChange(e) {
        // const selectedFile = e.target.files[0];
        let new_Img = e.target.value;
        setPoster(e.target.files[0]);

        setIsShown(true);
        setIsDropImageShown(false)
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    function handleImageClick(event) {
        // Trigger the click event on the file input
        fileInputRef.current.click();
    };


    return (
        <>
            <div className='container'>
                <h1 style={{ marginLeft: "10px", marginTop: "50px" }}>Edit
                </h1>
                <form action="">
                    <div id='image_box'>
                        <div className='icon'>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleChange}
                                accept="image/*"
                            // value={propsData?.poster}
                            />
                            {isDropImageShown && <img className='preview-image' src={propsData.poster} style={{ cursor: "pointer" }}
                                onClick={handleImageClick} alt={drop} />}
                            {isShown && <img className='preview-image ' src={file} alt="" onClick={handleImageClick} />}
                            {/* {isDropImageShown && <p className='drop_image' >Drop an image here</p>} */}
                        </div>
                    </div>
                    <div className='Title'  >

                        <input style={{ width: "20%", marginTop: "4rem" }} type="text" name="text" id="text" defaultValue={propsData.title} onChange={handleTitle} />
                        <div style={{ color: "red" }}> {message} </div>
                    </div>
                    <div className='Year'>

                        <input style={{ width: "15%" }} type="number" name="year" id="year" defaultValue={propsData.publishingYear} onChange={handleYear} min="0" max={currentYear} />

                    </div>
                    <button className='editMovieButton' type="submit"
                        onClick={handleSubmit}
                    >Update</button>
                    <Link to="/my_movies"><button className='editMovieButton' style={{ background: "transparent", border: "2px solid white" }}>Cancel</button></Link>
                </form>

            </div>



            <img src={Vector} className="fix" alt="logo" />
        </>
    )
}
export default EditMovie;