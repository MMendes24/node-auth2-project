import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}

export default axiosWithAuth 