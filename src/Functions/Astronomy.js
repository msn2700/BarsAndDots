// ----- LUNAR DATA AND FUNCTIONS -----

// First, we need a value for the average synodic period of the moon
// This is known, in 2021, to be 29 days, 12 hours, 44 min and about 3 sec (some sources use 2.9sec)
// For example, see https://en.wikipedia.org/wiki/Lunar_month
// Also an excellent reference: https://eclipse.gsfc.nasa.gov/SEhelp/moonorbit.html
// Converting these portions into days and keeping all decimals, we have this
// The value should be 29.53059028 for reference
var lunarPeriod = 29 + (12/24) + (44/60/24) + (3/60/60/24);

// Let's find the age of the moon on JDN = 0 assuming average synodic periods
// 2451934.04652778 = the JDN of the new moon day Jan 24th, 2001 13:07:00 UTC
// We use this as a reference for a new moon with hour/min accuracy
// initialAge should have a value near 20.3950109, just for reference
var ref = 2451934.04652778;
var initialAge = (( ( 0 - ref ) / lunarPeriod) - Math.floor( ( 0 - ref ) / lunarPeriod)) * lunarPeriod;

// Function to get the number of days into a lunar cycle
// Correlation here refers, for example, to 584,283 days (Modified GMT-2), an integer
// LCD refers to the Mayan day number (collapsed long count value), an integer
// Output is an unrounded decimal between 0 and the moon's average synodic period
export function getMoonAge(lcd, correlation) {
    
    // LCD + Correlation = the number of days that have passed since JDN = 0
    // If we add our initial moon age, we get a numerator (number of days since a lunar cycle beginning)
    let b = lcd + correlation + initialAge; 

    // Get the number of whole cycles that have passed so far, e.g. Floor(720.67) = 720
    let a = Math.floor(b / lunarPeriod);

    // Find the difference between the floored value and actual value
    // e.g. 720.67 - 720 = 0.67
    // Now find find the number of days that means in the current cycle
    // 0.67 * 29.530589 = 19.78549463
    return ((b / lunarPeriod) - a) * lunarPeriod;
}


// Function to get the number of days in the lunar month, 29 or 30
// This will be used to select the form of Glyph A that we'll use
// INPUT:  A decimal representing moon age, e.g. 28.765123, between 0 and 30
// OUTPUT: Either 0 (indicating 29) or 1 (indicating 30)
export function getMonthSize(moonAge) {

    // Set the default result, indicating a problem if all else fails
    let returnVal = -1;

    // Find the fraction of the lunar month after 29 days
    let monthFrac = lunarPeriod - Math.floor(lunarPeriod);

    // Let's find the fractional day for the moon age input
    let moonFrac = moonAge - Math.floor(moonAge);

    // Now compare the lunar period fraction with the moon age fraction
    // If our moon age fraction is larger, then we run over into another month (use 29 days for this month)
    // If our moon age fraction is smaller, then we stay in the current month (use 30 days for this month)
    if (moonFrac >= monthFrac) {
        returnVal = 0;
    } else {
        returnVal = 1;
    }

    // Return the number of days in the current lunar month, 29 or 30
    return returnVal;
}


// ----- LUNAR SERIES GLYPH INFO -----


// Lunar Series info is covered extensively by John Edgar Teeple, Maya Astronomy (1930), free PDF
// See also Texas Notes 29 (Schele, Grube, et al), 1992
// S. G. Morley identified important lunar glyphs and named them A, B, C, D, E, X, Y
// ---------
// See Teeple, PDF p23, doc p48
// Glyph D = Number of days since new moon when the days are less than 20
// Glyph E = Number of days greater than 20 since the last new moon
//    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
// D  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19                              , 0
// E                                                   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
// If D = 8, the moon is 8 days old
// If E = 3, the moon is 23 days old
// ---------
// Glyph C = The number of the lunation in a set of 5 or 6
// We'll use the Period of Uniformity rules for glyph C: a value of 1-6 (or 0-5)
// For reference, we list these calibration dates from Teeple (PDF p29, doc p54)
// 9.13.0.0.0  --> 5 moons, 22 days
// 9.13.5.0.0  --> 6 moons, 20 days
// 9.13.10.0.0 --> 1 moons, 19 days
// 9.13.15.0.0 --> 2 moons, 17 days
// 9.14.0.0.0  --> 3 moons, 16 days
// ---------
// Glyph Y = cycle of 1-7, starting with a value of 3 on 0.0.0.0.0

