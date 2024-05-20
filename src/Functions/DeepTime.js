// NOTE: The functions below are only used on the Deep Time page

// Function to take an LCD as input and produce the long count format, e.g. 1.2.3.4.5 etc. up to 24th order
export function buildBigLCFromLCD(lcd){

    // Store the number of days in each order
    let daysInOrder = [];

    // For reference, these are the number of days in each of the orders (see PhD thesis of Carl Calloway)
    // Stores these as big integers for now and see if it works

    daysInOrder[0] = 1n;
    daysInOrder[1] = 20n;
    daysInOrder[2] = 360n;
    daysInOrder[3] = 7200n;
    daysInOrder[4] = 144000n;
    daysInOrder[5] = 2880000n;
    
    daysInOrder[6] = 57600000n;
    daysInOrder[7] = 1152000000n;
    daysInOrder[8] = 23040000000n;
    daysInOrder[9] = 460800000000n;
    daysInOrder[10] = 9216000000000n;
    daysInOrder[11] = 184320000000000n;

    daysInOrder[12] = 3686400000000000n;
    daysInOrder[13] = 73728000000000000n;
    daysInOrder[14] = 1474560000000000000n;
    daysInOrder[15] = 29491200000000000000n;
    daysInOrder[16] = 589824000000000000000n;
    daysInOrder[17] = 11796480000000000000000n;

    daysInOrder[18] = 235929600000000000000000n;
    daysInOrder[19] = 4718592000000000000000000n;
    daysInOrder[20] = 94371840000000000000000000n;
    daysInOrder[21] = 1887436800000000000000000000n;
    daysInOrder[22] = 37748736000000000000000000000n;
    daysInOrder[23] = 754974720000000000000000000000n;

    // Create a temp variable that starts with the offset we would use for a negative LCD
    // This corresponds to 10.0.0.0.0 . 0.0.0.0.0.0 . 0.0.0.0.0.0 . 0.0.0.0.0.0
    // This is the number of days backward from Era Day to reach that long count
    let offset = 7549747199999999999999998992000n;

    // The lcd input is negative, use the offset; otherwise no need to
    let remaining = 0n;
    if (lcd >= 0 ){
        remaining = BigInt(lcd);
    } else {
        remaining = BigInt(lcd + offset);
    }

    // Store the coefficients for each order, to be populated
    let coefficients = [0n,0n,0n,0n,0n,0n, 0n,0n,0n,0n,0n,0n, 0n,0n,0n,0n,0n,0n, 0n,0n,0n,0n,0n,0n]; // Using 24 orders

    // Now loop through all the orders to see how many of each we have in this LCD
    // Start with the largest order and work your way down
    // After finding each coefficient, remove that chunk of time from the LCD for the next division
    for (let i = 23; i > -1; i--){
        coefficients[i] = remaining / daysInOrder[i];
        remaining = remaining - coefficients[i] * daysInOrder[i];
    }

    // If the LCD was negative, need to correct the 24th order term; otherwise do nothing
    // This ensures that the 24th order term will have a value of 10-19
    if (lcd < 0) { coefficients[23] += 10n; }

    // Now that we have the cofficients, let's reassemble them into a long count format
    let newBigLC = String(coefficients[23]);
    for (let i = 22; i > -1; i--){
        newBigLC = newBigLC + '.' + String(coefficients[i]);
    }

    // Return the large, concatenated string we just made
    return String(newBigLC);

}

