import axios from 'axios';
import {apiURL} from "./constans";

const axiosNews = axios.create({
    baseURL: apiURL
});

export default axiosNews;