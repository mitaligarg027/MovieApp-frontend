import React, { useEffect, useState } from 'react'
import Vector from '../images/Vectors.svg'
import load from "../images/loading-gif.gif";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logout from '../images/logout.svg'
import plus_sign from '../images/Circled_plus.svg.png'
import '../login.css'
import Movies from './Movies.js'
import { Link } from 'react-router-dom'
import { getData } from '../utils/index.js'

const MyMovies = (props) => {


    const navigate = useNavigate();

    async function HandleLogout() {
        const userData = JSON.parse(localStorage.getItem('user-info'));
        const token = userData?.token;
        // sessionStorage.clear();
        // localStorage.clear();
        let result = await fetch('http://localhost:3000/api/user/deleteUser', {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token} `
            }

        })
        result = await result.json();
        if (result.status === 'true') {
            localStorage.removeItem('user-info')
            navigate('/');
            toast.success(result.message)
        }
        else {
            toast.error(result.message)
        }


    }

    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);//current page
    const [limit, setLimit] = useState(8);//posts per page
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [noOfPages, setNoOfPages] = useState(0);
    const [showpagination, setShowPagination] = useState(true)

    const numbers = [...Array(noOfPages + 1).keys()].slice(1);



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

    }

    async function fetchInfo() {
        setLoading(true);

        // let userData = JSON.parse(localStorage.getItem('user-info'))
        // const token = userData?.data?.token;
        let item = { offset, limit };
        let result = await getData(item)


        if (result.status) {

            setData(result.movies)

            setLoading(false)
        }
        setNoOfPages(result.pages)

    }
    function handleChange(e) {
        setQuery(e.target.value)

    }
    async function handleSearch(e) {

        e.preventDefault()

        const userData = JSON.parse(localStorage.getItem('user-info'));
        const token = userData?.token;

        let item = { query }
        if (query !== '') {

            setShowPagination(false);
            setLoading(true)
            let result = await fetch('http://localhost:3000/api/movie/searchMovie', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token} `

                },
                body: JSON.stringify(item)
            });
            result = await result.json();


            if (result.status === 'true') {

                setData(result.movies);
                setLoading(false)
            }
            else {
                setLoading(false);
                toast.error(result.message)
            }


        }
        else {
            setShowPagination(true)
            fetchInfo()
        }
    }


    useEffect(() => {
        fetchInfo();

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
            <div className='container' >

                <form action="">
                    <input type="text" name='search' id='search' placeholder='search movie here' onChange={handleChange} />
                    <button type='submit' onClick={handleSearch} >Search</button>
                </form>

            </div>

            {loading ?
                <div className="text-center">
                    <img
                        className="my-3 text-center"
                        style={{ width: "60px" }}
                        src={load}
                        alt="loading..."
                    />
                </div> :
                <>

                    <div className="container movies my-3">

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

                    </div>
                </>}

            {!loading && showpagination && <nav >
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
            </nav >}
            <img src={Vector} className={` ${loading ? 'fix' : 'fix-My-Movies'}`} alt="logo" />
        </>
    )
}
export default MyMovies;