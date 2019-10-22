import React from 'react';


class SelectYear extends React.Component {
    constructor() {
        super();
        this.state = {
            yearSelected: ""
        }

        this.handleChangeYear = this.handleChangeYear.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeYear(e) {
        this.props.getYear(e.target.value)
        console.log(this.props.year);
    }
    // handleSubmit(event){

    //     event.preventDefault();
    // }
    render() {
        let minOffset = 0, maxOffset = 69;
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for (let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear - x);
        }


        const yearList = allYears.map((year, i) => <option key={i} value={year}>{year}</option>);
        return (

            <form id="main-year-select" onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label htmlFor="yearSelect">Select a year:</label>
                    <select className="browser-default" id="yearSelect" onChange={this.handleChangeYear}>
                        <option value="">{this.props.year}</option>
                        {yearList}
                    </select>
                </div>
            </form>
        )
    }
}

export default SelectYear;