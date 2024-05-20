// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

// Load the various input pages
import CRDiff     from './Inputs/CRDiff';
import CRPos      from './Inputs/CRPos';
import HaabDiff   from './Inputs/HaabDiff';
import HaabPos    from './Inputs/HaabPos';
import LCDiff     from './Inputs/LCDiff';
import TzolkDiff  from './Inputs/TzolkDiff';
import TzolkPos   from './Inputs/TzolkPos';
import GJDiff     from './Inputs/GJDiff';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

export default function DateDiffs(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

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
                        <CRPos names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <CRDiff names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <TzolkPos names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <TzolkDiff names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <HaabPos names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <HaabDiff names={names} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <LCDiff correlation={correlation} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <GJDiff correlation={correlation} />
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );

}

DateDiffs.propTypes = {
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};