import { 
    TZOLKIN_NAMES,
    HAAB_NAMES,
    POSSIBLE_HAAB_COEFFICIENTS, 
    TZOLKIN_COEFFICIENTS,
    HAAB_COEFF_SID,
    HAAB_COEFF_UAYEB,
} from '../Data/CalendarRoundData';


// Function to convert a Maya day number (collapsed long count date) and
// extracts the calendar round information, e.g. 0 -> 4 Ahau 8 Cumku
// All outputs are numerical indices, not actual month / day names
// Remember that 18,980 days = 73 Tzolkins = 52 Haabs (lowest common multiple)
//  INPUT: negative to positive infinity in whole numbers
// OUTPUT: Calendar round object with four properties (index numbers)
export function lcdToCRInfo(lcd) {
    let positiveLCD = lcd;
    
    // If the number is negative, keeping adding complete calendar rounds 
    // until it becomes positive again so all the subsequent math will work
    while (positiveLCD < 0) {
        positiveLCD += 18980;
    }
    
    // Start with the Tzolkin and get name and coefficient
    // The name portion is simple, find the reminder when dividing by 20
    // Since LCD = 0 --> Ahau is the 19th name in the set, need to adjust forward by 19 units
    // This will return a value 0 - 19
    let tzolkinName = (positiveLCD + 19) % 20;

    // The coefficient is slightly harder; get remainder when dividing by 13
    // Add 4 to it since the long count began with 4 in 4 Ahau
    // Subtract one from it to prepare it to be used as an index (starting with zero)
    // This will output 0 - 12 for the coefficient
    let tzolkinCoefficient = (positiveLCD + 4 - 1) % 13;
    
    // Now work on the Haab and get name and coefficient
    // Adjust using 348 since the long count began with 8 Cumku (most of the way through a year)
    // which is 12 days short of the 360 days in the long count year X.X.X.17.20
    // Then get the remainder when dividing by 365 (or whole Haabs)
    let temp = (positiveLCD + 348) % 365;

    // Get the number of complete sets of 20 day "months" by dividing and rounding down
    // Output is 0 - 18
    let haabName = Math.floor(temp / 20);

    // Now get the remainder to see how many days into the partial "month" we are
    // Output is 0 - 19
    let haabCoefficient = temp % 20;
    
    // Gather together the results to return them
    let cr = {
        tzolkinName: tzolkinName,
        tzolkinCoefficient: tzolkinCoefficient,
        haabName: haabName,
        haabCoefficient: haabCoefficient,
    };
    return cr;
}


// Function to create the complete calendar round string, e.g. 4 Ahau 8 Cumku
// This uses the output component set from the function above
//  INPUT: Calendar round object with four properties, selected naming system (Yucatecan / Modern)
// OUTPUT: Concatenated string like "1 Imix 10 Pop"
export function crString(cr, names) {
    return TZOLKIN_COEFFICIENTS[cr.tzolkinCoefficient] + ' ' 
            + TZOLKIN_NAMES[cr.tzolkinName][names] + ' ' 
            + cr.haabCoefficient + ' ' 
            + HAAB_NAMES[cr.haabName][names];
}


