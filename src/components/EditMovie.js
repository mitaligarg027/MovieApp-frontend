import React, { useState } from 'react'
import { useRef } from 'react'
import Vector from '../images/Vectors.svg'
import { Link, useLocation } from 'react-router-dom'
// import image1 from '../images/image1.png'
import '../login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import MyMovies from './MyMovies'
const EditMovie = (props) => {
    const location = useLocation();
    const propsData = location.state;
    // console.log('propsdata', propsData)
    const movieId = propsData.movieId;
    const currentYear = new Date().getFullYear();
    const [title, setTitle] = useState(propsData.title);
    const [publishingYear, setPublishingYear] = useState(propsData.publishingYear);
    const [img, setImg] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();


    const [isShown, setIsShown] = useState(false);
    const [isDropImageShown, setIsDropImageShown] = useState(true);
    console.log(title);
    function handleTitle(event) {
        let new_Title = event.target.value;
        setTitle(new_Title);
        console.log(new_Title)

    }
    function handleYear(event) {
        let new_Year = event.target.value;
        setPublishingYear(new_Year);

    }
    // console.log(title, publishingYear)
    async function handleSubmit(e) {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('user-info'));
        const token = userData?.token;

        let item = { movieId, title, publishingYear };
        let result = await fetch("http://localhost:3000/api/movie/editMovie", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token} `
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        // console.log('result', item)
        // setTitle(title);

        if (title === "" || title == null) {
            console.log(title)
            setMessage("Title is required")
            console.log(message)
        }
        if (publishingYear === "" || publishingYear == null) {
            setMessage("Year is required")
        }
        else if (result.status === "true") {

            // localStorage.setItem("movies", JSON.stringify(result))

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
        setImg(new_Img);
        console.log(e.target.files);
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
                            />
                            {isDropImageShown && <img className='preview-image' style={{ cursor: "pointer" }}
                                onClick={handleImageClick} alt='' />}
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