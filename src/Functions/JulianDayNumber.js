import { monthNames } from '../Data/MonthData.js';
import { lcdToCRInfo } from '../Functions/CalendarRound.js';

// Construct the 'Month Day, Year CE/BCE Julian/Gregorian' date string for display purposes, can be Julian or Gregorian date
// Handle the case in which year is before 4800BCE, outside the limit of the conversion functions
export function getJDNDateString(dateArray, type, showType) {
    if (dateArray[0] > -4800 && dateArray[0] < 4801){
        return monthNames[dateArray[1]] + ' ' + dateArray[2] + ', ' + Math.abs( dateArray[0]) + ' ' +
            (dateArray[0] >= 0 ? 'CE' : 'BCE') + ' ' + (showType ? (type === 'j' ? 'Julian' : 'Gregorian') : '');
    } else {
        return  (showType ? (type === 'j' ? 'Julian: ' : 'Gregorian: ') : '') + 'Outside Limit'; 
    }
}

// Formula to get Long Count Date from a Julian Day Number by subtracting the correlation 
export function getLCDFromJDN(jdn, coefficient) {
    return Number(jdn) - Number(coefficient);
}

// Opposite of above: get Julian Day Number from Long Count Date by adding the correlation
export function getJDNFromLCD(lcd, coefficient) {
    return Number(lcd) + Number(coefficient);
}

// This finds the nearest 1 Pop date from the one given
export function findNearestPop(lcd) {
    for (let i = lcd, j = lcd; true; i--, j++) {
        if (lcdToCRInfo(i).haabName === 0 && lcdToCRInfo(i).haabCoefficient === 1) {
            return i;
        }
        if (lcdToCRInfo(j).haabName === 0 && lcdToCRInfo(j).haabCoefficient === 1) {
            return j;
        }
    }
}

// Create a function to convert Western calendar dates to JDNs
export function changeToJDN(day, month, year, type='g') {
    let jdn = 0;
    
    // Use the Number() function in case our user buttons pass text rather than numerical
    if (type === 'g'){

        // First we handle Gregorian dates
        jdn = gregorian_to_jd(Number(year), Number(month), Number(day))

    } else {

        // Now let's handle Julian dates
        jdn = julian_to_jd(Number(year), Number(month), Number(day))

    }
    // The JDNs from the function always result in *.5 values
    // Need to round up to get whole numbers we can use elsewhere
    return Math.ceil(jdn);
}

// Create a function to convert a JDN to a day/month/year (Western) date format
export function jdnToDate(jdn, type) {
    
    // Set a default array with values we will recognize as errors
    // New values will be assigned via the process one element at a time to be safe
    //let calSet = new Array(-1, -1, -1);
    let calSet = [-1, -1, -1];

    // Now handle different calendar types
    if (type === 'g'){

        // First we handle Gregorian dates
        calSet[0] = jd_to_gregorian(jdn)[0];
        calSet[1] = jd_to_gregorian(jdn)[1] - 1; // Used later as an index, decrement by 1
        calSet[2] = jd_to_gregorian(jdn)[2];

    } else {

        // Now let's handle Julian dates
        calSet[0] = jd_to_julian(jdn)[0];
        calSet[1] = jd_to_julian(jdn)[1] - 1; // Used later as an index, decrement by 1
        calSet[2] = jd_to_julian(jdn)[2];

    }

    //return new Array(calSet[0],calSet[1],calSet[2]); // Order is year, month, day
    return [calSet[0],calSet[1],calSet[2]];
}



// ----- GREGORIAN SECTION -----