// Function to get the year bearer information and the corresponding colors/directions for the year
// We are trying to find the Tzolkin day name that occurs on the first day of the Haab year:
// Tikal and the Dresden Codex use 0 Pop; Campeche later used 1 Pop, there are others as well
// The Tikal system,    0 Pop, with names: Ik, Manik, Eb, Caban, Ik, Manik, Eb, Caban, etc.
// The Campeche system, 1 Pop, with names: Akbal, Lamat, Ben, Etznab, Akbal, Lamat, Ben, Etznab
// Here we use the Tikal system 
// Aveni, Skywatchers (2001), p350 #17 has a discussion on year bearers
// Also a good discussion on Wikipedia, https://en.wikipedia.org/wiki/Maya_calendar#Year_Bearer ...
// See also Ed Barnhart's site, http://www.mayan-calendar.com/ancient_birthdays.html#
// For calibration...
//   Year bearer was 7 Eb    on 0.0.0.0.0
//   Year bearer was 9 Caban on 13.0.8.7.1 and becomes 10 Ik    on 13.0.8.7.2
//   Year bearer was 10 Ik   on 13.0.9.7.6 and becomes 11 Manik on 13.0.9.7.7
//  INPUT: 1 <= tzolkPos <= 260, 1 <= haabPos <= 365
// OUTPUT: e.g. (index, index, index, index, index) for various arrays
export function yearCountData(tzolkPos, haabPos) {

    // Try another way to do this same process, this will be 1 out of 18980
    let newPos = getCRPos(tzolkPos, haabPos); 

    // When CR position = 1, Haab position = 349 so ordinarily we would add 348
    // However, we want a new year bearer when Haab Pos = 365, not 0
    newPos = newPos + 347;

    // If we go beyond the limit, wrap around past the beginning
    newPos = newPos > 18980 ? newPos - 18980 : newPos;

    // Get number of complete Haabs so far in this calendar round
    let completeHaab = Math.floor(newPos / 365);

    // Get Tzolkin coefficient we will use
    let tCoeff = ( (6 + completeHaab) % 13 ) + 1;

    // Get the Tzolkin name in a set of four; each one is assigned an index for lookups in arrays
    let tName = ( (2 + completeHaab) % 4 );

    // The general scheme is like this...
    // completeHaab  = 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17...
    // tCoeff        = 7,  8,  9, 10, 11, 12, 13,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11...
    // tName         = 1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2...

    // Handle specific values of the day name and their corresponding characteristics
    switch (tName) {

        case 0:
        return {
            number: tCoeff,
            name: 1,      // TZOLKIN_NAMES[1], Ik
            direction: 0, // North
            color: 0,     // White
            forecast: 0,  // FORECAST[0]
        };

        case 1:
        return {
            number: tCoeff,
            name: 6,      // TZOLKIN_NAMES[6], Manik
            direction: 1, // West
            color: 1,     // Black
            forecast: 1,  // FORECAST[1]
        };
        
        case 2:
        return {
            number: tCoeff,
            name: 11,     // TZOLKIN_NAMES[11], Eb
            direction: 2, // South
            color: 2,     // Yellow
            forecast: 2,  // FORECAST[2]
        };

        case 3:
        return {
            number: tCoeff,
            name: 16,     // TZOLKIN_NAMES[16], Caban
            direction: 3, // East
            color: 3,     // Red
            forecast: 3,  // FORECAST[3]
        };

        // If it is none of the above, we hit an error and need to rethink things
        default:
        return {
            number: tCoeff,  // e.g. 1,
            name: tName,      // e.g. TZOLKIN_NAMES[1].names,
            direction: "Error",
            color:     "Error",
            forecast:  "Error",
        };
    }
}


// Function to calculate the Lord of the Night given the lowest two long count components
// Aveni, Skywatchers (2001): "A shortcut to determining the ruling Lord of the Night consists
// of dividing the sum of the lowest two places of the long count by nine. The remainder is the 
// number of the ruling Lord."
// Possible issue here: should we use (20 * winals + kins) % 9? 
// It looks like (2 * winals + kins) % 9 works just as well
// Another source (http://www.famsi.org/research/pitts/MayaGlyphsBook2Sect2.pdf) ...
// "It turns out that every tun, katun, baktun since creation has terminated with G9, or the 9th Lord of the Night." 
//  INPUT: Winals (which can be 0-17) and Kins (which can be 0-19)
// OUTPUT: Integer 1-9
export function getGodNum(winals, kins) {
    let god = ((20 * winals) + kins) % 9;
    return god === 0 ? 9 : god;
}


// Function to get the current day number in the 260 Tzolk'in cycle
// Inputs are the number and name of the Tzolk'in, e.g. 4 Ahau, 8 Imix
// So position = 1 when we have 1 Imix (0,0); position = 260 with 13 Ahau (12,19)
//  INPUT: 0 <= tzolkCoeff <= 12, 0 <= tzolkNameIndex <= 19
// OUTPUT: 1 to 260
export function getTzolkPos(tzolkCoeff, tzolkNameIndex) {
    let pos = (40 * (tzolkCoeff + 1) - 39 * (tzolkNameIndex + 1)) % 260;
    return pos <= 0 ? pos + 260 : pos;
}


// Given a Haab day and month name like 8 Cumku, this function takes the numerical
// equivalent of the month name, so (8,18) in this case
// Since each "month" has 20 days, we multiply the month index by 20 and
// add the number of days provided. This gives us the number of days into 365 we are 
// Note that this doesn't prevent the Uayeb from having more than 5 days
//  INPUT: 0 <= haabDay <= 19, 0 <= haabMonthIndex <= 18
// OUTPUT: 1 to 365
export function getHaabPos(haabDay, haabMonthIndex) {
    let pos = (haabDay + haabMonthIndex * 20) % 365;
    return pos <= 0 ? pos + 365 : pos;
}


// Function to get the number of the Haab we are currently completing in the current calendar round
// This does NOT give the number that have been completed; it gives that number + 1
// Stated another way, the number of sets of 365 that have passed (in the cycle of 18,980) plus one
// We transition from 51 completed back to zero completed on the last day -> first day
//  INPUT: 1 <= tzolkPos <= 260, 1 <= haabPos <= 365
// OUTPUT: 0 to 51
export function getNumHaabs(tzolkPos, haabPos) {
    let numHaabs = (tzolkPos - haabPos) % 52;
    numHaabs = numHaabs <= 0 ? numHaabs + 52 : numHaabs;
    return numHaabs;
}


