
// ---- BASIC MATH AND SETS ----

// Create a basic set of 20 values, 0-19, for dropdown purposes
const TWENTYSET = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const FIVESET = [0, 1, 2, 3, 4];
const UNKNOWN = [ { kiche: "UNK",  yucatec: "UNK",   }, ];
const UNLUCKY = [ { kiche: "Che'", yucatec: "Wayeb", }, ];


// ---- TZOLKIN ----

// Day names as used in the Tzolkin cycle
const TZOLKIN_NAMES = [
 
    { kiche: "Imox",      yucatec: "Imix",       }, 
    { kiche: "Iq'",       yucatec: "Ik'",        },      // Year-bearer, with White North
    { kiche: "Aq'ab'al",  yucatec: "Ak'b'al",    }, 
    { kiche: "K'at",      yucatec: "K'an",       }, 
    { kiche: "Kan",       yucatec: "Chickchan",  }, 
    { kiche: "Kame",      yucatec: "Kimi",       }, 
    { kiche: "Kej",       yucatec: "Manik'",     },      // Year-bearer, with Black West
    { kiche: "Q'anil",    yucatec: "Lamat",      }, 
    { kiche: "Toj",       yucatec: "Muluk",      }, 
    { kiche: "Tz'i",      yucatec: "Ok",         }, 
    { kiche: "B'atz'",    yucatec: "Chuwen",     }, 
    { kiche: "E",         yucatec: "Eb'",        },      // Year-Bearer, with Yellow South
    { kiche: "Aj",        yucatec: "B'en",       }, 
    { kiche: "Ix",        yucatec: "Ix",         }, 
    { kiche: "Tz'ikin",   yucatec: "Men",        }, 
    { kiche: "Ajmaq",     yucatec: "Kib'",       }, 
    { kiche: "No'j",      yucatec: "Kab'an",     },      // Year-Bearer, with Red East
    { kiche: "Tijax",     yucatec: "Etz'nab'",   }, 
    { kiche: "Kawoq",     yucatec: "Kawak",      }, 
    { kiche: "Ajpu'",     yucatec: "Ahaw",       },

];

// Creating a copy of the above but with a blank entry for the Solve Incomplete Dates (SID)
const TZOLKIN_NAMES_SID = UNKNOWN.concat(TZOLKIN_NAMES);

