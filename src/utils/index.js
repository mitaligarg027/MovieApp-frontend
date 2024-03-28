import { toast } from "react-toastify";



export async function getData(data) {
    let userData = JSON.parse(localStorage.getItem('user-info'))

    const token = userData?.token;

    let result = await fetch("http://localhost:3000/api/movie/getMovies",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)

        });
    const response = await result.json();

    if (!response.status) {
        toast.err(response.message)
    }

    else {

        return response;
    }
    // setData(result)

}
