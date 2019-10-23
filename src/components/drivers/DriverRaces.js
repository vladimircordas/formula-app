import React from 'react';
import * as $ from 'jquery';
import { racePosition } from '../functions/racePosition';


export class DriverRaces extends React.Component {
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
        //    console.log(this.state.year);
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    getResults = () => {
        var year = this.state.year;
        console.log(year);
        const id = this.props.driverid;
        var url = `https://ergast.com/api/f1/${year}/drivers/${id}/results.json`;
        $.get(url, (data) => {
            this.setState({
                results: data,
                loading: false
            });
        });
    }
    render() {


        if (this.state.loading === true) {
            return (
                <div className="wrapper">
                </div>
            )
        }
        var results = this.state.results.MRData.RaceTable.Races;
        var filteredResults = results.filter(
            (result) => {
                return result.raceName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (

            <React.Fragment>
                <div className="table-name-and-search">
                    <div><span style={{ textTransform: 'capitalize' }}>{this.state.driver}</span> season {this.props.year} results</div>
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
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((result, i) => <Results resultData={result} key={i} />)}
                    </tbody>
                </table>
            </React.Fragment>
        )

    }
}

class Results extends React.Component {
    render() {

        const driver = this.props.resultData.Results[0].position;
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.resultData.round}</td>
                    <td>{this.props.resultData.raceName}</td>
                    <td>{this.props.resultData.Results[0].Constructor.name}</td>
                    <td>{this.props.resultData.Results[0].grid}</td>
                    <td className={`${racePosition(driver)}`}>{this.props.resultData.Results[0].position}</td>
                </tr>
            </React.Fragment>
        )
    }
}

export default DriverRaces;