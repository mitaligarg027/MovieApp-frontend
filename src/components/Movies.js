import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../images/deleteDustbin.png';
import { getData } from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Movies = (props) => {
    const [isShown, setIsShown] = useState(false)
    let { poster, title, publishingYear, movieId, offset } = props;
    // console.log("poster", poster)
    // if (loading) {
    //     return <h2>loading...</h2>
    // }
    // console.log(title, publishingYear, movieId)
    const [query, setquery] = useState("");
    // const [offset, setOffset] = useState(1);
    const [limit, setLimit] = useState(8);
    const dataToPass = { movieId, title, publishingYear, poster };
    // console.log(dataToPass)
    const myFunction = () => {
        setIsShown(!isShown);

    }

    const userData = JSON.parse(localStorage.getItem('user-info'));
    const token = userData?.token;
    async function handleDelete() {
        // console.log("abcd")

        let item = { query, offset, limit };
        let result = await fetch("http://localhost:3000/api/movie/deleteMovie",
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ movieId: movieId })
            });
        result = await result.json();
        // setOffset()
        const response = await getData(item);
        // console.log("response", response)
        // console.log("offsetNo", offset)
        if (response.status === "true") {

            props.setData(response?.movies)
            toast.success(result.message, {
                autoClose: 3000

            });
        }
        else {
            toast.error(result.message)
        }


    }


    return (
        <>
            <div className="my-3 card-group">
                <div className="card" style={{ width: "18rem" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "absolute",
                            right: "0",
                            marginTop: "-8px"
                        }}
                    >
                        {/* <Link to='/editMovie' >
                            <span className="badge rounded-circle bg-dark">...</span>
                        </Link> */}

                        <div className="">
                            <button className='badge rounded-circle bg-dark' onClick={myFunction} >...</button>
                            {isShown ? (
                                <div className='d-flex flex-column dropdown '>
                                    <div className=''>
                                        <Link to='/editMovie' state={dataToPass}  >
                                            <i className="fa fa-edit editIcon"></i>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link onClick={handleDelete}>
                                            <img className='deleteIcon editDelete ' src={deleteIcon} alt="edit" />
                                        </Link>
                                    </div>

                                </div>) : <></>}

                        </div>
                    </div>
                    <img className="card-img-top  " src={poster} alt="" />
                    <div className="card-body">
                        <p style={{ color: "white" }} className="card-text">{title}</p>
                        <p style={{ color: "white" }} className="card-text">{publishingYear}</p>
                    </div>
                </div>
            </div >



        </>
    )
}
export default Movies;