// We need a set of lists depending on what the Haab coefficient is
// This is basically the reverse of restricting the Haab coefficient based on the Tzolkin name
const ALLOWED_TZOLKIN_NAMES_SID = [
 
    { NameList: [ ...TZOLKIN_NAMES_SID ], }, // UNK

    { NameList: [ TZOLKIN_NAMES_SID[2], TZOLKIN_NAMES_SID[7],  TZOLKIN_NAMES_SID[12], TZOLKIN_NAMES_SID[17] ], },  // 0
    { NameList: [ TZOLKIN_NAMES_SID[3], TZOLKIN_NAMES_SID[8],  TZOLKIN_NAMES_SID[13], TZOLKIN_NAMES_SID[18] ], },  // 1
    { NameList: [ TZOLKIN_NAMES_SID[4], TZOLKIN_NAMES_SID[9],  TZOLKIN_NAMES_SID[14], TZOLKIN_NAMES_SID[19] ], },  // 2
    { NameList: [ TZOLKIN_NAMES_SID[5], TZOLKIN_NAMES_SID[10], TZOLKIN_NAMES_SID[15], TZOLKIN_NAMES_SID[20] ], },  // 3
    { NameList: [ TZOLKIN_NAMES_SID[1], TZOLKIN_NAMES_SID[6],  TZOLKIN_NAMES_SID[11], TZOLKIN_NAMES_SID[16] ], },  // 4

    { NameList: [ TZOLKIN_NAMES_SID[2], TZOLKIN_NAMES_SID[7],  TZOLKIN_NAMES_SID[12], TZOLKIN_NAMES_SID[17] ], },  // 5
    { NameList: [ TZOLKIN_NAMES_SID[3], TZOLKIN_NAMES_SID[8],  TZOLKIN_NAMES_SID[13], TZOLKIN_NAMES_SID[18] ], },  // 6
    { NameList: [ TZOLKIN_NAMES_SID[4], TZOLKIN_NAMES_SID[9],  TZOLKIN_NAMES_SID[14], TZOLKIN_NAMES_SID[19] ], },  // 7
    { NameList: [ TZOLKIN_NAMES_SID[5], TZOLKIN_NAMES_SID[10], TZOLKIN_NAMES_SID[15], TZOLKIN_NAMES_SID[20] ], },  // 8
    { NameList: [ TZOLKIN_NAMES_SID[1], TZOLKIN_NAMES_SID[6],  TZOLKIN_NAMES_SID[11], TZOLKIN_NAMES_SID[16] ], },  // 9

    { NameList: [ TZOLKIN_NAMES_SID[2], TZOLKIN_NAMES_SID[7],  TZOLKIN_NAMES_SID[12], TZOLKIN_NAMES_SID[17] ], },  // 10
    { NameList: [ TZOLKIN_NAMES_SID[3], TZOLKIN_NAMES_SID[8],  TZOLKIN_NAMES_SID[13], TZOLKIN_NAMES_SID[18] ], },  // 11
    { NameList: [ TZOLKIN_NAMES_SID[4], TZOLKIN_NAMES_SID[9],  TZOLKIN_NAMES_SID[14], TZOLKIN_NAMES_SID[19] ], },  // 12
    { NameList: [ TZOLKIN_NAMES_SID[5], TZOLKIN_NAMES_SID[10], TZOLKIN_NAMES_SID[15], TZOLKIN_NAMES_SID[20] ], },  // 13
    { NameList: [ TZOLKIN_NAMES_SID[1], TZOLKIN_NAMES_SID[6],  TZOLKIN_NAMES_SID[11], TZOLKIN_NAMES_SID[16] ], },  // 14

    { NameList: [ TZOLKIN_NAMES_SID[2], TZOLKIN_NAMES_SID[7],  TZOLKIN_NAMES_SID[12], TZOLKIN_NAMES_SID[17] ], },  // 15
    { NameList: [ TZOLKIN_NAMES_SID[3], TZOLKIN_NAMES_SID[8],  TZOLKIN_NAMES_SID[13], TZOLKIN_NAMES_SID[18] ], },  // 16
    { NameList: [ TZOLKIN_NAMES_SID[4], TZOLKIN_NAMES_SID[9],  TZOLKIN_NAMES_SID[14], TZOLKIN_NAMES_SID[19] ], },  // 17
    { NameList: [ TZOLKIN_NAMES_SID[5], TZOLKIN_NAMES_SID[10], TZOLKIN_NAMES_SID[15], TZOLKIN_NAMES_SID[20] ], },  // 18
    { NameList: [ TZOLKIN_NAMES_SID[1], TZOLKIN_NAMES_SID[6],  TZOLKIN_NAMES_SID[11], TZOLKIN_NAMES_SID[16] ], },  // 19
    

];


// Numbers for the coefficients used in the Tzolkin cycle
const TZOLKIN_COEFFICIENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// Creating a copy of the above but with a blank entry for the Solve Incomplete Dates (SID)
const TZOLKIN_COEFF_SID = ["UNK", ...TZOLKIN_COEFFICIENTS];


// ---- HAAB ----

