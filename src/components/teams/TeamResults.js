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

        var driver1 = "no-data";
        var driver2 = "another driver";
        if (results[0].Results[0] !== undefined) {
            driver1 = results[0].Results[0].Driver.familyName;
        }

        if (results[0].Results[1] !== undefined) {
            driver2 = results[0].Results[1].Driver.familyName;
        }

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
                            <th>{driver2}</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((result, i) => <Results resultData={result} key={i} />)}
                    </tbody>
                </table>
            </div>
        )

    }
}

class Results extends React.Component {
    render() {

        const { resultData } = this.props;
        var driver1 = resultData.Results[0].status;
        var driver2 = "no-data";
        if (resultData.Results[0] !== undefined) {
            driver1 = resultData.Results[0].position;
        }
        if (resultData.Results[1] !== undefined) {
            driver2 = resultData.Results[1].position;
        }
        var points1 = 0;
        var points2 = 0;
        if (resultData.Results[0] !== undefined) {
            points1 = resultData.Results[0].points;
        }
        if (resultData.Results[1] !== undefined) {
            points2 = resultData.Results[1].points;
        }
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