// This file stores all glyph image file paths and creates exportable arrays
// that the main interactive calendar page can use to change images on demand

// ----------------- FILE PATHS ---------------------

// Declare a set of imported image objects for numbers, 21x
import glyph0 from '../Images/Glyphs/N0.png';
import glyph1 from '../Images/Glyphs/N1.png';
import glyph2 from '../Images/Glyphs/N2.png';
import glyph3 from '../Images/Glyphs/N3.png';
import glyph4 from '../Images/Glyphs/N4.png';
import glyph5 from '../Images/Glyphs/N5.png';
import glyph6 from '../Images/Glyphs/N6.png';
import glyph7 from '../Images/Glyphs/N7.png';
import glyph8 from '../Images/Glyphs/N8.png';
import glyph9 from '../Images/Glyphs/N9.png';
import glyph10 from '../Images/Glyphs/N10.png';
import glyph11 from '../Images/Glyphs/N11.png';
import glyph12 from '../Images/Glyphs/N12.png';
import glyph13 from '../Images/Glyphs/N13.png';
import glyph14 from '../Images/Glyphs/N14.png';
import glyph15 from '../Images/Glyphs/N15.png';
import glyph16 from '../Images/Glyphs/N16.png';
import glyph17 from '../Images/Glyphs/N17.png';
import glyph18 from '../Images/Glyphs/N18.png';
import glyph19 from '../Images/Glyphs/N19.png';
import glyphNull from '../Images/Glyphs/Null.png';


// Declare a set of imported image objects for Tzolkin glyphs, 20x
import glyphImix     from '../Images/Glyphs/Imix.png';
import glyphIk       from '../Images/Glyphs/Ik.png';
import glyphAkbal    from '../Images/Glyphs/Akbal.png';
import glyphKan      from '../Images/Glyphs/Kan.png';
import glyphChicchan from '../Images/Glyphs/Chicchan.png';
import glyphCimi     from '../Images/Glyphs/Cimi.png';
import glyphManik    from '../Images/Glyphs/Manik.png';
import glyphLamat    from '../Images/Glyphs/Lamat.png';
import glyphMuluc    from '../Images/Glyphs/Muluc.png';
import glyphOc       from '../Images/Glyphs/Oc.png';
import glyphChuen    from '../Images/Glyphs/Chuen.png';
import glyphEb       from '../Images/Glyphs/Eb.png';
import glyphBen      from '../Images/Glyphs/Ben.png';
import glyphIx       from '../Images/Glyphs/Ix.png';
import glyphMen      from '../Images/Glyphs/Men.png';
import glyphCib      from '../Images/Glyphs/Cib.png';
import glyphCaban    from '../Images/Glyphs/Caban.png';
import glyphEtznab   from '../Images/Glyphs/Etznab.png';
import glyphCauac    from '../Images/Glyphs/Cauac.png';
import glyphAhau     from '../Images/Glyphs/Ahau.png';


// Declare a set of imported image objects for Haab glyphs, 19x
import glyphPop     from '../Images/Glyphs/Pop.png';
import glyphUo      from '../Images/Glyphs/Uo.png';
import glyphZip     from '../Images/Glyphs/Zip.png';
import glyphZotz    from '../Images/Glyphs/Zotz.png';
import glyphTzec    from '../Images/Glyphs/Tzec.png';
import glyphXul     from '../Images/Glyphs/Xul.png';
import glyphYaxkin  from '../Images/Glyphs/Yaxkin.png';
import glyphMol     from '../Images/Glyphs/Mol.png';
import glyphChen    from '../Images/Glyphs/Chen.png';
import glyphYax     from '../Images/Glyphs/Yax.png';
import glyphZac     from '../Images/Glyphs/Zac.png';
import glyphCeh     from '../Images/Glyphs/Ceh.png';
import glyphMac     from '../Images/Glyphs/Mac.png';
import glyphKankin  from '../Images/Glyphs/Kankin.png';
import glyphMuan    from '../Images/Glyphs/Muan.png';
import glyphPax     from '../Images/Glyphs/Pax.png';
import glyphKayab   from '../Images/Glyphs/Kayab.png';
import glyphCumku   from '../Images/Glyphs/Cumku.png';
import glyphUayeb   from '../Images/Glyphs/Uayeb.png';

// Declare a set of imported image objects for Lord of the Night glyphs, 9x
// Taken from Mark Pitts "Maya Numbers and Calendar Book 2"
import glyphLord1   from '../Images/Glyphs/Lord1.png';
import glyphLord2   from '../Images/Glyphs/Lord2.png';
import glyphLord3   from '../Images/Glyphs/Lord3.png';
import glyphLord4   from '../Images/Glyphs/Lord4.png';
import glyphLord5   from '../Images/Glyphs/Lord5.png';
import glyphLord6   from '../Images/Glyphs/Lord6.png';
import glyphLord7   from '../Images/Glyphs/Lord7.png';
import glyphLord8   from '../Images/Glyphs/Lord8.png';
import glyphLord9   from '../Images/Glyphs/Lord9.png';

