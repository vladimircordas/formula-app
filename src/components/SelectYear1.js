import React from 'react';
import history from '../history';


class SelectYear extends React.Component {
    constructor() {
        super();

        this.state = {
            years: [],
            search: "",
            year: ""
        }
    }

    componentDidMount() {
        this.generateOptions();
    }

    getYear = e => {
        let linkTo = '/drivers/' + e.target.dataset.itemid;
        history.push(linkTo);
        this.setState({ year: e.target.dataset.itemid });
        console.log(this.state.year);
    }


    generateOptions = () => {
        var i;
        var years = "";
        var year = [];
        for (i = 1954; i < 2020; i++) {
            years += i + ",";
            year = years.split(",");

            this.setState({ years: year });
        }
        //console.log(year);
        return year;

    }



    render() {
        var selectYears = this.state.years;
        //console.log(selectYears);

        return (
            <div id="main-year-select">
                <div className="browser-default">
                   {selectYears.map((year, i) => <button onClick={this.getYear} key={i} data-itemid={year} className="waves-effect waves-light btn red accent-4">{year}</button>)}
                </div>
                
            </div>
        )
    }
}

export default SelectYear;