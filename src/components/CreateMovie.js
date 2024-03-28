import React, { useState } from 'react'
import { useRef } from 'react'
import Vector from '../images/Vectors.svg'
import { Link } from 'react-router-dom'
import drop from '../images/Drop.svg'
import backArrow from '../images/back_arrow.png'
import '../login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMovie = () => {
    const currentYear = new Date().getFullYear();

    const [title, setTitle] = useState("");
    const [publishingYear, setPublishingYear] = useState("");
    const [poster, setPoster] = useState("");
    const [messageT, setMessageT] = useState(" ");
    const [messageY, setMessageY] = useState(" ");
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
    function handleClear() {
        localStorage.removeItem('movies');
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = JSON.parse(localStorage.getItem('user-info'));
        const token = userData?.token;

        const formData = new FormData();
        formData.append('title', title)
        formData.append('publishingYear', publishingYear)
        formData.append('poster', poster)


        let result = await fetch("http://localhost:3000/api/movie/addMovie", {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json,multipart/form-data",
                // "Accept": "application/json",
                "Authorization": `Bearer ${token} `
            },
            body: formData
        });
        result = await result.json();


        // navigate('/my_movies');
        if (title === "" || title == null) {
            setMessageT("Title is required")
        }
        if (publishingYear === "" || publishingYear == null) {
            setMessageY("Year is required")
        }
        else if (result.status === "true") {
            // alert("sca")
            localStorage.setItem("movies", JSON.stringify(result))

            navigate('/my_movies');
            toast.success(result.message, {
                autoClose: 3000

            });

        }
        else {

            toast.error(result.message);
        }


    }
    function handleChange(e) {


        let new_Img = e.target.value;
        setPoster(e.target.files[0])
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
                <Link to='/my_movies'>
                    <img className='backArrow' src={backArrow} alt="go back" />
                </Link>
                <h1 style={{ marginLeft: "10px", marginTop: "50px" }}>Create a new Movie
                </h1>
                <form >
                    <div id='image_box'>
                        <div className='icon'>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                className='form-control'
                                onChange={handleChange}
                                accept="image/*"

                            />
                            {isDropImageShown && <img className='drop' src={drop} style={{ cursor: "pointer" }}
                                onClick={handleImageClick} alt='click to upload' />}
                            {isShown && <img className='preview-image ' src={file} alt="" />}
                            {isDropImageShown && <p className='drop_image' >Drop an image here</p>}
                        </div>
                    </div>
                    <div className='Title'   >

                        <input style={{ width: "20%", marginTop: "4rem" }} type="text" name="text" id="text" placeholder='Title' onChange={handleTitle} />
                        <div style={{ color: "red" }}> {messageT} </div>
                    </div>
                    <div className='Year'>

                        <input style={{ width: "20%" }} type="number" name="year" id="year" placeholder='Publishing year' onChange={handleYear} min="0" max={currentYear} />
                        <div style={{ color: "red" }}> {messageY} </div>
                    </div>
                    <button className='createMovieButton' type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >Submit</button>
                    <button className='createMovieButton' onClick={handleClear} style={{ background: "transparent", border: "2px solid white" }}>Clear</button>
                </form>

            </div>



            <img src={Vector} className="fix" alt="logo" />
        </>
    )
}
export default CreateMovie;