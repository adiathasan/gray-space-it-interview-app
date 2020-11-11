import axios from 'axios';

export const instanceOfAxios = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
});

export const instanceOfAxiosPosts = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});
