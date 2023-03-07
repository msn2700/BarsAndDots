// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

// Load the various input pages
import CRDiff from './inputs/CRDiff';
import CRPos from './inputs/CRPos';
import HaabDiff from './inputs/HaabDiff';
import HaabPos from './inputs/HaabPos';
import LCDiff from './inputs/LCDiff';
import TzolkDiff from './inputs/TzolkDiff';
import TzolkPos from './inputs/TzolkPos';
import GJDiff from './inputs/GJDiff';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

class DateDiffs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Just a placeholder, no variables needed
        };
    }

    render() {

        return(
            <div>
                <Grid container>
                    
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <h1>Date Differences and Positions in Maya Cycles</h1>
                            <p>Use the dropdowns / number entry below to find cycle positions and differences<br></br>
                            Remember to select a Haab day number between 0 and 4 for Uayeb</p>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <CRPos names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <CRDiff names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <TzolkPos names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <TzolkDiff names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <HaabPos names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <HaabDiff names={this.props.names} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <LCDiff correlation={this.props.correlation} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <GJDiff correlation={this.props.correlation} />
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

DateDiffs.propTypes = {
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default DateDiffs;