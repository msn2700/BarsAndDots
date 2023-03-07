
import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

const React = require('react');
const PropTypes = require('prop-types');

const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    },
});

class LCD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lcd: getLCDFromJDN( changeToJDN( new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), this.props.correlation),
        }
        this.handleLCDChange = this.handleLCDChange.bind(this);
    }

    handleLCDChange (event) {
        if (event.target.value >= -37440000 && event.target.value <= 37583999){
            this.setState({
                // This needs to be parsed as an integer or it will add a zero to whatever
                // LCD it is given, e.g. enter 1,500 and it passed 15,000 to Calendar Core
                lcd: parseInt(event.target.value,10)
            });
            this.props.calcLCD(event.target.value);
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container alignItems="center">
                <Grid item md={3}>
                    <TextField
                        id="lcd"
                        label="Enter Long Count Decimal"
                        value={this.state.lcd}
                        fullWidth
                        type="number"
                        onChange={this.handleLCDChange}
                        helperText="Use -37,440,000 to 37,583,999"
                        InputProps={{ inputProps: { min: -37440000, max: 37583999 } }}
                    />
                </Grid>
                <Grid item md={9}></Grid>
            </Grid>
        );
    }
}

LCD.propTypes = {
    classes: PropTypes.object.isRequired,
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};

export default withStyles(styles)(LCD);