// Names of the 18 months of the Haab cycle without the last, 5-day month of Wayeb
const HAAB_NAMES_SHORT = [ 

    { kiche: "Nab'e Likinka",  yucatec: "Pop",      }, 
    { kiche: "Ukab' Likinka",  yucatec: "Wo'",      }, 
    { kiche: "Nab'e Pach",     yucatec: "Zip",      },
    { kiche: "Ukab' Pach",     yucatec: "Zotz",     },
    { kiche: "Tz'isi Laqam",   yucatec: "Tzek",     }, 
    { kiche: "Tz'ikin Q'ij",   yucatec: "Xul",      }, 
    { kiche: "Kaqam",          yucatec: "Yaxk'in",  }, 
    { kiche: "B'otam",         yucatec: "Mol",      }, 
    { kiche: "Si'j",           yucatec: "Ch'en",    }, 
    { kiche: "Ukab' Si'j",     yucatec: "Yax",      }, 
    { kiche: "Urox Si'j",      yucatec: "Sak",      }, 
    { kiche: "Tequexepoal",    yucatec: "Keh",      }, 
    { kiche: "Tz'ib'a Pop",    yucatec: "Mak",      }, 
    { kiche: "Saq",            yucatec: "Kank'in",  }, 
    { kiche: "Cha'ab'",        yucatec: "Muwan",    }, 
    { kiche: "Tz'ipi Q'ij",    yucatec: "Pax",      }, 
    { kiche: "Nab'e Mam",      yucatec: "K'ayab",   }, 
    { kiche: "Ukab' Mam",      yucatec: "Kumk'u",   }, 

];

// Names of the 19 months of the Haab cycle
const HAAB_NAMES = HAAB_NAMES_SHORT.concat(UNLUCKY);

// Creating a copy of the above but with a blank entry for the Solve Incomplete Dates (SID)
const HAAB_NAMES_SID = UNKNOWN.concat(HAAB_NAMES_SHORT, UNLUCKY);

// Create a list of Haab names that exclude Uayeb if Haab coeff > 4
const HAAB_NAMES_SHORT_SID = UNKNOWN.concat(HAAB_NAMES_SHORT);

// This is a list of allowed Haab Names depending on Haab coefficient
// For Haab coeff = UNK or 0-4, the Uayeb is possible. For 5-17, Uayeb is not possible
const ALLOWED_HAAB_NAMES_SID = [
    
	{ Coefficients: [...HAAB_NAMES_SID], }, // UNK
	{ Coefficients: [...HAAB_NAMES_SID], }, // 0
    { Coefficients: [...HAAB_NAMES_SID], }, // 1
    { Coefficients: [...HAAB_NAMES_SID], }, // 2
    { Coefficients: [...HAAB_NAMES_SID], }, // 3
    { Coefficients: [...HAAB_NAMES_SID], }, // 4
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 5
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 6
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 7
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 8
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 9
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 10
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 11
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 12
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 13
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 14
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 15
    { Coefficients: [...HAAB_NAMES_SHORT_SID], }, // 16
	{ Coefficients: [...FIVESET], },      // 17

]

// This is a list of allowed Haab Names depending on Haab coefficient, not for SID
// For Haab coeff = UNK or 0-4, the Uayeb is possible. For 5-17, Uayeb is not possible
const ALLOWED_HAAB_NAMES = [
    
	{ Coefficients: [...HAAB_NAMES], }, // 0
    { Coefficients: [...HAAB_NAMES], }, // 1
    { Coefficients: [...HAAB_NAMES], }, // 2
    { Coefficients: [...HAAB_NAMES], }, // 3
    { Coefficients: [...HAAB_NAMES], }, // 4
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 5
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 6
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 7
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 8
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 9
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 10
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 11
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 12
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 13
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 14
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 15
    { Coefficients: [...HAAB_NAMES_SHORT], }, // 16
	{ Coefficients: [...FIVESET], },      // 17

]


// Day numbers as used in the Haab system
// Note that, in this array, the index is the same as the value, 0th number is 0, 1st number is 1, etc.
// And these coefficients are only possible for non-Uayeb month names
const HAAB_COEFF = [...TWENTYSET];

// Creating a copy of the above but with a blank entry for the Solve Incomplete Dates (SID)
const HAAB_COEFF_SID = ["UNK", ...TWENTYSET];