// New function to parse a long count string back into baktuns, katuns, etc. and produce an LCD
export function parseBigLCString(lcString){

    // Define a variable to hold a VERY large LCD integer (big int)
    let newLCD = 0n;

    // Take the input and parse it using periods; there should be 24 pieces if the user entered it correctly
    let parsedString = lcString.split(".");

    // Determine how many orders were entered; we need at least 2 for this to work
    // NOTE: If the original string doesn't have a single period, it will return the whole string as 1 item
    let orderCount = parsedString.length;

    // ---- BEGIN INPUT QA ----

    // We need to check that each fragment is not empty, i.e. they entered "......."
    // If the empty count remains zero, we're good to go
    let emptyCount = 0;
    for (let k = 0; k < orderCount; k++){
        if(parsedString[k] === ""){
            emptyCount++;
        }
    } 

    // Now we need to ensure that the periods separated a list of numbers, not random characters
    // If the number count = the order count, we're good to go
    let numCount = 0;
    for (let j = 0; j < orderCount; j++){
        if(!isNaN(parsedString[j])){
            numCount++;
        }
    }

    // Now we need to ensure that all numbers have appropriate values: 0-19 (vigesimal system)
    // If the number accepted = order count, we're good to go 
    let numAccept = 0;
    if (emptyCount === 0 && numCount === orderCount){
        for (let m = 0; m < orderCount; m++){
            if (Number(parsedString[m]) < 20) {
                numAccept++;
            }
        }
    }

    // ---- END INPUT QA ----

    // If we can pass all the quality tests, we proceed to parse; otherwise we default to a value = -1
    if (orderCount > 1 && orderCount < 25 && numCount === orderCount && emptyCount === 0 && numAccept === orderCount){

        // The order reflects the way it is entered, which is baktun, katun, tun, winal, kin
        // Reverse the order so that it represents kin, winal, tun, katun, baktun, etc. 
        parsedString.reverse();

        // Declare an array to hold the multiplier coefficients, all are zero by default
        let coefficients = [ 0n,0n,0n,0n,0n,0n,  0n,0n,0n,0n,0n,0n,  0n,0n,0n,0n,0n,0n,  0n,0n,0n,0n,0n,0n];

        // Load the values entered by the user into the array; any values not entered remain zero
        for (let i = 0; i < orderCount; i++) { 
            coefficients[i] = BigInt(parsedString[i]);
        }

        // Store the number of days in each order
        let daysInOrder = [ 0,0,0,0,0,0,  0,0,0,0,0,0,  0,0,0,0,0,0,  0,0,0,0,0,0 ];

        // For reference, these are the number of days in each of the orders (see PhD thesis of Carl Calloway)
        // Stores these as big integers

        daysInOrder[0] = 1n;
        daysInOrder[1] = 20n;
        daysInOrder[2] = 360n;
        daysInOrder[3] = 7200n;
        daysInOrder[4] = 144000n;
        daysInOrder[5] = 2880000n;
        
        daysInOrder[6] = 57600000n;
        daysInOrder[7] = 1152000000n;
        daysInOrder[8] = 23040000000n;
        daysInOrder[9] = 460800000000n;
        daysInOrder[10] = 9216000000000n;
        daysInOrder[11] = 184320000000000n;

        daysInOrder[12] = 3686400000000000n;
        daysInOrder[13] = 73728000000000000n;
        daysInOrder[14] = 1474560000000000000n;
        daysInOrder[15] = 29491200000000000000n;
        daysInOrder[16] = 589824000000000000000n;
        daysInOrder[17] = 11796480000000000000000n;

        daysInOrder[18] = 235929600000000000000000n;
        daysInOrder[19] = 4718592000000000000000000n;
        daysInOrder[20] = 94371840000000000000000000n;
        daysInOrder[21] = 1887436800000000000000000000n;
        daysInOrder[22] = 37748736000000000000000000000n;
        daysInOrder[23] = 754974720000000000000000000000n;
        
        // Create a temp variable that starts with the offset we would use for a negative LCD
        // This corresponds to 10.0.0.0.0 . 0.0.0.0.0.0 . 0.0.0.0.0.0 . 0.0.0.0.0.0
        // This is the number of days backward from Era Day to reach that long count
        let offset = 7549747199999999999999998992000n;

        // Now use the multipliers and amounts to build the large LCD
        for (let i = 0; i <= 22; i++) { 
            newLCD = newLCD + coefficients[i] * daysInOrder[i];
        }

        // Now we handle the 24th order anchor date and that the 24th value is 10-19 before Era day and 0-9 after
        if ( orderCount === 24) {
            if ( coefficients[23] <= 9) {
                newLCD = newLCD + coefficients[23] * daysInOrder[23];
            } else {
                newLCD = newLCD + (coefficients[23] - 10n) * daysInOrder[23] - offset;
            }

        } else {

            // Do nothing, since we have only 23 orders

        }

    } else {

        // Do nothing since we received bad input
        newLCD = -1n;

    }

    // Return the newLCD variable, whether it was reset or not
    return String(newLCD);

}


// Same as lcdToCRInfo(), but can handle Big Int values for the input
export function bigLCDToCRInfo(lcd) {
    
    // Ensure that we treat the LCD with the right type
    let givenLCD = BigInt(lcd);

    // Perform the usual calcs for the positive LCD process
    // Start with the Tzolkin values
    let tzolkinName = (givenLCD + 19n) % 20n;
    let tzolkinCoefficient = (givenLCD + 4n - 1n) % 13n;

    // Now do the Haab values, remembering that the result of the % function will take the sign of the input
    let temp = ( givenLCD + 348n ) % 365n;
    if (temp < 0){ temp = temp + 365n; }
    let haabName = temp / 20n;
    let haabCoefficient = temp % 20n;

    // Now handle when the coefficients are negative so they won't result in negative indices for the array lookups
    // The coefficients themselves will never be BigInt values, but they must be treated as such in order to work
    if (givenLCD < 0n){

        // Handle the tzolkin number if negative which, if uncorrected, runs 0 backward to -12
        if (tzolkinCoefficient < 0n){ tzolkinCoefficient = tzolkinCoefficient + 13n; } 

        // Handle the tzolkin name which, if uncorrected, runs 0 backward to -19
        if (tzolkinName < 0n){ tzolkinName = tzolkinName + 20n; }

    }

    // Gather together the results to return them
    let cr = {
        tzolkinName: tzolkinName,
        tzolkinCoefficient: tzolkinCoefficient,
        haabName: haabName,
        haabCoefficient: haabCoefficient,
    };
    return cr;
}