export function jd_to_gregorian(jd) {

    // Convert JDN to Gregorian Y/M/D values, valid for dates after 4800BC
    // https://calendars.wikia.org/wiki/Julian_day
    // https://www.tondering.dk/claus/cal/julperiod.php#formula
    
    // Let J be the Julian day number from which we want to compute the date components.
    // From J, compute a relative Julian day number j from a Gregorian epoch starting on March 1, -4800 (i.e. March 1, 4801 BC in the proleptic Gregorian Calendar), the beginning of the Gregorian quadricentennial 32,044 days before the epoch of the Julian Period.
    // From j, compute the number g of Gregorian quadricentennial cycles elapsed (there are exactly 146,097 days per cycle) since the epoch; subtract the days for this number of cycles, it leaves dg days since the beginning of the current cycle.
    // From dg, compute the number c (from 0 to 4) of Gregorian centennial cycles (there are exactly 36,524 days per Gregorian centennial cycle) elapsed since the beginning of the current Gregorian quadricentennial cycle, number reduced to a maximum of 3 (this reduction occurs for the last day of a leap centennial year where c would be 4 if it were not reduced); subtract the number of days for this number of Gregorian centennial cycles, it leaves dc days since the beginning of a Gregorian century.
    // From dc, compute the number b (from 0 to 24) of Julian quadrennial cycles (there are exactly 1,461 days in 4 years, except for the last cycle which may be incomplete by 1 day) since the beginning of the Gregorian century; subtract the number of days for this number of Julian cycles, it leaves db days in the Gregorian century.
    // From db, compute the number a (from 0 to 4) of Roman annual cycles (there are exactly 365 days per Roman annual cycle) since the beginning of the Julian quadrennial cycle, number reduced to a maximum of 3 (this reduction occurs for the leap day, if any, where a would be 4 if it were not reduced); subtract the number of days for this number of annual cycles, it leaves da days in the Julian year (that begins on March 1).
    // Convert the four components g, c, b, a into the number y of years since the epoch, by summing their values weighted by the number of years that each component represents (respectively 400 years, 100 years, 4 years, and 1 year).
    // With da, compute the number m (from 0 to 11) of months since March (there are exactly 153 days per 5-month cycle; however, these 5-month cycles are offset by 2 months within the year, i.e. the cycles start in May, and so the year starts with an initial fixed number of days on March 1, the month can be computed from this cycle by a Euclidian division by 5); subtract the number of days for this number of months (using the formula above), it leaves d days past since the beginning of the month.
    // The Gregorian date (Y, M, D) can then be deduced by simple shifts from (y, m, d).
    // The calculations below (which use integer division [div] and modulo [mod] with positive numbers only) are valid for the whole range of dates since -4800. For dates before 1582, the resulting date components are valid only in the Gregorian proleptic calendar. This is based on the Gregorian calendar but extended to cover dates before its introduction, including the pre-Christian era. For dates in that era (before year AD 1), astronomical year numbering is used. This includes a year zero, which immediately precedes AD 1. Astronomical year zero is 1 BC in the proleptic Gregorian calendar and, in general, proleptic Gregorian year (n BC) = astronomical year (Y = 1 - n). For astronomical year Y (Y < 1), the proleptic Gregorian year is (1 - Y) BC.
    
    // Definition of the tropical year length for Gregorian (only 4 decimals)
    let TY = 365.2425;                  
    let TYwhole = Math.floor(TY);           // or we want 365
    
    // Define some multiples of the tropical year for use later
    let TYBy4 = Math.round(TY * 4);         // or we want 1,461
    let TYBy100 = Math.round(TY * 100);     // or we want 36,524
    let TYBy400 = Math.round(TY * 400);     // or we want 146,097

    // This first step shifts the epoch back to astronomical year -4800 instead of the start 
    // of the Christian era in year AD 1 of the proleptic Gregorian calendar
    // So (32044 days) / (365.2425 days/yr) = 87.7 years, so we're shifting from about -4712 (JDN=0) to -4800
    let lowJ = jd + 32044; 
    
    // Define some variables that we'll need relating to whole divisions and remainders
    let g =  Math.floor(lowJ / TYBy400);
    let dg = lowJ % TYBy400;
    let c =  Math.floor(dg / TYBy100);
    let dc = dg - c * TYBy100;
    let b =  Math.floor(dc / TYBy4);
    let db = dc % TYBy4;
    let a =  Math.floor(db / TYwhole);
    let da = db - a * TYwhole;
    
    // Define intermediate variables for month, day and year
    let lowY = g * 400 + c * 100 + b * 4 + a;                 // this is the integer number of full years elapsed since March 1, 4801 BC at 00:00 UTC
    let lowM = Math.floor((da * 5 + 308) / 153) - 2;          // this is the number of days elapsed since day 1 of the month at 00:00 UTC, including fractions of one day
    let lowD = da - Math.floor(((lowM + 4) * 153) / 5) + 122; // this is the number of days elapsed since day 1 of the month at 00:00 UTC, including fractions of one day
    
    // Create the values we will actually return as an array
    let capY = lowY - 4800 + Math.floor((lowM + 2) / 12);
    let capM = (lowM + 2) % 12 + 1;
    let capD = lowD + 1;
    
    // Convert back from astronomical years to Gregorian years
    if (capY <= 0) { capY = capY - 1; }
    
    // Return an array of three elements: year, month, day
    //return new Array( capY, capM, capD)
    return [ capY, capM, capD ]

}

