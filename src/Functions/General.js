// Import all the data arrays that will be used as dropdown selections
import { BAKTUN_VALUES_SID, PIKTUN_VALUES_SID, KATUNS_DROP_SID, TUNS_DROP_SID, WINALS_DROP_SID, KINS_DROP_SID } from '../Data/CalendarRoundData';

// Import the functions that we'll need
import { getGodNum, lcdToCRInfo, getHaabCoeffList_SID } from '../Functions/CalendarRound';

// Function to get long count component values from an LCD value, effectively parses using remainders
// INPUT: An LCD value from -27,792,000 to +28,799,999
// OUTPUT: An object with six numerical values as properties, all must be less than 20
export function getLCValues(lcd) {
    
    // First handle the positive timeline, on and after Era Day
    // This begins on 00.00.00.00.00.00 and goes to 09.19.19.19.17.19
    if (lcd >= 0)  {

        let remaining = lcd;
        let piktuns = Math.floor(remaining / 2880000); remaining -= piktuns * 2880000;
        let baktuns = Math.floor(remaining / 144000);  remaining -= baktuns * 144000;
        let katuns = Math.floor(remaining / 7200);     remaining -= katuns * 7200;
        let tuns = Math.floor(remaining / 360);        remaining -= tuns * 360;
        let winals = Math.floor(remaining / 20);       remaining -= winals * 20;
        let kins = remaining;

        return {
            piktuns: piktuns,
            baktuns: baktuns,
            katuns: katuns,
            tuns: tuns,
            winals: winals,
            kins: kins,
        };
    } 
    
    // Now handle the negative timeline, before Era Day
    // This begins at 10.00.00.00.00.00 and runs to 19.12.19.19.17.19
    else {

        let remaining = lcd + 27792000;
        let piktuns = Math.floor(remaining / 2880000); remaining -= piktuns * 2880000;
        let baktuns = Math.floor(remaining / 144000);  remaining -= baktuns * 144000;
        let katuns = Math.floor(remaining / 7200);     remaining -= katuns * 7200;
        let tuns = Math.floor(remaining / 360);        remaining -= tuns * 360;
        let winals = Math.floor(remaining / 20);       remaining -= winals * 20;
        let kins = remaining;

        return {
            piktuns: 10 + piktuns, // Adjust the value forward by 10
            baktuns: baktuns,
            katuns: katuns,
            tuns: tuns,
            winals: winals,
            kins: kins,
        };
    }
}

// Given the six components of the long count date, output a single Mayan day number
export function getLCDFromLC(piktuns, baktuns, katuns, tuns, winals, kins) {

    // For dates after the Era Day, or piktun 0-9, we use the positive timeline
    // For dates before the Era Day, or piktuns 10-19, we use the negative timeline
    if (piktuns <= 9){
        return piktuns * 2880000 + baktuns * 144000 + katuns * 7200 + tuns * 360 + winals * 20 + kins * 1;
    } else {
        return (piktuns-10) * 2880000 + baktuns * 144000 + katuns * 7200 + tuns * 360 + winals * 20 + kins * 1 - 27792000;
    }
}

// This is used on the Serpent Number page
// Given the six components of a long count date, output a single Serpent LCD value
export function getSimpleLCDFromLC(piktuns, baktuns, katuns, tuns, winals, kins) {
    return piktuns * 2880000 + baktuns * 144000 + katuns * 7200 + tuns * 360 + winals * 20 + kins * 1;
}


// Given the six components of the long count date, build a string for display purposes like X.X.X.X.X.X
export function getLCString(piktuns, baktuns, katuns, tuns, winals, kins) {
    return piktuns + '.' + baktuns + '.' + katuns + '.' + tuns + '.' + winals + '.' + kins;
}

// New function to parse a long count string back into cycles of piktuns, baktuns, katuns, etc. 
// INPUT: A string representing a long count like X.X.X.X.X.X
// OUTPUT: An object with six properties, each is a integer
export function parseLCString(lcString){
    let parsed = lcString.split(".");
    return {
        piktuns: parsed[0],
        baktuns: parsed[1],
        katuns:  parsed[2],
        tuns:    parsed[3],
        winals:  parsed[4],
        kins:    parsed[5],
    }
}

// New function to get the LCD given the long count object (with six, named properties) as an input
export function buildLCDFromLC(lc){

    // For dates after the Era Day, or piktun 0-9, we use the positive timeline
    // For dates before the Era Day, or piktuns 10-19, we use the negative timeline
    if (lc.piktuns <= 9) {
        return lc.piktuns * 2880000 + lc.baktuns * 144000 + lc.katuns * 7200 + lc.tuns * 360 + lc.winals * 20 + lc.kins * 1;
    } else {
        return (lc.piktuns-10) * 2880000 + lc.baktuns * 144000 + lc.katuns * 7200 + lc.tuns * 360 + lc.winals * 20 + lc.kins * 1 - 27792000;
    }
}

// New function to build the string given the long count object (with six, named properties) as an input
export function buildLCString(lc) {
    return lc.piktuns + '.' + lc.baktuns + '.' + lc.katuns + '.' + lc.tuns + '.' + lc.winals + '.' + lc.kins;
}