// Note that in the functions below, we aim to produce the same results as BDPro
// BDPro, in turn, tried to produce results consistent with monuments from the Period of Uniformity
// As a result, these functions may not be based on sound assumptions 
// INPUT: LCD integer, moonAge decimal from 0-29.x, correlation like 583283
// OUTPUT: Coefficients for the lunar glyphs, integers
export function getLunarInfo(lcd, moonAge, correlation) {
    
    
    // THE Y GLYPH
    // First, get the value for glyph Y
    let numY = (lcd + 3) % 7;
    numY = numY === 0 ? 7 : numY;

    // THE D AND E GLYPHS
    // Next, get the value for glyphs D and E
    // Round the decimal moon age downward for complete days
    let daysPast = Math.floor(moonAge);
    
    // Declare our coefficients with a token value
    let numE = -1;
    let numD = -1;

    // Divide our cases into >0 and =0
    if (daysPast > 0){
        
        // Now divide our cases into 20-29 and 1-19
        if (daysPast >= 20){
            numE = (daysPast - 20);
            numD = 0;
        } else {
            // Don't show anything for E, show coefficient + D
            numE = 0;
            numD = (daysPast);
        }
    } else {
        
        // If a new moon occurs on this date, no coefficients
        numE = 0;
        numD = 0;
    }

    // THE C GLYPH
    // Find the whole number of (decimal) lunar cycles since the zero date
    // Note we are using a hard-coded correlation value of 584285 for JDN adjustment
    // Note also that we are using 20.43 as the moon age at JDN=0, which differs from 20.33 above
    // These were chosen to keep in lock-step with BDPro rather than with physical constants
    let wholeCycles = Math.floor((lcd + correlation + initialAge) / lunarPeriod);

    // Now adjust the cycles forward and find the remainder when dividing by 6
    // We set a target value of 2 on 9.17.0.0.0 during the Period of Uniformity
    let sixGroup = (wholeCycles) % 6; 

    return {
        E: numE,
        D: numD,
        C: sixGroup,
        Y: numY,
    }

}


// ----- PLANETARY DATA AND FUNCTIONS -----


// Function to provide planetary information: days after previous start / before next start
// INPUT: LCD integer
// OUTPUT: Planetary cycle values as decimals (+/-)
export function lcdTo3Planets(lcd) {
    
    // Let's start with Venus, which has a synodic period of 583.91895 earth-days (unsourced)
    // Venus, Wikipedia, has 583.92 (older NASA source confirms, so does K. R. Lang)
    // Day adjustment of 1478236 (unsourced); this is Nov 19, 934 AD Greg (using 584283 correlation, JDN=2062519)
    // This translates to 10.5.6.3.16 in long count form
    // Possible explanation: Aveni, Skywatchers, p191, relates to the Venus table in Dresden Codex
    // and when that table was meant to be implemented; they list 10.5.6.4.0 and Nov 20 934 AD Greg
    let vPeriod = 583.92;
    let nv = (lcd - 1478236) / vPeriod;
    let venusDC = (nv - Math.round(nv)) * vPeriod;
    if ( venusDC > ( vPeriod / 2) ) {
        venusDC -= vPeriod;
    }

    // Next we have Jupiter, with synodic period of 398.88866 earth-days (unsourced)
    // Jupiter, Wikipedia has 398.88 (older NASA source confirms, so does K. R. Lang)
    // Day adjustment of 1385733 (unsourced); this is Aug 14, 681 AD Greg (using 584283 correlation, JDN=1970016)
    // This translates to 9.12.9.4.13 in long count form
    // There was an earth-jupiter alignment within 0.001764deg on JDN = 2457456.08333333
    // 2457456.08333333 - 1970016 = 487440.0833 days = 1222.02187 sets of 398.88 earth-days
    // Thus, LCD = 1385733 was probably an earth-jupiter alignment date in which Jupiter might
    // have been visible in the tropical latitudes, but this is speculation
    // We're going to use JDN=2062552, which is Dec 22, 934AD which corresponds with Jupiter being
    // due south at local midnight in Tikal (courtesy of https://stellarium-web.org/)
    // This is chronologically close to the Venus date above, corresponds to LCD=1478269 (584283 correlation)
    let jPeriod = 398.88;
    let nj = (lcd - 1478269) / jPeriod;
    let jupiterDC = (nj - Math.round(nj)) * jPeriod;
    if ( jupiterDC > ( jPeriod / 2) ) {
        jupiterDC -= jPeriod;
    }
    
    // Finally we have Saturn, with synodic period of 378.09107 earth-days (unsourced)
    // Saturn, Wikipedia has 378.09 (older NASA source confirms, so does K. R. Lang)
    // Day adjustment of 1486844 (unsourced); this is Jun 14, 958 AD Greg (using 584283 correlation, JDN=2071127)
    // This translates to 10.6.10.2.4 in long count form
    // There was an earth-Saturn alignment within 0.003814555deg on JDN = 2458176.75
    // 2458176.75 - 2071127 = 387049.75 days = 1023.6974 sets of 378.09 earth-days
    // Thus, LCD = 1486844 was probably not an earth-saturn alignment date in which Saturn might
    // have been visible in the tropical latitudes, but this is speculation
    // We're going to use JDN=2062403, which is July 26, 934AD which corresponds with Saturn being
    // due south at local midnight in Tikal (courtesy of https://stellarium-web.org/)
    // This is chronologically close to the Venus date above, corresponds to LCD=1478120 (584283 correlation)
    let sPeriod = 378.09;
    let ns = (lcd - 1478120) / sPeriod;
    let saturnDC = (ns - Math.round(ns)) * sPeriod;
    if (saturnDC > ( sPeriod / 2 ) ) {
        saturnDC -= sPeriod;
    }
    
    // Return these values as an accessible collection of properties
    return {
        venus: venusDC,
        jupiter: jupiterDC,
        saturn: saturnDC,
    }
}