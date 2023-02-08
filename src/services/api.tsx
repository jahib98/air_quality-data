import axios from 'axios';

export const baseUrl = 'https://skopje.pulse.eco/';

export const airApi = axios.create({
    baseURL: `${baseUrl}`
});
