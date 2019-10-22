import React from 'react';
import history from '../../history';

import Flag from 'react-world-flags'
import { flags } from '../functions/flags';

class Driver extends React.Component {
    constructor() {
        super();
        this.state = {
            currentYear: ""
        }
    }

    componentDidMount() {
        this.setState({
            currentYear: this.props.year
        })
    }

    getDriverDetails = (e) => {
        let linkTo = '/drivers/' + this.props.postData.Driver.driverId;
        history.push(linkTo);
    }


    render() {

        const national = this.props.postData.Driver.nationality
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.postData.position}</td>
                    <td>
                        <button
                            onClick={this.getDriverDetails}
                            data-itemid={this.props.postData.Driver.driverId}
                            className="waves-effect waves-light btn grey darken-4 pr-50 hover-info">
                            <div className="flagHolder">
                                <Flag code={`${flags(national)}`} />
                            </div>
                            {this.props.postData.Driver.givenName} {this.props.postData.Driver.familyName}
                        </button>
                    </td>
                    <td>{this.props.postData.Constructors[0].name}</td>
                    <td>{this.props.postData.points}</td>
                </tr>
            </React.Fragment>
        );
    }
}

export default Driver;