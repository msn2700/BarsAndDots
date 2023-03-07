import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getLCDFromJDN, changeToJDN} from '../../../Functions/JulianDayNumber';

const React = require('react');
const PropTypes = require('prop-types');

const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    },
});

class JDN extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jdn: changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'),
        }
        this.changeJDN = this.changeJDN.bind(this);
    }

    changeJDN (event) {
        if (event.target.value >= -36855717 && event.target.value <= 38168282){
            this.setState({
                jdn: event.target.value,
            });
            this.props.calcLCD(getLCDFromJDN(event.target.value, this.props.correlation));
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container alignItems="center">
                <Grid item md={3}>
                    <TextField
                        id="jdn"
                        label="Enter Julian Day Number"
                        fullWidth
                        value={this.state.jdn}
                        type="number"
                        onChange={this.changeJDN}
                        helperText="Use -36,855,717 to 38,168,282"
                        InputProps={{ inputProps: { min: -36855717, max: 38168282 } }}
                    />
                </Grid>
                <Grid item md={9}></Grid>
            </Grid>
        );
    }
}

JDN.propTypes = {
    classes: PropTypes.object.isRequired,
    calcLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default withStyles(styles)(JDN);

