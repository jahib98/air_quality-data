import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {DataContext} from "../context/DataContext";
import {AirData} from "../config";

const ListingDetails = () => {
    const [selectedValue, setSelectedValue] = useState("pm10");
    const { data, loading } = useContext(DataContext);
    const { id } = useParams();
    const [sensor, setSensor] = useState<AirData | undefined>();
    const [averageLast12Hours, setAverageLast12Hours] = useState<number | undefined>();
    const [average24Hours, setAverage24Hours] = useState<number | undefined>();

    useEffect(() => {
        if (!loading) {
            const sensor = data.find((item: AirData) => item.sensorId === id);
            setSensor(sensor);
            filterBasedOnType(selectedValue);
        }
    }, [id, data]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>);
    }

    const filterBasedOnType = (type: string) => {
        const filteredData = data.filter((item: AirData) => item.type === type && item.sensorId === id);
        const currentTime = new Date();
        const twelveHoursAgo = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000);
        let sum12 = 0;
        let sum24 = 0;
        filteredData.forEach((item: AirData) => {
            const itemDate = new Date(item.stamp);
            if (itemDate > twelveHoursAgo) {
                sum12 += parseInt(item.value);
            }});

        filteredData.forEach((item: AirData) => {
            sum24 += parseInt(item.value);
        });
        sum12 = sum12 / filteredData?.length
        sum24 = sum24 / filteredData?.length
        setAverageLast12Hours(sum12);
        setAverage24Hours(sum24);
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        filterBasedOnType(event.target.value);
    };

    return (
        <div>
            <h2 className='details-title'>{sensor?.sensorId}</h2>
            <div>
                <h4 className='select-title'>Select pm type:</h4>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                <select value={selectedValue} onChange={handleChange} className='select-design'>
                    <option selected={true} value="pm10">pm10</option>
                    <option value="pm25">pm25</option>
                </select>
                </div>
            </div>
            <div className='container-average'>
                <div className='average-style'>
                    {averageLast12Hours && average24Hours ?
                        <>
                            <h3>Average last 12 hours is : {averageLast12Hours?.toFixed(3)}</h3>
                            <h3>Average last 24 hours is : {average24Hours?.toFixed(3)}</h3></>
                        :
                        <h3>No data found</h3>}
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;