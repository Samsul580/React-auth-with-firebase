import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    const { name, picture } = props.vehicle;
    return (
        <Link to={`/destination/${name}`}>
            <div className="vehicle-box">
                <img src={picture} alt="vehicle" />
                <h1 className="pb-3">{name}</h1>
            </div>
        </Link>

    );
};

export default Vehicle;