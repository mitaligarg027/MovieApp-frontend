import React, { useEffect, useState } from 'react'
import Vector from '../images/Vectors.svg'
import load from "../images/loading-gif.gif";
import { useNavigate } from 'react-router-dom'

import logout from '../images/logout.svg'
import plus_sign from '../images/Circled_plus.svg.png'
import '../login.css'
import Movies from './Movies.js'
import { Link } from 'react-router-dom'
import { getData } from '../utils/index.js'
// import { off } from 'rsuite/esm/DOMHelper/index.js'
const MyMovies = (props) => {


    const navigate = useNavigate();
    function HandleLogout() {
        // sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    }
    // const [query, setquery] = useState("");
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);//current page
    const [limit, setLimit] = useState(8);//posts per page
    const [data, setData] = useState([]);
    const [noOfPages, setNoOfPages] = useState(0);
    //get current posts
    // console.log(data.length)
    const indexOfLastPost = offset * data.length;
    const indexOfFirstPost = indexOfLastPost - limit;
    // console.log(indexOfFirstPost, indexOfLastPost)
    // console.log("dataGet", data)
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost); //posts on current page
    // console.log("currentpost", currentPosts)
    const numbers = [...Array(noOfPages + 1).keys()].slice(1);
    // console.log("numbers", numbers)


    function prePage() {
        if (offset !== 1) {
            setOffset(offset - 1);
        }


    }
    function nextPage() {
        if (offset !== noOfPages) {
            setOffset(offset + 1);
        }
    }
    function changeCurrentPage(id) {
        setOffset(id)
        // console.log("prev", data)
        // console.log('prroffset', offset);
        // console.log('prrlimit', limit);
    }

    async function fetchInfo() {
        setLoading(true);

        // let userData = JSON.parse(localStorage.getItem('user-info'))
        // const token = userData?.data?.token;
        let item = { offset, limit };
        let result = await getData(item)
        // console.log("data1", data)
        // console.log("result", result)

        if (result.status) {
            // console.log("movies", result.allMovies)
            setData(result.movies)
            console.log("data2", data)
            setLoading(false)
        }
        setNoOfPages(result.pages)

    }
    // console.log("pagesno", noOfPages)
    // console.log("finalData", data)

    useEffect(() => {
        fetchInfo();
        // console.log("res", res)
    }, [offset])

    return (
        <>
            <div className='container h-100vh'>
                <p>My movies
                    <Link to='/createMovie'><img className='plus' src={plus_sign} alt="" /></Link>
                    <span style={{ float: "right" }}>Logout
                        <img src={logout} alt="" onClick={HandleLogout} />
                    </span></p>

            </div>

            {loading ?
                <div className="text-center">
                    <img
                        className="my-3 text-center"
                        style={{ width: "60px" }}
                        src={load}
                        alt="loading..."
                    />
                </div> : <div className="container movies my-3">
                    <div className="row">
                        {data.map((value, index) => {
                            return (
                                <div className="col-lg-3" key={index}>
                                    <Movies poster={value.poster} title={value.title} publishingYear={value.publishingYear} movieId={value._id} setData={setData} loading={loading} offset={offset}
                                    />
                                </div>
                            )
                        }
                        )}

                    </div>

                </div>}
            {/* <div className="container paginationButtons">
                <button className='prevButton'>prev</button>
                <button className='firstButton'>1</button>
                <button className='secondButton'>2</button>
                <button className='nextButton'>next</button>
            </div> */}
            {!loading && <nav>
                <ul className="pagination paginationButtons">
                    <li className="page-item">
                        <Link style={{
                            backgroundColor: "#083545",
                            borderColor: "#083545"
                        }} className='page-link prevButton' onClick={prePage}>Prev</Link>
                    </li>
                    {
                        numbers.map((value, index) => (
                            <li className={`page-item ${offset === value ? 'active' : ''}`} key={index}>
                                {/* offset is current page */}
                                <Link className='page-link numberButton' onClick={() => changeCurrentPage(value)}>{value}</Link>
                            </li>

                        ))
                    }
                    <li className="page-item ">
                        <Link style={{
                            backgroundColor: "#083545",
                            borderColor: "#083545"
                        }} className='page-link nextButton' onClick={nextPage}>Next</Link>
                    </li>
                </ul>
            </nav>}
            <img src={Vector} className={` ${loading ? 'fix' : 'fix-My-Movies'}`} alt="logo" />
        </>
    )
}
export default MyMovies;