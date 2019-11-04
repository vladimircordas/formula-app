import React from 'react';
import * as $ from 'jquery';
import { racePosition } from '../functions/racePosition';

import Flag from 'react-world-flags'
import { flags } from '../functions/flags';


export class TeamResults extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.year !== state.year) {
            return { year: props.year };

        }
        return null;
    }

    constructor() {
        super();
        this.state = {
            results: [],
            loading: true,
            search: "",
            year: ""
        }
    }

    componentDidMount() {
        this.getResults();
    }

    getResults = () => {
        var year = this.state.year;
        const id = this.props.teamid;
        var url = `https://ergast.com/api/f1/${year}/constructors/${id}/results.json`;
        $.get(url, (data) => {
            this.setState({
                results: data,
                loading: false
            });
        });
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        if (this.state.loading === true) {
            return <div></div>
        }
        var results = this.state.results.MRData.RaceTable.Races;
        var filteredResults = results.filter(
            (result) => {
                return result.raceName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        //console.log(results);
        var driver1 = results[0].Results[0].Driver.familyName;
        var driver2 = results[0].Results[1] !== undefined ? results[0].Results[1].Driver.familyName : "";
        var driver1Id = results[0].Results[0].Driver.driverId;
        var driver2Id = results[0].Results[1] !== undefined ? results[0].Results[1].Driver.driverId : "";
        // var driver1 = "no-data";
        // var driver2 = "no-data";
        // if (results[0].Results[0] !== undefined) {
        //     driver1 = results[0].Results[0].Driver.familyName;
        // }

        // if (results[0].Results[1] !== undefined ) {
        //     driver2 = results[0].Results[1].Driver.familyName;
        //     if (driver1 === "Mansell" && driver2 === "Prost"){
        //         driver1="Prost";
        //         driver2="Mansell";
        //     }
        // }
        
        return (
            <div>
                <div className="table-name-and-search">
                    <div>Constructor Championship Standings - {this.props.year}</div>
                    <div>
                        <div className="input-field">
                            <input type="text"
                                id="search_bar"
                                value={this.state.search}
                                onChange={this.updateSearch.bind(this)}
                            />
                            <label htmlFor="search_bar"><i className="material-icons">search</i></label >
                        </div>
                    </div>
                </div>
                <table className="responsive-table">
                    <thead>

                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>{driver1}</th>
                            <th>{driver2 ? driver2 : "No data"}</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((result, i) => <Results year={this.props.year} resultData={result} key={i} driverOne={driver1Id} driverTwo={driver2Id}/>)}
                    </tbody>
                </table>
            </div>
        )

    }
}





class Results extends React.Component {
    render() {
        console.log(this.props.driverOne.toLowerCase());
        const { resultData } = this.props;
        console.log(resultData.Results[0].Driver.driverId);
        console.log(resultData.Results.length);
        var driver1 = resultData.Results[0].status;
        var driver2 = "no-data";
        
        var points1 = 0;
        var points2 = 0;
        if (resultData.Results[0] !== undefined) {
            if (resultData.Results[0].Driver.driverId === this.props.driverOne.toLowerCase()){
                driver1 = resultData.Results[0].position;
                points1 = resultData.Results[0].points;
            } else if(resultData.Results[1]  !== undefined ? resultData.Results[1].Driver.driverId === this.props.driverOne.toLowerCase() : "") {
                driver1 = resultData.Results[1].position;
                points1 = resultData.Results[1].points;
            } else {
                driver1 = resultData.Results[0].status;
                points1 = 0;
            }
        }
        if (resultData.Results[1] !== undefined) {
            if (resultData.Results[1].Driver.driverId === this.props.driverTwo.toLowerCase()){
                driver2 = resultData.Results[1].position;
                points2 = resultData.Results[1].points;
            } else if(resultData.Results[0]  !== undefined ? resultData.Results[0].Driver.driverId === this.props.driverTwo.toLowerCase() : "") {
                driver2 = resultData.Results[0].position;
                points2 = resultData.Results[0].points;
            } else {
                driver2 = resultData.Results[1].status;
                points2 = 0;
            }
        }
        {/* var points1 = 0;
        var points2 = 0;
        var points3 = 0;
        var points4 = 0;
        var points5 = 0;
        var points6 = 0;
        if(resultData.Results[0] !== undefined){
            points1 = resultData.Results[0].points;
        }
        if(resultData.Results[1] !== undefined){
            points2 = resultData.Results[1].points;
        }
        if(resultData.Results[2] !== undefined){
            points3 = resultData.Results[2].points;
        }
        if(resultData.Results[3] !== undefined){
            points4 = resultData.Results[3].points;
        }
        if(resultData.Results[4] !== undefined){
            points5 = resultData.Results[4].points;
        }
        if(resultData.Results[5] !== undefined){
            points6 = resultData.Results[5].points;
        }  + parseInt(points3) + parseInt(points4) + parseInt(points5) + parseInt(points6)*/}
        var pointsTotal = parseInt(points1) + parseInt(points2);

        const nation = resultData.Circuit.Location.country;
        return (
            <tr>
                <td>{resultData.round}</td>
                <td>
                    <div className="waves-effect waves-light btn-flat no-coursor flagLeft">
                        <div className="flagHolder">
                            <Flag code={`${flags(nation)}`} height='20' width='50' />
                        </div>
                        {resultData.raceName}
                    </div></td>
                <td className={`${racePosition(driver1)}`}>{driver1}</td>
                <td className={`${racePosition(driver2)}`}>{driver2}</td>
                <td>
                    {pointsTotal}
                </td>
            </tr>
        )
    }
}

export default TeamResults;