// Create a special list of Haab coefficients when Uayeb and Tzolkin name is selected
const HAAB_COEFF_UAYEB = [
    
	{ Coefficients: [4],   }, // Imix coefficients
	{ Coefficients: [0],   }, // Ik coefficients
    { Coefficients: [1],   }, // Akbal coefficients
    { Coefficients: [2],   }, // Kan coefficients
    { Coefficients: [3],   }, // Chicchan coefficients
    { Coefficients: [4],   }, // Cimi coefficients
    { Coefficients: [0],   }, // Manik coefficients
    { Coefficients: [1],   }, // Lamat coefficients
    { Coefficients: [2],   }, // Muluc coefficients
    { Coefficients: [3],   }, // Oc coefficients
    { Coefficients: [4],   }, // Chuen coefficients
    { Coefficients: [0],   }, // Eb coefficients
    { Coefficients: [1],   }, // Ben coefficients
    { Coefficients: [2],   }, // Ix coefficients
    { Coefficients: [3],   }, // Men coefficients
    { Coefficients: [4],   }, // Cib coefficients
    { Coefficients: [0],   }, // Caban coefficients
    { Coefficients: [1],   }, // Etznab coefficients
	{ Coefficients: [2],   }, // Cauac coefficients
    { Coefficients: [3],   }, // Ahau coefficients

]



// The allowed coefficients (when not restricted by the Tzolkin) are 0-19 for all Haab months
// except the Uayeb, which can only be 0-4. This array of arrays enables that restrictions on
// Haab coefficient dropdowns
const ALLOWED_HAAB_COEFFICIENTS = [
    
	{ Coefficients: [...HAAB_COEFF], }, // Pop coefficients
	{ Coefficients: [...HAAB_COEFF], }, // Uo coefficients
    { Coefficients: [...HAAB_COEFF], }, // Zip coefficients
    { Coefficients: [...HAAB_COEFF], }, // Zotz' coefficients
    { Coefficients: [...HAAB_COEFF], }, // Tzec coefficients
    { Coefficients: [...HAAB_COEFF], }, // Xul coefficients
    { Coefficients: [...HAAB_COEFF], }, // Yaxkin coefficients
    { Coefficients: [...HAAB_COEFF], }, // Mol coefficients
    { Coefficients: [...HAAB_COEFF], }, // Ch'en coefficients
    { Coefficients: [...HAAB_COEFF], }, // Yax coefficients
    { Coefficients: [...HAAB_COEFF], }, // Zac coefficients
    { Coefficients: [...HAAB_COEFF], }, // Ceh coefficients
    { Coefficients: [...HAAB_COEFF], }, // Mac coefficients
    { Coefficients: [...HAAB_COEFF], }, // Kankin coefficients
    { Coefficients: [...HAAB_COEFF], }, // Maun coefficients
    { Coefficients: [...HAAB_COEFF], }, // Pax coefficients
    { Coefficients: [...HAAB_COEFF], }, // Kayab coefficients
    { Coefficients: [...HAAB_COEFF], }, // Cumku coefficients
	{ Coefficients: [...FIVESET], },    // Uayeb coefficients

]