// Declare a set of imported image objects for the Long Count, 6x
// Taken from Mark Pitts "Maya Numbers and Calendar Book 2"
import glyphKin      from '../Images/Glyphs/Kin.png';
import glyphWinal    from '../Images/Glyphs/Winal.png';
import glyphTun      from '../Images/Glyphs/Tun.png';
import glyphKatun    from '../Images/Glyphs/Katun.png';
import glyphBaktun   from '../Images/Glyphs/Baktun.png';
import glyphPiktun   from '../Images/Glyphs/Piktun.png';
import glyphKalabtun from '../Images/Glyphs/Kalabtun.png';

// Declare a set of imported image objects for the ISIG, 18x
import glyphISIGPop     from '../Images/Glyphs/ISIGPop.png';
import glyphISIGUo      from '../Images/Glyphs/ISIGUo.png';
import glyphISIGZip     from '../Images/Glyphs/ISIGZip.png';
import glyphISIGZotz    from '../Images/Glyphs/ISIGZotz.png';
import glyphISIGTzec    from '../Images/Glyphs/ISIGTzec.png';
import glyphISIGXul     from '../Images/Glyphs/ISIGXul.png';
import glyphISIGYaxkin  from '../Images/Glyphs/ISIGYaxkin.png';
import glyphISIGMol     from '../Images/Glyphs/ISIGMol.png';
import glyphISIGChen    from '../Images/Glyphs/ISIGChen.png';
import glyphISIGYax     from '../Images/Glyphs/ISIGYax.png';
import glyphISIGZac     from '../Images/Glyphs/ISIGZac.png';
import glyphISIGCeh     from '../Images/Glyphs/ISIGCeh.png';
import glyphISIGMac     from '../Images/Glyphs/ISIGMac.png';
import glyphISIGKankin  from '../Images/Glyphs/ISIGKankin.png';
import glyphISIGMuan    from '../Images/Glyphs/ISIGMuan.png';
import glyphISIGPax     from '../Images/Glyphs/ISIGPax.png';
import glyphISIGKayab   from '../Images/Glyphs/ISIGKayab.png';
import glyphISIGCumku   from '../Images/Glyphs/ISIGCumku.png';
import glyphISIGUayeb   from '../Images/Glyphs/ISIGUayeb.png';

// Declare a set of imported image objects for lettered glyphs, 5x
// Taken from Mark Pitts "Maya Numbers and Calendar Book 2"
import glyphF  from '../Images/Glyphs/F.png';
import glyphD  from '../Images/Glyphs/D.png';
import glyphE  from '../Images/Glyphs/E.png';
import glyphC  from '../Images/Glyphs/C.png';
import glyphY  from '../Images/Glyphs/Y.png';

// These are from J. Montgomery "How to Read Maya Hieroglyphs"
import glyphB    from '../Images/Glyphs/B.png'; 
import glyphA29  from '../Images/Glyphs/A29.png';
import glyphA30  from '../Images/Glyphs/A30.png';
import glyphX1   from '../Images/Glyphs/X1.png';
import glyphX2   from '../Images/Glyphs/X2.png';
import glyphX3   from '../Images/Glyphs/X3.png';
import glyphX4   from '../Images/Glyphs/X4.png';
import glyphX5   from '../Images/Glyphs/X5.png';
import glyphX6   from '../Images/Glyphs/X6.png';

// Declare a set of imported image objects for directions and colors, 8x
// Taken from Mark Pitts "Writing in Maya Glyphs Book 1"
import glyphEast    from '../Images/Glyphs/East.png';
import glyphNorth   from '../Images/Glyphs/North.png';
import glyphWest    from '../Images/Glyphs/West.png';
import glyphSouth   from '../Images/Glyphs/South.png';
import glyphRed     from '../Images/Glyphs/Red.png';
import glyphBlack   from '../Images/Glyphs/Black.png';
import glyphYellow  from '../Images/Glyphs/Yellow.png';
import glyphWhite   from '../Images/Glyphs/White.png';

// Declare a set of imported image objects for various assorted glyhs
import glyph819verb  from '../Images/Glyphs/819verb.png';
import glyphKawil    from '../Images/Glyphs/Kawil.png';
import glyphDNIG     from '../Images/Glyphs/DNIG.png';
import glyphADI      from '../Images/Glyphs/ADI.png';
import glyphUnknown  from '../Images/Glyphs/Unknown.png';


// ----------------- DATA ARRAYS ---------------------

// Create an array to store the image object names for numbers
const numberGlyphPaths = [
    glyph0, glyph1, glyph2, glyph3, glyph4, glyph5,
    glyph6, glyph7, glyph8, glyph9, glyph10, glyph11,
    glyph12, glyph13, glyph14, glyph15, glyph16, glyph17,
    glyph18, glyph19, glyphNull,
];

