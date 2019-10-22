import React from 'react';

import NotFound from '../images/page-not-found.jpg';


class Home extends React.Component {
    render() {


        return (

            <div className="wrapper" style={{backgroundColor: "#f5f5f5"}}>
               <img src={NotFound} alt="404 not found" style={{margin: "100px auto", display: 'block'}}/>
            </div>
        );
    }
}


export default Home;