import React, { useEffect, useState } from 'react';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css'

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetch('https://api.mocki.io/v1/d50fbd2f')
            .then(response => response.json())
            .then(data => setVehicles(data))
    }, [])
    return (
        <div className="home">
            <div className="vehicles-area container">
                {
                    vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
                }
            </div>
        </div>
    );
};

export default Home;