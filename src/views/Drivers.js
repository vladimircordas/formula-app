import React from 'react';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import Driver from '../components/drivers/Driver';



class Drivers extends React.Component {
    constructor() {
        super();

        this.state = {
            drivers: [],
            loading: true,
            search: "",
            year: ""
        }
        this.getDrivers = this.getDrivers.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.year !== state.year) {
            return { year: props.year };
        }
        return null;
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers() {
        var year = this.state.year;
        //console.log(year);
        var url = `https://ergast.com/api/f1/${year}/driverStandings.json`;
        $.get(url, (data) => {
            //console.log(data);
            this.setState({
                drivers: data,
                loading: false
            });
        });
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        //console.log(this.state.drivers);
        //console.log(this.props.year);
        console.log('drivers ' + this.state.year);
        if (this.state.loading === true) {
            return (
                <div className="wrapper">
                    <div className="loading"></div>
                </div>
            )
        }

        var drivers = this.state.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        var filteredResults = drivers.filter(
            (driver) => {
                return driver.Driver.givenName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    driver.Driver.familyName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    driver.Constructors[0].name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s12">
                        <Link className="breadcrumb" to="/">Home</Link>
                        <span className="breadcrumb">Drivers - {this.props.year}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="table-name-and-search">
                            <div>Drivers Championship Standings - {this.props.year}</div>
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
                                    <th>Name</th>
                                    <th>Constructor</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((driver, i) => <Driver postData={driver} key={i} year={this.state.year} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default Drivers;