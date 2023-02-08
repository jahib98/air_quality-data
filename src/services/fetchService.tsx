import { airApi } from "./api";

const getAirData = () => {
    return airApi.get('rest/data24h/');
}

export const fetchService = {
    getAirData,
}