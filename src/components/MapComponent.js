import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from 'react';
import axios from 'axios';

const MapComponent = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({});

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await 
                axios.get('http://localhost:5000/api/vehicle/location');
                setVehicleData(response.data);
                setCurrentPosition(response.data[0]);
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        };

        fetchVehicleData();
        const interval = setInterval(fetchVehicleData, 5000);

        return () => clearInterval(interval);
    }, []);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 17.385044,
        lng: 78.486671
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={currentPosition || defaultCenter}
            >
                {currentPosition && (
                    <Marker position={currentPosition} />
                )}
                <Polyline
                    path={vehicleData}
                    options={{ strokeColor: "#FF0000" }}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;