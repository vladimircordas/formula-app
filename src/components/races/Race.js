import React from 'react';
import history from '../../history';

import Flag from 'react-world-flags'
import { flags } from '../functions/flags';

class Race extends React.Component {
    constructor() {
        super();
        this.state = {
            currentYear: "",
            currentRace: ""
        }
        console.log("race " + this.state.currentYear)
    }

    componentDidMount() {
        this.setState({
            currentYear: this.props.year
        })
    }

    getRaceDetails = (e) => {
        let linkTo = '/races/' + e.target.dataset.itemid;
        history.push(linkTo);
    }

    render() {
        const { raceData } = this.props;
        const driverName =
            raceData.Results[0].Driver.givenName +
            ' ' +
            raceData.Results[0].Driver.familyName;
        const national = raceData.Circuit.Location.country;
        const drivernational = raceData.Results[0].Driver.nationality
        return (
            <tr>
                <td>{raceData.round}</td>
                <td>
                    <button
                        className="waves-effect waves-light btn grey darken-4 pr-50 hover-info"
                        onClick={this.getRaceDetails}
                        data-itemid={raceData.Circuit.circuitId}
                    >
                        <div className="flagHolder">
                            <Flag code={`${flags(national)}`} />
                        </div>
                        {raceData.raceName}
                    </button>
                </td>
                <td>{raceData.Circuit.circuitName}</td>
                <td>{raceData.date}</td>
                <td>
                    <div className="waves-effect waves-light btn-flat no-coursor flagLeft">
                        <div className="flagHolder">
                            <Flag code={`${flags(drivernational)}`} height='20' width='50' />
                        </div>
                        {driverName}
                    </div>
                </td>
            </tr>
        );
    }
}

export default Race;