// "Because of the Calendar Round's mathematical properties, the month number or [Haab] coefficient
// can occur with one of only four possible [Tzolkin] day names..."
// J. Montgomery, How to Read Maya Hieroglyphs, 2002, p86
const POSSIBLE_HAAB_COEFFICIENTS = [

	{ Tzolkin: "Imix",	    Coefficients: [4, 9, 14, 19],	}, // Imix
	{ Tzolkin: "Ik",		Coefficients: [5, 10, 15, 0],	}, // Ik
	{ Tzolkin: "Akbal",		Coefficients: [6, 11, 16, 1],	}, // Akbal
	{ Tzolkin: "Kan",		Coefficients: [7, 12, 17, 2],	}, // Kan
	{ Tzolkin: "Chicchan",	Coefficients: [8, 13, 18, 3],	}, // Chicchan
	{ Tzolkin: "Cimi",		Coefficients: [4, 9, 14, 19],	}, // Cimi
	{ Tzolkin: "Manik",		Coefficients: [5, 10, 15, 0],	}, // Manik
	{ Tzolkin: "Lamat",		Coefficients: [6, 11, 16, 1],	}, // Lamat
	{ Tzolkin: "Muluc",		Coefficients: [7, 12, 17, 2],	}, // Muluc
	{ Tzolkin: "Oc",		Coefficients: [8, 13, 18, 3],	}, // Oc
	{ Tzolkin: "Chuen",		Coefficients: [4, 9, 14, 19],	}, // Chuen
	{ Tzolkin: "Eb",		Coefficients: [5, 10, 15, 0],	}, // Eb
	{ Tzolkin: "Ben",		Coefficients: [6, 11, 16, 1],	}, // Ben
	{ Tzolkin: "Ix",		Coefficients: [7, 12, 17, 2],	}, // Ix
	{ Tzolkin: "Men",		Coefficients: [8, 13, 18, 3],	}, // Men
	{ Tzolkin: "Cib",		Coefficients: [4, 9, 14, 19],	}, // Cib
	{ Tzolkin: "Caban",		Coefficients: [5, 10, 15, 0],	}, // Caban
	{ Tzolkin: "Etz'nab",	Coefficients: [6, 11, 16, 1],	}, // Etznab
	{ Tzolkin: "Cauac",		Coefficients: [7, 12, 17, 2],	}, // Cauac
    { Tzolkin: "Ahau",      Coefficients: [8, 13, 18, 3],   }, // Ahau

];


// ---- ASSORTED OTHER DATA ----

// The four combinations of color and direction
// For reference, we have the following...
// Names: Imix, Ik, Akbal, Kan, Chicchan, Cimi, Manik, Lamat, Muluc, Oc, ...
// Index: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...
// Mod 4: 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, ...
// Name: Ik, Manik, Eb, Caban, Ik, Manik, Eb, Caban, Ik, Manik, Eb, Caban...
// Order: North White, West Black, South Yellow, East Red, North White, West Black, South Yellow, East Red, ...
const DIRECTIONS = ["North", "West", "South", "East"];
const COLORS =     ["White", "Black", "Yellow", "Red"];
const FORECAST =   ["A bold year, hard times. Either floods or no rain at all. Natural disasters and starvation.",
                  "A turbulent year, one of business losses and illness.",
                  "A quiet, calm, enduring year. A good year for business and health.",
                  "A year of creativity and ideas, both good and evil.", ];


// ---- LONG COUNT ----

