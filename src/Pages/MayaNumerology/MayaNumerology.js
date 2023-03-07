// Import all the components and packages that we'll need
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

class MayaNumerology extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            number1: 819,
            number2: 13,
        
        };

        this.changeNumber1 = this.changeNumber1.bind(this);
        this.changeNumber2 = this.changeNumber2.bind(this);
        
    }

    changeNumber1 (event) {
        if (event.target.value >= 1 && event.target.value <= 9999999) {
            this.setState({ 
                number1: event.target.value 
            });
        }
    }

    changeNumber2 (event) {
        if (event.target.value >= 1 && event.target.value <= 9999999) {
            this.setState({ 
                number2: event.target.value 
            });
        }
    }

    // ----- DEFINE FUNCTIONS -----

    // This builds the array of prime numbers one at a time
    // If a tested value is a product of two primes and is not itself prime, it will not be included, e.g. 4
    primeFactors(num) {
        let primes = [];
        for (let i = 2; i < num; i++) {
            if (num % i === 0 && this.isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }

    // This tests is a given number is prime, brute force method
    isPrime(num) {
        for(let i = 2; i < num; i++) {
            if(num % i === 0) return false;
        }
        return num !== 1;
    }

    // This gets the greatest common factor, or the largest factor that evenly divides the two numbers
    gcf(num1, num2) {
        if ( ! num2) {
            return num1;
        }
        return this.gcf(num2, num1 % num2);
    };

    // This gets the least common multiple of the two numbers
    lcm(num1, num2) {
       return (!num1 || !num2) ? 0 : Math.abs((num1 * num2) / this.gcf(num1, num2));
    }

    // This builds a list of the factors that the two numbers have in common
    commonFactors(num1, num2) {
        let factors = [];
        if (num1 > num2) {
            for (let i = 2; i <= num2; i++) {
                if (num1 % i === 0 && num2 % i === 0) {
                    factors.push(i);
                }
            }
        }
        else {
            for (let i = 2; i <= num1; i++) {
                if (num1 % i === 0 && num2 % i === 0) {
                    factors.push(i);
                }
            }
        }
        return factors;
    }

    // Create an output string that will be used in the display
    getCommonFactorString() {
        let factors = this.commonFactors(this.state.number1, this.state.number2);
        if (factors.length === 0) {
            return this.state.number1 + ' and ' + this.state.number2 + ' are relatively prime! Common factor is 1';
        }
        else {
            return 'The Common Factors of ' + this.state.number1 + ' and ' + this.state.number2 + ' are: ' + factors.toString();
        }
    }

    // ----- RENDER THE MAIN CONTENT -----

    render() {

        return(
            <div>
                <Grid container>
                    
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle } >
                            <h1>Prime Factors, Greatest Common Factors, Least Common Multiples and Other Properties</h1>
                            <p>Enter two arbitrary numbers to find their individual properties and common factors</p>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                            <Grid container justifyContent="center">
                                <Grid item xs={false} md={4}></Grid>
                                <Grid item xs={6} md={2}>
                                    <TextField 
                                        label="First Number" 
                                        type="number" 
                                        value={this.state.number1}
                                        onChange={this.changeNumber1}
                                        helperText="Use 1 - 9,999,999"
                                        InputProps={{ inputProps: { min: 1, max: 9999999 } }}
                                    />
                                </Grid>
                                <Grid item xs={false} md={false}></Grid>
                                <Grid item xs={6} md={2}>
                                    <TextField 
                                        label="Second Number" 
                                        type="number" 
                                        value={this.state.number2}
                                        onChange={this.changeNumber2} 
                                        helperText="Use 1 - 9,999,999"
                                        InputProps={{ inputProps: { min: 1, max: 9999999 } }}
                                    />
                                </Grid>
                                <Grid item xs={false} md={4}></Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                            <p>{this.isPrime(this.state.number1) ? (this.state.number1) + ' is a Prime' :
                                'The Prime Factors of ' + this.state.number1 + ' Are: ' + this.primeFactors(this.state.number1).map(num => {
                                    return num;
                                })
                            }</p>
                            <p>{this.isPrime(this.state.number2) ? (this.state.number2) + ' is a Prime' :
                                'The Prime Factors of ' + this.state.number2 + ' Are: ' + this.primeFactors(this.state.number2).map(num => {
                                    return num;
                                })
                            }
                            </p>
                            <p>The Least Common Multiple of {this.state.number1} and {this.state.number2} is {this.lcm(this.state.number1, this.state.number2)}</p>
                            <p>The Greatest Common Factor of {this.state.number1} and {this.state.number2} is {this.gcf(this.state.number1, this.state.number2)}</p>
                            <p>{this.getCommonFactorString()}</p>
                        </Paper>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}

//MathDemo.propTypes = {
//    classes: PropTypes.object.isRequired,
//}
//export default withStyles(styles)(GCFMath);

export default MayaNumerology;