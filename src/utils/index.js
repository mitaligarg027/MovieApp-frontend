import { toast } from "react-toastify";



export async function getData(data) {
    let userData = JSON.parse(localStorage.getItem('user-info'))
    console.log("userData", userData)
    const token = userData?.token;
    console.log("token", token)
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
    console.log("result2", response)
    if (!response.status) {
        toast.err(response.message)
    }

    else {

        return response;
    }
    // setData(result)

}
