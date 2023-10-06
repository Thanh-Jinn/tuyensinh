import axios from "axios";

const intern = axios.create({
    baseURL: "http://localhost:8080",
});

intern.interceptors.response.use((response) => {
    const { data } = response;

    return data;
});

export default intern;
