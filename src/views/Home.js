import React from 'react';
import ReactPlayer from 'react-player';



class Home extends React.Component {

    render() {
        console.log('home ' + this.props.year);

        return (

            <div className="wrapper">
                <h1 className="white-text text-darken-2 center-align">Welcome to Formula 1 Stats!</h1>
                <h4 className="white-text text-darken-2 center-align">Current year is set to <span style={{backgroundColor: "rgba(0,0,0,0.5)", color: "#d50000", padding: "0 5px"}}>{this.props.year}</span></h4>
                <h4 className="white-text text-darken-2 center-align">You can change it in the menu above!</h4>
                <div className="video-background">
                    <div className="video-overlay"></div>
                    <div className="video-foreground">
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=u1pPJj803Hk'
                            playing
                            youtube={{ playerVars: { showinfo: 1 } }}
                            loop={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;