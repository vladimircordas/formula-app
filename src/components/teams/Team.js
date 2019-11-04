import React from 'react';

import history from '../../history';

import Flag from 'react-world-flags';
import { flags } from '../functions/flags'

class Team extends React.Component {
    constructor() {
        super();
        this.state = {
            currentYear: ""
        }
    //    console.log("team " + this.state.currentYear)
    }

    componentDidMount() {
        this.setState({
            currentYear: this.props.year
        })
    }

    getTeamDetails = (e) => {
        let linkTo = '/formula-app/teams/' + this.props.teamData.Constructor.constructorId;
        history.push(linkTo);
    }

    render() {

        const { teamData } = this.props;
        const national = teamData.Constructor.nationality;
        //console.log(teamData);
        return (
            <tr>
                <td> {teamData.position} </td>
                <td>
                    <button
                        className="waves-effect waves-light btn grey darken-4 pr-50 hover-info"
                        onClick={this.getTeamDetails}
                        data-itemid={teamData.Constructor.constructorId}><div className="flagHolder">
                            <Flag code={`${flags(national)}`} />
                        </div>{teamData.Constructor.name}

                    </button>
                </td>
                <td><a href={teamData.Constructor.url} target="_blank" rel="noopener noreferrer">DETAILS  <i className="material-icons">open_in_new</i></a></td>
                <td>{teamData.points}</td>
            </tr>
        )
    }
}

export default Team;