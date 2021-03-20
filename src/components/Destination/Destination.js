import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import Map from '../../images/Map.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {
    const { Vehicle } = useParams();
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetch('https://api.mocki.io/v1/d50fbd2f')
            .then(response => response.json())
            .then(data => setVehicles(data))
    }, [])
    const [destination, setDestination] = useState(false);
    const [destinationInfo, setDestinationInfo] = useState({
        pickFrom: '',
        pickTo: ''
    })
    const findResult = vehicles.find(vh => vh.name === Vehicle);
    const handleInfo = (event) => {
        const newDestinationInfo = { ...destinationInfo };
        newDestinationInfo[event.target.name] = event.target.value;
        setDestinationInfo(newDestinationInfo);
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="form-box">
                            {
                                destination ? <div>
                                    <div className="destination-place">
                                        <h5 className="text-left mb-3">{destinationInfo.pickFrom}</h5>
                                        <h6 className="text-left">To</h6>
                                        <h5 className="text-left">{destinationInfo.pickTo}</h5>
                                    </div>
                                    <div className="container small-card text-center">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="w-100" src={findResult.picture} alt="vehicle" />
                                            </div>
                                            <div className="col-md-3">
                                                <h6>{findResult.name}</h6>
                                            </div>
                                            <div className="col-md-3">
                                                <h6><FontAwesomeIcon icon={faUserFriends} />4</h6>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>${findResult.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container small-card text-center">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="w-100" src={findResult.picture} alt="vehicle" />
                                            </div>
                                            <div className="col-md-3">
                                                <h6>{findResult.name}</h6>
                                            </div>
                                            <div className="col-md-3">
                                                <h6><FontAwesomeIcon icon={faUserFriends} />4</h6>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>${findResult.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container small-card text-center">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="w-100" src={findResult.picture} alt="vehicle" />
                                            </div>
                                            <div className="col-md-3">
                                                <h6>{findResult.name}</h6>
                                            </div>
                                            <div className="col-md-3">
                                                <h6><FontAwesomeIcon icon={faUserFriends} />4</h6>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>${findResult.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container small-card text-center">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="w-100" src={findResult.picture} alt="vehicle" />
                                            </div>
                                            <div className="col-md-3">
                                                <h6>{findResult.name}</h6>
                                            </div>
                                            <div className="col-md-3">
                                                <h6><FontAwesomeIcon icon={faUserFriends} />4</h6>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>${findResult.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : <div>
                                        <h5 className="text-left">Pick from</h5>
                                        <input onChange={handleInfo} name="pickFrom" className="w-100 mb-3" type="text" />
                                        <h5 className="text-left">Pick to</h5>
                                        <input onChange={handleInfo} name="pickTo" className="w-100" type="text" />
                                        <button className="btn btn-primary w-100 mt-3" onClick={() => setDestination(!destination)}>Search</button>
                                    </div>
                            }

                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12 map">
                        <img className="w-100" src={Map} alt=""/>

                        {/* Can't implement google map. so that do comment this code. */}
                        {/* <SimpleMap></SimpleMap> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;