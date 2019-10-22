import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import Team from '../components/teams/Team';



class Teams extends React.Component {
    constructor() {
        super();

        this.state = {
            teams: [],
            loading: true,
            search: "",
            year: 2013
        }
        this.getTeams = this.getTeams.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.year !== state.year) {
            return { year: props.year };
        }
        return null;
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams() {
        const year = this.state.year;
        var url = `http://ergast.com/api/f1/${year}/constructorStandings.json`;
        $.get(url, (data) => {
            //    console.log(data);
            this.setState({
                teams: data,
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
                <div>
                    <div className="loading"></div>
                </div>
            )
        }

        if (this.state.teams.MRData.StandingsTable.StandingsLists[0] === undefined) {
            return (
                <div className="wrapper">
                    <div className="row">
                        <div className="col s12">
                            <div className='breadCrumbsHolder'>
                                <Link className="breadcrumb" to="/">Home</Link>
                                <span className="breadcrumb">Teams - {this.props.year}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="table-name-and-search">
                                <div>Constructor Championship Standings - {this.state.teams.MRData.StandingsTable.season}</div>
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
                                        <th>Position</th>
                                        <th>Team</th>
                                        <th>Details</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">There is no data for the selected year...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }

        var teams = this.state.teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        var filteredResults = teams.filter(

            (team) => {
                return team.Constructor.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );


        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className='breadCrumbsHolder'>
                            <Link className="breadcrumb" to="/">Home</Link>
                            <span className="breadcrumb">Teams - {this.props.year}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="table-name-and-search">
                            <div>Constructor Championship Standings - {this.state.teams.MRData.StandingsTable.season}</div>
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
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>Details</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((team, i) => <Team teamData={team} key={i} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default Teams;