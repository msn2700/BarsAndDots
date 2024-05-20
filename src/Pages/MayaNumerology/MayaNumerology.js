// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

export default function MayaNumerology(){

    // First, define some local variables to store the user selection
    const [number1, setNumber1] = useState(819);
    const [number2, setNumber2] = useState(13);

    // ----- DEFINE FUNCTIONS -----

    // This builds the array of prime numbers one at a time
    // If a tested value is a product of two primes and is not itself prime, it will not be included, e.g. 4
    function primeFactors(num) {
        let primes = [];
        for (let i = 2; i < num; i++) {
            if (num % i === 0 && isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    };

    // This tests is a given number is prime, brute force method
    function isPrime(num){
        for(let i = 2; i < num; i++) {
            if(num % i === 0) return false;
        }
        return num !== 1;
    }

    // This gets the greatest common factor, or the largest factor that evenly divides the two numbers
    function gcf(num1, num2){
        if ( ! num2) {
            return num1;
        }
        return gcf(num2, num1 % num2);
    };

    // This gets the least common multiple of the two numbers
    function lcm(num1, num2){
       return (!num1 || !num2) ? 0 : Math.abs((num1 * num2) / gcf(num1, num2));
    }

    // This builds a list of the factors that the two numbers have in common
    function commonFactors(num1, num2) {
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
    function getCommonFactorString() {
        let factors = commonFactors(number1, number2);
        if (factors.length === 0) {
            return number1 + ' and ' + number2 + ' are relatively prime! Common factor is 1';
        }
        else {
            return 'The Common Factors of ' + number1 + ' and ' + number2 + ' are: ' + factors.toString();
        }
    }

    // Handle changes when the user enters different values
    function changeNumber1(event){
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            setNumber1(event.target.value);
        }
    }

    function changeNumber2(event){
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            setNumber2(event.target.value);
        }
    }

    // ----- RETURN THE MAIN CONTENT -----

    return(
        <div>
            <Grid container>
                
                <Grid item xs={12}>
                    <Paper sx={ paperStyle } >
                        <h1>Properties of Numbers</h1>
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
                                    value={number1}
                                    onChange={ (event) => changeNumber1(event) }
                                    helperText="Use 1 - 9,999,999"
                                    InputProps={{ inputProps: { min: 1, max: 9999999 } }}
                                />
                            </Grid>
                            <Grid item xs={false} md={false}></Grid>
                            <Grid item xs={6} md={2}>
                                <TextField 
                                    label="Second Number" 
                                    type="number" 
                                    value={number2}
                                    onChange={ (event) => changeNumber2(event) } 
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
                        <p>{isPrime(number1) ? (number1) + ' is a Prime' :
                            'The Prime Factors of ' + number1 + ' Are: ' + primeFactors(number1).map(num => {
                                return num;
                            })
                        }</p>
                        <p>{isPrime(number2) ? (number2) + ' is a Prime' :
                            'The Prime Factors of ' + number2 + ' Are: ' + primeFactors(number2).map(num => {
                                return num;
                            })
                        }
                        </p>
                        <p>The Least Common Multiple of {number1} and {number2} is {lcm(number1, number2)}</p>
                        <p>The Greatest Common Factor of {number1} and {number2} is {gcf(number1, number2)}</p>
                        <p>{getCommonFactorString()}</p>
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
    );

}