// Create an array to store the image object names for Tzolkin
const tzolkinGlyphPaths = [
    glyphImix, glyphIk, glyphAkbal, glyphKan, glyphChicchan, glyphCimi,
    glyphManik, glyphLamat, glyphMuluc, glyphOc, glyphChuen, glyphEb,
    glyphBen, glyphIx, glyphMen, glyphCib, glyphCaban, glyphEtznab,
    glyphCauac, glyphAhau,
];

// Create an array to store the image object names for Haab
const haabGlyphPaths = [
    glyphPop, glyphUo, glyphZip, glyphZotz, glyphTzec, glyphXul, glyphYaxkin,
    glyphMol, glyphChen, glyphYax, glyphCeh, glyphZac, glyphMac, glyphKankin,
    glyphMuan, glyphPax, glyphKayab, glyphCumku, glyphUayeb,
];

// Create an array to store the image object names for Lords of the Night
const lordsGlyphPaths = [ glyphLord1, glyphLord2, glyphLord3, glyphLord4, glyphLord5, glyphLord6, glyphLord7, glyphLord8, glyphLord9, ];

// Create an array to store the image object names for the Long Count
const LCGlyphPaths = [ glyphKin, glyphWinal, glyphTun, glyphKatun, glyphBaktun, glyphPiktun, glyphKalabtun ];

// Create an array to store the image object names for the ISIG glyphs
const ISIGGlyphPaths = [
    glyphISIGPop, glyphISIGUo, glyphISIGZip, glyphISIGZotz, glyphISIGTzec, glyphISIGXul, glyphISIGYaxkin,
    glyphISIGMol, glyphISIGChen, glyphISIGYax, glyphISIGZac, glyphISIGCeh, glyphISIGMac, glyphISIGKankin,
    glyphISIGMuan, glyphISIGPax, glyphISIGKayab, glyphISIGCumku, glyphISIGUayeb
];

// Create an array to store the image object names for the various glyphs
const variousGlyphPaths = [ glyph819verb, glyphKawil, glyphDNIG, glyphADI, glyphUnknown, ];

// Create an array to store the image object names for the lettered glyphs
const letteredGlyphPaths = [
    glyphF, glyphD, glyphE, glyphC, glyphY, glyphB, glyphA29, glyphA30, glyphX1, glyphX2, glyphX3, glyphX4, glyphX5, glyphX6,
];

// Create an array to store the image object names for the directions
const directionGlyphPaths = [ glyphNorth, glyphWest, glyphSouth, glyphEast, ];

// Create an array to store the image object names for the colors
const colorGlyphPaths = [ glyphWhite, glyphBlack, glyphYellow, glyphRed, ];

// Create the tooltip descriptions when hovering over a glyph
// The order of the tooltips is this...
// ISIG, Baktun, Katun, Tun, Uinal, Kin, Tzolkin, Lord of Night, F, 
// D, E, C, X, B, A, YZ, Haab, 
// DNIG, ADI, Tun, Uinal, Kin, Tzolkin, Haab, 819 verb, Direction, Color, Kawil, Unknown
const toolTipMessages = [
    "ISIG - An oversized Initial Series Introductory Glyph with Haab month patron deities infixed",

    "A Baktun is a cycle of 144,000 days",
    "A Katun is a cycle of 7,200 days",
    "A Tun is a cycle of 360 days",
    "A Winal is a cycle of 20 days",
    "A Kin is a single day",

    "The Tzolk'in is a 260-day sacred calendar",
    "9-Day Cycle - The Lords of the Night were 9 different gods",

    "Glyph F always follows the Lords of the Night",
    "Glyph D counts days less than 20 since the new moon",
    "Glyph E counts days after 20 since the new moon",
    "Glyph C indicates which of the 6 repeating lunar months we are in",
    "Glyph X indicates the name of the lunar month as a symbol",
    "Glyph B followed Glyph X as a description",
    "Glyph A indicates the length of the current month: 29 or 30 days",
    "Glyph YZ represents a 7-day cycle",

    "The Haab is a 365-day solar year",
    "DNIG - Distance Number Indicator Glyph",
    "The ADI instructs the reader to count backward from the Initial Series date",
    "A Tun is a cycle of 360 days",
    "A Winal is a cycle of 20 days",
    "A Kin is a single day",
    "The Tzolk'in is a 260-day sacred calendar",
    "The Haab is a 365-day solar year",
    
    "This is a dedicatory verb for the 819-day cycle",
    "The direction associated with this 819-day station",
    "The color associated with this 819-day station",
    "The god K'awil associated with the 819-day cycle",
    "An unknown glyph that follows K'awil",

    "A Piktun is a cycle of 2,880,000 days",
    "A Kalabtun is a cycle of 57,600,000 days"
];

// ----------------- EXPORT ARRAYS ---------------------

// Declare the arrays to be exportable to other modules
export { numberGlyphPaths };
export { tzolkinGlyphPaths };
export { haabGlyphPaths };
export { lordsGlyphPaths };
export { LCGlyphPaths }; 
export { letteredGlyphPaths };
export { directionGlyphPaths };
export { colorGlyphPaths };
export { toolTipMessages };
export { variousGlyphPaths };
export { ISIGGlyphPaths };