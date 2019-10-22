import React, { Component } from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import DriverRaces from './DriverRaces';


import ErrorImage from '../../images/safety-car.gif';

import driverImages from '../functions/driverImages';

export class DriverDetails extends Component {
    constructor() {
        super();

        this.state = {
            driver: [],
            loading: true,
            year: ""
        }
    }



    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = () => {
        var year = this.props.year;
        const id = this.props.match.params.driver
        var url = `http://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`;
        $.get(url, (data) => {

            // console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver)
            this.setState({
                driver: data,
                loading: false
            });
        });

    }


    driverImagesFunction = (driverid) => {
        var imagesJson = driverImages;
        var imagesString = JSON.stringify(imagesJson);
        var result = JSON.parse(imagesString);
        for (var i = 0; i < result.length - 1; i++) {
            if (result[i].id === driverid) {
                return result[i].image;
            }
        }
    }
    render() {

        if (this.state.loading === true) {
            return (
                <div className="wrapper">
                    <div className="loading"></div>
                </div>
            )
        }


        if (this.state.driver.MRData.StandingsTable.StandingsLists[0] === undefined) {
            return (
                <div className="wrapper error">
                    <img className="error-image" src={ErrorImage} alt="error error error" />
                    <h2 className="error-message">Oooops... <span style={{ textTransform: "capitalize" }}>{this.state.driver.MRData.StandingsTable.driverId}</span> doesn't exist in the chosen year...</h2>
                    <h2 className="error-message">Pick another year to proceed!</h2>
                </div>
            )
        }



        var driver = this.state.driver.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        var driverid = driver.Driver.driverId;
        var driversYear = '/drivers/' + this.state.year;
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className='breadCrumbsHolder'>
                            <Link className="breadcrumb" to="/">Home</Link>
                            <Link className="breadcrumb" to={driversYear}>Drivers</Link>
                            <span className="breadcrumb">{driver.Driver.givenName} {driver.Driver.familyName} - {this.props.year}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 l4 margin-bottom">
                        <div className="driverDetails">
                            <div className="card">
                                <div className="card-image">
                                    <LazyLoadImage
                                        alt={driver.Driver.driverId}
                                        src={`${this.driverImagesFunction(driverid)}`} // use normal <img> attributes as props 
                                    />
                                    <div className="card-content">
                                        <span>Name: <h5>{driver.Driver.givenName} {driver.Driver.familyName}</h5> </span>
                                        <p>Nationality: {driver.Driver.nationality}</p>
                                        <p>Team: {driver.Constructors[0].name}</p>
                                        <p>Birth: {driver.Driver.dateOfBirth}</p>
                                        <p>Points: {driver.points}</p>
                                        <p>Position: {driver.position}</p>
                                        <p><a href={`${driver.Driver.url}`} target="_blank" rel="noopener noreferrer">Biography: <i className="material-icons">open_in_new</i></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 l8">
                        <div className="driverRaces">
                            <DriverRaces driverid={this.props.match.params.driver} year={this.props.year} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DriverDetails;