import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import TeamResults from './TeamResults';

import { nationToNationality } from '../functions/nationToNationality';
import { teamImage } from '../functions/teamImage';
// ERROR IMAGE
import ErrorImage from '../../images/safety-car.gif';

import teamImages from '../functions/teamImages';


class TeamDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            team: [],
            loading: true,
            year: ""
        }
    }
    componentDidMount() {
        this.getTeams();
    }

    getTeams() {
        var year = this.props.year;
        const id = this.props.match.params.team
        var url = `http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`;
        $.get(url, (data) => {

            this.setState({
                team: data,
                loading: false
            });
        });

    }
    teamImagesFunction = (constructorid) => {
        var imagesJson = teamImages;
        var imagesString = JSON.stringify(imagesJson);
        var result = JSON.parse(imagesString);
        for (var i = 0; i < result.length - 1; i++) {
            if (result[i].id === constructorid) {
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


        var teamIdFlawed = this.state.team.MRData.StandingsTable.constructorId;
        var teamId = teamIdFlawed.replace("_", " ");
        if (this.state.team.MRData.StandingsTable.StandingsLists[0] === undefined) {
            return (
                <div className="wrapper error">
                    <img className="error-image" src={ErrorImage} alt="error error error" />
                    <h2 className="error-message">Oooops... <span style={{ textTransform: "capitalize" }}>{teamId}</span> doesn't exist in the chosen year...</h2>
                    <h2 className="error-message">Pick another year to proceed!</h2>
                </div>
            )
        }
        var team = this.state.team.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
        var constructorId = team.Constructor.constructorId;
        var nationality = team.Constructor.nationality;



        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className='breadCrumbsHolder'>
                            <Link className="breadcrumb" to="/">Home</Link>
                            <Link className="breadcrumb" to="/teams">Teams</Link>
                            <span className="breadcrumb">{team.Constructor.name} - {this.props.year}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 l4 margin-bottom">
                        <div className="driverDetails">
                            <div className="card">
                                <div className="card-image">
                                    <LazyLoadImage
                                        alt={team.Constructor.name}
                                        src={`${this.teamImagesFunction(constructorId)}`} // use normal <img> attributes as props 
                                    />
                                </div>
                                <div className="card-content">
                                    <h5>Name: {team.Constructor.name}</h5>
                                    <p>Country: {`${nationToNationality(nationality)}`}</p>
                                    <p>Position: {team.position}</p>
                                    <p>Points: {team.points}</p>
                                    <p><a href={`${team.Constructor.url}`} target="_blank" rel="noopener noreferrer">History: <i className="material-icons">open_in_new</i></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 l8">
                        <div className="driverRaces">
                            <TeamResults teamid={this.props.match.params.team} year={this.props.year} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamDetails;
