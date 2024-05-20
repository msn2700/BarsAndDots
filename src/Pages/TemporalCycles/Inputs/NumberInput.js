// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function NumberInput(props){

    // First, import any of the props items we'll need
    const { number, setNumber } = props;

    // Handle when the user changes the number value
    function changeNumber(event) {
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            setNumber(event.target.value);
        }
    }

    return(

        <Grid container justifyContent="center">
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={6} md={8} sx={textboxStyle}>
                <TextField
                    id="number"
                    label="Number of Days"
                    value={number}
                    type="number"
                    helperText="Use 0-9999999"
                    onChange={ (event) => changeNumber(event) }
                />
            </Grid>
            <Grid item xs={5} md={5}></Grid>
        </Grid>

    );

}

NumberInput.propTypes = {
    setNumber: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
};
