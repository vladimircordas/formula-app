import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';

import Race from '../components/races/Race';

class Races extends React.Component {
    constructor() {
        super();

        this.state = {
            races: [],
            loading: true,
            search: "",
            year: ""
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.year !== state.year) {
            return { year: props.year };
        }
        return null;
    }
    componentDidMount() {
        this.getRaces();
    }


    getRaces = () => {
        var year = this.state.year;
        var url = `https://ergast.com/api/f1/${year}/results/1.json`;
        $.get(url, (data) => {
            this.setState({
                races: data,
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
                    <div className="loading"></div>
                </div>
            )
        }

        var races = this.state.races.MRData.RaceTable.Races;
        var filteredResults = races.filter(
            (race) => {
                return race.raceName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    race.Circuit.circuitName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    race.Results[0].Driver.givenName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    race.Results[0].Driver.familyName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className="breadCrumbsHolder">
                            <Link className="breadcrumb" to="/formula-app/">Home</Link>
                            <span className="breadcrumb">Races - {this.props.year}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="table-name-and-search">
                            <div>Tracks calendar - {this.state.races.MRData.RaceTable.Races[0].season}</div>
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
                                    <th>Race order</th>
                                    <th>Location</th>
                                    <th>Track name</th>
                                    <th>Date</th>
                                    <th>Winner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((race, i) => <Race raceData={race} key={i} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}



export default Races;