// This is used for the Solve Incomplete Dates page
// Our allowed piktun values in time order, piktun = 19 is the short piktun with only 13 baktuns in it
// This is the list assuming that Baktun <= 12; order matters here since they are in chron order
const PIKTUN_NORMAL = [...TWENTYSET];
const PIKTUN_VALUES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const PIKTUN_VALUES_SID = ["UNK", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// This is the piktun list is Baktun > 12; basically piktun != 19 in that event
const PIKTUN_VALUES_SHORT = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const PIKTUN_VALUES_SHORT_SID = ["UNK", 10, 11, 12, 13, 14, 15, 16, 17, 18,0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Let's make a complete of allowed piktuns by value of baktun
const ALLOWED_PIKTUNS_SID = [
    
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = UNK
	{ Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 00
	{ Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 01
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 02
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 03
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 04
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 05
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 06
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 07
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 08
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 09
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 10
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 11
    { Coefficients: [...PIKTUN_VALUES_SID], }, // Baktun = 12
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 13
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 14
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 15
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 16
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 17
	{ Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 18
    { Coefficients: [...PIKTUN_VALUES_SHORT_SID], }, // Baktun = 19

];

// Now let's make a version that won't be used for SID purposes
const ALLOWED_PIKTUNS = [
    
	{ Coefficients: [...PIKTUN_VALUES], }, // Baktun = 00
	{ Coefficients: [...PIKTUN_VALUES], }, // Baktun = 01
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 02
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 03
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 04
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 05
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 06
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 07
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 08
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 09
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 10
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 11
    { Coefficients: [...PIKTUN_VALUES], }, // Baktun = 12
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 13
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 14
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 15
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 16
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 17
	{ Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 18
    { Coefficients: [...PIKTUN_VALUES_SHORT], }, // Baktun = 19

];

// This is used for the Incomplete Dates page
// Since we are involving piktuns and the piktun just before the Era Day has 13 baktuns rather than
// the usual 20, we need to put a constraint on baktuns given a piktun value
const BAKTUN_VALUES_SID = ["UNK",...TWENTYSET];
const BAKTUN_VALUES_SHORT_SID = ["UNK",0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const BAKTUN_VALUES = [...TWENTYSET];
const BAKTUN_VALUES_SHORT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


const ALLOWED_BAKTUNS_SID = [
    
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = UNK
	{ Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 10
	{ Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 11
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 12
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 13
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 14
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 15
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 16
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 17
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 18
    { Coefficients: [...BAKTUN_VALUES_SHORT_SID], }, // Piktun = 19
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 00
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 01
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 02
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 03
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 04
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 05
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 06
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 07
    { Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 08
	{ Coefficients: [...BAKTUN_VALUES_SID], }, // Piktun = 09

];

// Now let's make a version not for SID, so no use of UNK
const ALLOWED_BAKTUNS = [
    
	{ Coefficients: [...BAKTUN_VALUES], }, // Piktun = 10
	{ Coefficients: [...BAKTUN_VALUES], }, // Piktun = 11
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 12
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 13
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 14
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 15
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 16
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 17
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 18
    { Coefficients: [...BAKTUN_VALUES_SHORT], }, // Piktun = 19
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 00
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 01
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 02
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 03
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 04
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 05
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 06
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 07
    { Coefficients: [...BAKTUN_VALUES], }, // Piktun = 08
	{ Coefficients: [...BAKTUN_VALUES], }, // Piktun = 09

];



// Create dropdowns for long count items NOT used for SID
const KATUNS_DROP =     [...TWENTYSET];
const TUNS_DROP =       [...TWENTYSET];
const WINALS_DROP =     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const KINS_DROP =       [...TWENTYSET];
const LORDS_DROP =      [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Create a few sets for dropdown purposes rather than text entry, e.g. Solve Incomplete Dates page (SID)
const KATUNS_DROP_SID =     ["UNK", ...TWENTYSET];
const TUNS_DROP_SID =       ["UNK", ...TWENTYSET];
const WINALS_DROP_SID =     ["UNK", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const KINS_DROP_SID =       ["UNK", ...TWENTYSET];
const LORDS_DROP_SID =      ["UNK", 1, 2, 3, 4, 5, 6, 7, 8, 9];



// Declare the arrays exportable from here / importable by other code
export {

    TZOLKIN_NAMES,
    TZOLKIN_COEFFICIENTS,
    ALLOWED_TZOLKIN_NAMES_SID,
    HAAB_NAMES,
    HAAB_COEFF,
    HAAB_COEFF_UAYEB,

    POSSIBLE_HAAB_COEFFICIENTS,
    DIRECTIONS,
    COLORS,
    FORECAST,
    ALLOWED_HAAB_COEFFICIENTS,
    ALLOWED_HAAB_NAMES_SID,
    ALLOWED_HAAB_NAMES,

    TZOLKIN_NAMES_SID,
    TZOLKIN_COEFF_SID,
    HAAB_NAMES_SHORT,
    HAAB_NAMES_SID,
    HAAB_NAMES_SHORT_SID,
    HAAB_COEFF_SID,

    PIKTUN_VALUES,
    PIKTUN_NORMAL,
    ALLOWED_PIKTUNS,
    ALLOWED_BAKTUNS,
    BAKTUN_VALUES,
    BAKTUN_VALUES_SHORT,

    PIKTUN_VALUES_SID,
    BAKTUN_VALUES_SID,
    KATUNS_DROP_SID,
    TUNS_DROP_SID,
    WINALS_DROP_SID,
    KINS_DROP_SID,
    LORDS_DROP_SID,

    KATUNS_DROP,
    TUNS_DROP,
    WINALS_DROP,
    KINS_DROP,
    LORDS_DROP,

    ALLOWED_BAKTUNS_SID,
    ALLOWED_PIKTUNS_SID,

};
