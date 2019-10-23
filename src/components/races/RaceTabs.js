import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import RaceResults from './RaceResults';
import RaceQualifiers from './RaceQualifiers';
import { red } from '@material-ui/core/colors';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabStyle: {
    backgroundColor: '#b2b2b2',
    color: '#d50000',
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    console.log(this.props.raceid)
    console.log(this.props.year)
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollButtons="auto"

            variant="fullWidth"
          >
            <Tab label="Qualifications" />
            <Tab label="Race results" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
          <RaceQualifiers year={this.props.year} raceid={this.props.raceid} />
        </TabContainer>}
        {value === 1 && <TabContainer>
          <RaceResults year={this.props.year} raceid={this.props.raceid} />
        </TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