// Function to get the number of days into the present calendar round of 18,980 days
// Subtracting 7282 is an adjustment to ensure that tzolkPos=160, haabPos=348 -> Day 1 of 18980-day cycle
//  INPUT: 1 <= tzolkPos <= 260, 1 <= haabPos <= 365
// OUTPUT: 1 to 18980
export function getCRPos(tzolkPos, haabPos) {
    
    // First we get the number of Haabs that have been completed so far
    // If zero remainder, then we have completed 52 of them
    let x = (tzolkPos - haabPos - 1) % 52;
    x = x <= 0 ? x + 52 : x;

    // Next we take that and multiply by 365 to get the number of days
    // We also need to add in the number of days for the current Haab position
    // We also need to correct for our starting point of the 348th day in the Haab
    // If zero remainder, then we've completed 18,980 days
    let crPos = (365 * x + haabPos - 7282) % 18980;
    crPos = crPos <= 0 ? crPos + 18980 : crPos;
    return crPos;
}


// Function to get the list of valid Haab days with the given Tzolkin name
//  INPUT: Tzolkin name index, which can be 0-19
// OUTPUT: Array of four numbers that are allowed for this index
export function getValidHaabDays(tzolkinNameIndex) {
    return POSSIBLE_HAAB_COEFFICIENTS[tzolkinNameIndex].Coefficients;
}


// DEPRECATED
// Function to get all the long counts (X.X.X.X.X) from a given calendar round configuration
// The FOR loop generates 100 of these but can be set to whatever we'd like
//  INPUT: Calendar round object with four properties
// OUTPUT: Array with 100 elements, each element is a value for LCD
export function allLCInEra(cr) {
    
    // First let's get the number of whole Haabs that have passed
    // For 4 Ahau 8 Cumku, we would have x = 19 Haabs (this dates fall in the 19th Haab, about to be completed)
    let x = (getTzolkPos(cr.tzolkinCoefficient, cr.tzolkinName) - getHaabPos(cr.haabCoefficient, cr.haabName)) % 52;
    x = x <= 0 ? x + 52 : x;
    
    // Now we want to get the number of days that have passed in this calendar round (CR), or CR position
    // But remember that CR position = 1 corresponds with Haab position = 348
    // For 4 Ahau 8 Cumku, we should have crPos = 1 or the first day since...
    // 365 * 19 + 348 - 7282 = 7283 - 7282 = 1
    let crPos = (365 * x + getHaabPos(cr.haabCoefficient, cr.haabName) - 7283) % 18980;
    crPos = crPos <= 0 ? crPos + 18980 : crPos;

    // Let's create an array to hold the LCD of this date and the LCDs for the same CR position
    // in the next 100 calendar rounds
    let lc = [];
    for (let i = 0; i < 100; i++) {
        let lcd = crPos - 1 + i * 18980;
        lc.push(lcd);
    }
    return lc;
}


// Function to get a determinant when given an LCD date
// See Wikipedia "Tropical Year" for the currently accepted value: 365.2421896698...
// The determinant is the number of days to subtract from an LCD to give the last time that 
// the long count aligned with an integer multiple of the average tropical year
// In essence, it is used to find how many days ahead of a set of tropical years is the set of haabs
// It is then subtracted from long count date to find what LC it would be had we used tropical years instead
// Note that a drift of 0.2422 days/year * 4 years = 0.9688 days, or almost a whole day after 4 years
// In addition, 4 years * 365.2422 days/year = 1460.9688 days ~ 1461 days
// Input of LCD = 1096 -> Output of 1, 1096/365.2422 = 3.0007485... (LCD = 1095 -> Output of 0)
// Input of LCD = 2557 -> Output of 2, 2557/365.2422 = 7.0008339...
// Input of LCD = 4018 -> Output of 3, 4018/365.2422 = 11.000919...
// Input of LCD = 1096 + n * 1461 -> Output of (n+1), (1096 + n * 1461) / 365.2422 = 3 + n * 4 
//  INPUT: integer values, -infinity <= lcd <= +infinity
// OUTPUT: integer values, representing an offset of days 
export function getDeterminant(lcd) {
    
    // Define the tropical year (TY) to use, including whole days and fractional days
    // TY = 365 days + 5 hours + 48 minutes + 45 seconds
    let TY = 365 + (5/24) + (48/(24*60)) + (45/(24*60*60)); // This is like 365.2421875... days

    // Get the year as a whole number of days, i.e. 365 (shorter than a complete year)
    let whole = Math.floor(TY);

    // Get the fraction, i.e. 0.2421875
    let fraction = TY - whole;
    
    // Find the number of complete TYs elapsed so far
    let numTY = Math.floor( lcd / TY );

    // Find the number of leap days that should have been used
    let leapDaysUsed = Math.round( numTY * fraction );

    // Divide those by the number of whole days in a TY and get the remainder
    // The remainder are days that need to be subtracted from the LCD
    let determinant = leapDaysUsed % whole;

    // Return the resulting number of days
    return determinant;
    
}


