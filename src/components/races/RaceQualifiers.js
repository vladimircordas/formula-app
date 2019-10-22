import React, { Component } from 'react';
import * as $ from 'jquery';
import Flag from 'react-world-flags';
import { flags } from '../functions/flags';



export class RaceQualifiers extends Component {
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
            year: "",
            race: ""
        }


    }
    componentDidMount() {
        this.setState({
            race: this.props.raceid
        })
        this.getResults();
    }
    getResults = () => {
        const year = this.state.year;
        const id = this.props.raceid
        var url = `http://ergast.com/api/f1/${year}/circuits/${id}/qualifying.json`;
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
            return (
                <div className="wrapper">
                </div>
            )
        }
        if (this.state.results.MRData.RaceTable.Races[0] === undefined) {
            return (
                <div>
                    <div className="table-name-and-search">
                        <div>Race Qualification Results:</div>

                    </div>
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4">There is no data to be shwon...</td>
                            </tr>
                            <tr>
                                <td colSpan="4">Check the results page to see if the results exist!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        var results = this.state.results.MRData.RaceTable.Races[0].QualifyingResults;
        var filteredResults = results.filter(
            (result) => {
                return result.Driver.givenName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    result.Driver.familyName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    result.Constructor.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <div className="table-name-and-search">
                    <div>Race Qualification Results:</div>
                    <div>
                        <div className="input-field">
                            <input type="text"
                                id="search_bar"
                                value={this.state.search}
                                onChange={this.updateSearch.bind(this)}
                            />
                            <label htmlFor="search_bar"><i className="material-icons">search</i></label>
                        </div>
                    </div>
                </div>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Time</th>
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
class Results extends Component {

    render() {

        const { resultData } = this.props;
        const driverName = resultData.Driver.givenName + ' ' + resultData.Driver.familyName;
        const national = resultData.Driver.nationality;
        var qualiTime;
        if (resultData.Q3 < resultData.Q2 && resultData.Q3 < resultData.Q1) {
            qualiTime = resultData.Q3;
        } else if (resultData.Q2 < resultData.Q1 && resultData.Q2 < resultData.Q3) {
            qualiTime = resultData.Q2;
        } else {
            qualiTime = resultData.Q1;
        }

        return (
            <tr>
                <td>{resultData.position}</td>
                <td>
                    <div className="waves-effect waves-light btn-flat no-coursor flagLeft">
                        <div className="flagHolder">
                            <Flag code={`${flags(national)}`} height='20' width='50' />
                        </div>
                        {driverName}
                    </div>
                </td>
                <td>{resultData.Constructor.name}</td>
                <td>{qualiTime}</td>
            </tr>

        )
    }
}

export default RaceQualifiers;
