import React, { createContext, useState, useEffect } from 'react';
import {fetchService} from "../services";
import {AirData} from "../config";
import {AxiosResponse} from "axios";

export interface ContextType {
    data: Array<AirData>;
    loading?: boolean;
}

export const DataContext = createContext<ContextType>({
    data: [],
    loading: true
} );

const DataContextProvider = (props : any) => {
    const [data, setData] = useState<Array<AirData>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchService.getAirData().then((res: AxiosResponse<AirData[]>) => {
            setData(res.data);
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    },[])


    return (
        <DataContext.Provider value={{data,loading}}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;