// Function to find the first occurring LCD date having that CR configuration in a given baktun
// In any given baktun, there are 7.58... calendar rounds or sets of 18,980 days
//  INPUT: 1 <= crPos <= 18980, 0 <= baktunNum <= 13
// OUTPUT: e.g. LCD = 1,546,789
export function getFirstLCBaktun(crPos, baktunNum) {
    return (Number((baktunNum * 144000) / 18980) + 1) * 18980 + crPos - 1;
}


// Function to get the first 819-day station of a given calendar round configuration
// Inputs are the CR properties, output is an LCD
// For validation purposes, getFirst819fromCR(0,15,9,3) = LCD of 816
//  INPUT: Variables that correspond to the four Calendar Round properties (index numbers)
// OUTPUT: Station number, an integer from 1 to positive infinity
export function getFirst819fromCR(tzolkinCoefficient, tzolkinName, haabCoefficient, haabName) {

    // Set the output to zero initially so we'll know if we don't find a match
    let targetLCD = 0;

    // Run a script that searches for dates with matching CR properties
    for (let i = 0; i < 1460; i++) {
        
        // The first 819-day station is LCD=816, hence the adjustment
        let lcd = i * 819 + 816;
        
        // Get the CR info for the current date under test
        let testCR = lcdToCRInfo(lcd);
        
        // If all four CR properties match, it must be the first 819-day station with this CR configuration
        if (testCR.tzolkinCoefficient === tzolkinCoefficient && 
            testCR.tzolkinName === tzolkinName && 
            testCR.haabCoefficient === haabCoefficient &&
            testCR.haabName === haabName) {
            
            // Assign the LCD we found to the return variable and exit the loop since we're done
            targetLCD = lcd;
            break;
        }
    }

    // Return the value we found, or zero if we didn't fine one
    return targetLCD;
}

// Since there are four direction/color pairs, this uses the remainer when dividing the Tzolkin name
// by four as an index to the array for lookup purposes
//  INPUT: Tzolkin name index, 0-19 whole number
// OUTPUT: Index value of 0-3
export function getDirectionColorIndex(tzolkinName) {
    return ( (tzolkinName + 3) % 4);
}

// Build a unique function for 2 factor validation on Haab coefficient, for Solve Incomplete Dates (SID)
//  INPUT: integers representing tzolkin and haab names, 0-19 generally
// OUTPUT: array of integers representing allowed Haab coefficients
export function getHaabCoeffList_SID(tzolkinName, haabName){

    // If both names are set to UNK then use the typical U,0-19 list (no restriction)
    if (tzolkinName === 0 & haabName < 19){
        return HAAB_COEFF_SID;
    } 
    
    // Now handle if Tzolkin name is UNK but Haab name = Uayeb
    else if (tzolkinName === 0 & haabName === 19) {
        return ["UNK",0,1,2,3,4];
    }

    // If Haab name is not Uayeb and Tzolkin name is not UNK, use the set of four different options allowed
    else if (tzolkinName > 0 & haabName < 19) {
        return POSSIBLE_HAAB_COEFFICIENTS[tzolkinName - 1].Coefficients;
    }

    // Lastly, if Haab name = Uayeb and Tzolkin name is not UNK, only one of the four different options will work
    else if (tzolkinName > 0 & haabName === 19){
        return HAAB_COEFF_UAYEB[tzolkinName - 1].Coefficients;
    }

}

// Build a unique function for 2 factor validation on Haab coefficient, NOT for Solve Incomplete Dates (SID)
//  INPUT: integers representing tzolkin and haab names, 0-19 generally
// OUTPUT: array of integers representing allowed Haab coefficients
export function getHaabCoeffList(tzolkinName, haabName){

    // If Haab name is not Uayeb and Tzolkin name is not UNK, use the set of four different options allowed
    if (haabName < 18) {
        return POSSIBLE_HAAB_COEFFICIENTS[tzolkinName].Coefficients;
    }

    // Lastly, if Haab name = Uayeb and Tzolkin name is not UNK, only one of the four different options will work
    else {
        return HAAB_COEFF_UAYEB[tzolkinName].Coefficients;
    }

}
