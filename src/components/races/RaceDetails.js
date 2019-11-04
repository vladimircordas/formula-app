import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "materialize-css/dist/css/materialize.min.css";
import ErrorImage from '../../images/safety-car.gif';
import circuitImages from '../functions/circuitImages';

import FullWidthTabs from './RaceTabs';

class RaceDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            race: [],
            loading: true,
            raceId: "",
            year: ""
        }
    }

    componentDidMount() {
        this.getRaces();

    }

    getRaces = () => {
        const year = this.props.year;
        const id = this.props.match.params.race;
        var url = `https://ergast.com/api/f1/${year}/circuits/${id}.json`;
        $.get(url, (data) => {
            this.setState({
                race: data,
                loading: false,
                raceId: id,
                year: year
            });
        });
    }

    circuitImagesFunction = (circuitId) => {
        var images = circuitImages;
        var img = JSON.stringify(images);
        var result = JSON.parse(img);
        // console.log(result);
        for (var i = 0; i < result.length - 1; i++) {
            // console.log(result[i].id);
            if (result[i].id === circuitId) {
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
        var trackIdFlawed = this.state.race.MRData.CircuitTable.circuitId;
        var trackId = trackIdFlawed.replace("_", " ");

        if (this.state.race.MRData.CircuitTable.Circuits[0] === undefined) {
            return (
                <div className="wrapper error">
                    <img className="error-image" src={ErrorImage} alt="error error error" />
                    <h2 className="error-message">Oooops... <span style={{ textTransform: "capitalize" }}>{trackId}</span> doesn't exist in the chosen year...</h2>
                    <h2 className="error-message">Pick another year to proceed!</h2>
                </div>
            )
        }
        var race = this.state.race.MRData.CircuitTable.Circuits[0];
        var circuitId = race.circuitId;
        var circuitYear = this.state.race.MRData.CircuitTable.season;

        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className='breadCrumbsHolder'>
                            <Link className="breadcrumb" to="/formula-app/">Home</Link>
                            <Link className="breadcrumb" to="/formula-app/races">Races</Link>
                            <span className="breadcrumb">{race.circuitName} - {this.props.year}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 l4 margin-bottom">
                        <div className="driverDetails sticky">
                            <div className="driverDetails">
                                <div className="card">
                                    <div className="card-image">
                                        <LazyLoadImage
                                            alt={race.circuitId}
                                            src={process.env.PUBLIC_URL + `${this.circuitImagesFunction(circuitId)}`} // use normal <img> attributes as props 
                                        />
                                    </div>
                                    <div className="card-content">
                                        <h5>Name: {race.circuitName}</h5>
                                        <p>Country: {race.Location.country}</p>
                                        <p>Team: {race.Location.locality}</p>
                                        <p>Year: {circuitYear}</p>
                                        <p><a href={`${race.url}`} target="_blank" rel="noopener noreferrer">Full Report:  <i className="material-icons">open_in_new</i></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 l8">
                        <div className="driverRaces raceDetails">
                            <FullWidthTabs raceid={this.state.raceId} year={this.state.year} />

                            {/*<input type="checkbox" id="mobile-menu-checkbox" />
                            <div role="navigation" className="mobile-menu">
                                <RaceResults raceid={this.props.match.params.race} year={this.props.year} />
                            </div>
                            <div role="navigation" className="mobile-menu2">
                                <RaceQualifiers raceid={this.props.match.params.race} year={this.props.year} />
                            </div>

                            <div className="tabHeader">
                                <label htmlFor="mobile-menu-checkbox" id="mobile-menu-btn">
                                    <span className="menu-link"></span>
                                </label>
                             </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RaceDetails;