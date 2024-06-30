import axios from 'axios';

const paymentAxios = axios.create({
    baseURL: 'http://localhost:3000/', // Замените на ваш URL
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default paymentAxios