export function gregorian_to_jd(year, month, day) {
    
    // Convert Gregorian to JDN, valid for dates after Mar 1, 4801 BCE at noon UTC
    // https://calendars.wikia.org/wiki/Julian_day
    // https://www.tondering.dk/claus/cal/julperiod.php#formula
    
    // The months (M) January to December are 1 to 12. For the year (Y) astronomical
    // year numbering is used, thus 1 BC is 0, 2 BC is -1, and 4713 BC is -4712. D is
    // the day of the month. JDN is the Julian Day Number, which pertains to the noon
    // occurring in the corresponding calendar date.

    // Correct using the astronomical year system
    if (year <= 0){ year = year + 1; }
    
    // Setup some values to be used; note that 4800 years are added back
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    
    // Perform the calculation
    let JDN = day + Math.floor((153 * m + 2) / 5) + Math.floor(365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    // Return the value we found
    return JDN;
}




// ----- JULIAN SECTION -----

// JULIAN_TO_JD  --  Determine Julian day number from Julian calendar date
// Valid for dates after (approximately) 4716 BCE
// Note that assumption that mean tropical year = 365.25
export function julian_to_jd(year, month, day){

    // Define the tropical year length in days
    let TY = 365.25;

    // Adjust negative common era years to the zero-based notation we use.
    if (year < 1) { year++; }

    // Algorithm as given in Meeus, Astronomical Algorithms, Chapter 7, page 61 
    if (month <= 2) { 
        year--;  
        month += 12;
    }

    // Perform the calculation and return the result
    return ((Math.floor((TY * (year + 4716))) + Math.floor((30.6001 * (month + 1))) + day) - 1524.5);
}


// JD_TO_JULIAN  --  Calculate Julian calendar date from Julian day
export function jd_to_julian(td) {

    // Define the tropical year length in days
    let TY = 365.25;

    td += 0.5;
    let z = Math.floor(td);
    let a = z;
    let b = a + 1524;
    let c = Math.floor((b - 122.1) / TY);
    let d = Math.floor(TY * c);
    let e = Math.floor((b - d) / 30.6001);

    // Define the values we will return as an array
    let month = Math.floor((e < 14) ? (e - 1) : (e - 13));
    let year = Math.floor((month > 2) ? (c - 4716) : (c - 4715));
    let day = b - d - Math.floor(30.6001 * e);

    /*  If year is less than 1, subtract one to convert from
        a zero based date system to the common era system in
        which the year -1 (1 BCE) is followed by year 1 (1 CE).  */

    if (year < 1) {
        year--;
    }

    //return new Array(year, month, day);
    return [ year, month, day ];
}