// Function to create a list of LCDs that match the criteria given in the Solve Incomplete Dates page inputs
// This is the algorithm that it uses to find matches and make them available to scroll through
// It uses a brute force approach to cycling through possible long count values
export function updateSet(piktunVal, baktunVal, katunVal, tunVal, winalVal, kinVal, tCoeff, tName, hCoeff, hName, lordVal){

    // Initialize the set we wish to populate with LCDs to return
    let set = [];

    // Set the default max/min range limits, to be used if no input is provided by the user
    let piktunHigh = 19; let baktunHigh = 19; let katunHigh = 19; let tunHigh = 19; let winalHigh = 17; let kinHigh = 19;
    let piktunLow = 0;   let baktunLow = 0;   let katunLow = 0;   let tunLow = 0;   let winalLow = 0;   let kinLow = 0;

    // Set a flag that will determine if the user entered anything at all
    // We will be using this to prevent unnecessary calculations / producing a set with millions of rows
    let userEntry = false;

    // If the user entered a value for these, update the max/min range limits
    // Update the entry flag as well to reflect it
    if (piktunVal > 0){
        piktunHigh = PIKTUN_VALUES_SID[piktunVal];
        piktunLow = PIKTUN_VALUES_SID[piktunVal];
        userEntry = true;
    }
    if (baktunVal > 0){
        baktunHigh = BAKTUN_VALUES_SID[baktunVal];
        baktunLow = BAKTUN_VALUES_SID[baktunVal];
        userEntry = true;
    }
    if (katunVal > 0){
        katunHigh = KATUNS_DROP_SID[katunVal];
        katunLow = KATUNS_DROP_SID[katunVal];
        userEntry = true;
    }
    if (tunVal > 0){
        tunHigh = TUNS_DROP_SID[tunVal];
        tunLow = TUNS_DROP_SID[tunVal];
        userEntry = true;
    }
    if (winalVal > 0){
        winalHigh = WINALS_DROP_SID[winalVal];
        winalLow = WINALS_DROP_SID[winalVal];
        userEntry = true;
    }
    if (kinVal > 0){
        kinHigh = KINS_DROP_SID[kinVal];
        kinLow = KINS_DROP_SID[kinVal];
        userEntry = true;
    }

    // Check if the user tried any of the other dropdown inputs
    if (tCoeff > 0 || tName > 0 || hCoeff > 0 || hName > 0 || lordVal > 0){ userEntry = true; }

    // If the user entered anything, this will cycle through all the long count ranges to find matches
    // If not, it will return the initial empty set
    if (userEntry){
        for (let h = piktunLow; h <= piktunHigh; h += 1) {
            for (let i = baktunLow; i <= baktunHigh; i += 1){
                for (let j = katunLow; j <= katunHigh; j += 1){
                    for (let k = tunLow; k <= tunHigh; k += 1){
                        for (let m = winalLow; m <= winalHigh; m += 1){
                            for (let n = kinLow; n <= kinHigh; n += 1){

                                // Create a flag with include as default
                                let include = true;

                                // Get the LCD from the current long count pieces
                                let LCD = getLCDFromLC( h, i, j, k, m, n );
                                
                                // If the Lords value given is not the calculated value, exclude
                                if (lordVal > 0){ if (lordVal !== getGodNum(m,n)){ include = false; } }

                                // Get the calculated CR information from the LCD
                                let CR = lcdToCRInfo(LCD);

                                // Check the calendar round data: given vs calculated
                                // If they do not match, we don't want that record: exclude it
                                if (tCoeff > 0) { if (tCoeff - 1 !== CR.tzolkinCoefficient) { include = false; } }
                                if (tName  > 0) { if (tName - 1  !== CR.tzolkinName)        { include = false; } }
                                if (hName  > 0) { if (hName - 1  !== CR.haabName)           { include = false; } }

                                // Need to handle Haab Coefficient separately since it is dependent on the others
                                // See the function getHaabCoeffList_SID() for details on the various scenarios
                                // tName = 0 and hName < 19, then list of [UNK,0,1,2,3,..,19],              index = 0-20
                                // tname = 0 and hName = 19, then list of [UNK,0,1,2,3,4],                  index = 0-5
                                // tName > 0 and hName < 19, then list of four options, e.g. [4,9,14,19],   index = 0-3
                                // tname > 0 and hName = 19, then list of one option, e.g. [4],             index = 0
                                
                                // Lookup the value for this index, which runs 0-3
                                let hCoeffValue = getHaabCoeffList_SID(tName, hName)[hCoeff];

                                // See if the Haab Coefficient has been selected...
                                if (hCoeffValue !== "UNK") { 
                                    
                                    // Either the user has selected a value or selection of a Tzolkin name has forced it
                                    // See if the Tzolkin name has NOT been selected
                                    if (tName === 0) { 

                                        // The list can be either [UNK,0,1,2,3,..,19] or [UNK,0,1,2,3,4]
                                        // Adjust the index to align the typical index
                                        if (hCoeff - 1 !== CR.haabCoefficient)    { include = false; }

                                    } else {

                                        // The list can be either [4,9,14,19] or [4], which are values not indices
                                        if (hCoeffValue !== CR.haabCoefficient)    { include = false; }

                                    }
                                    
                                } else {

                                    // This means a Haab coefficient was not selected, so no need to update INCLUDE flag
                                    // Do nothing here...

                                }


                                // If our include flag is still true, our LCD has passed our tests
                                // Include this LCD in the set
                                if ( include ){ set.push(LCD); }

                            }
                        }
                    }
                }
            }
        }
    }
    
    // Return the set we have calculated to the upper level component
    return set;
}

