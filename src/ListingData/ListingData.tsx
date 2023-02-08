import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import {AirData} from "../config";
import './ListingData.css';

const ListingData = () => {

    const { data, loading } = useContext(DataContext);

    if (loading) {
        return (
            <div className="loader-container">
            <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <h2 className='title-text'>Air quality</h2>
        <ul>
            {data.map((item: AirData, index:any) => (
                <li key={index} className='main-list-item'>
                    <Link to={`/listing/details/${item.sensorId}`}>{item.sensorId}</Link>
                </li>
            ))}
        </ul>
            </>
    );
};

export default ListingData;
