// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, Select, InputLabel, MenuItem } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

// Import the input pages
import DatePop from './Inputs/DatePop';
import GJDate from './Inputs/GJDate';
import JDN from './Inputs/JDN';
import LCD from './Inputs/LCD';
import LCPop from './Inputs/LCPop.js';
import MayaLC from './Inputs/MayaLC';

// Import all the functions we'll need
import { getLCValues, getLCString, buildLCString } from '../../Functions/General';
import { lcdToCRInfo, getTzolkPos, getHaabPos, getCRPos, yearCountData, getGodNum, getDeterminant } from '../../Functions/CalendarRound';
import { getMoonAge, getLunarInfo, lcdTo3Planets, getMonthSize } from '../../Functions/Astronomy';
import { getJDNFromLCD, getJDNDateString, jdnToDate, getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';
import { getLast819Station, getPlaceIn819Cycle, getNumStations } from '../../Functions/819DayStation';

// Import the various data arrays we might need
import { TZOLKIN_NAMES, HAAB_NAMES, DIRECTIONS, COLORS, FORECAST, TZOLKIN_COEFFICIENTS } from '../../Data/CalendarRoundData.js';

// Import the glyph image arrays
import { numberGlyphPaths, tzolkinGlyphPaths, haabGlyphPaths, LCGlyphPaths, lordsGlyphPaths, letteredGlyphPaths,
        directionGlyphPaths, colorGlyphPaths, variousGlyphPaths, ISIGGlyphPaths } from '../../Data/Glyphs';

// Import the tool tip message array
import { toolTipMessages } from '../../Data/Glyphs';

// Import other code, e.g. components, styles, etc.
import { paperStela, paperData, paperStyle } from '../../Data/Components';

// Create a styled component for a customized tooltip when the user hovers over the glyphs in the virtual stelae
const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />)
    )(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`  ]: { color: theme.palette.common.black },
    [`& .${tooltipClasses.tooltip}`]: { backgroundColor: theme.palette.common.black, fontSize: theme.typography.pxToRem(12) },
    }));


export default function CalendarCore(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Next, define some local variables and how to set them
    const [ selectedInput, setSelectedInput ] = useState('lc');
    const [ lcd, setLCD] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation) );

    // Handle changes caused by user selection
    function handleInputChange (event) {
        setSelectedInput(event.target.value);
    }

    function handleLCDChange(lcd) {
        setLCD(Number(lcd));
    }

    function inputContent() {
        switch(selectedInput) {
            case 'lc':      return <MayaLC  calcLCD={handleLCDChange} correlation={correlation} />;
            case 'date':    return <GJDate  calcLCD={handleLCDChange} correlation={correlation} />;
            case 'jdn':     return <JDN     calcLCD={handleLCDChange} correlation={correlation} />;
            case 'lcd':     return <LCD     calcLCD={handleLCDChange} correlation={correlation} />;
            case 'lcPop':   return <LCPop   calcLCD={handleLCDChange} correlation={correlation} />;
            case 'datePop': return <DatePop calcLCD={handleLCDChange} correlation={correlation} />;
            default: // Do nothing
        }
    }

    // Need to perform some calculations first before we can return the content
    let lc = getLCValues(lcd);
    let cr = lcdToCRInfo(lcd);
    let yearCount = yearCountData(getTzolkPos(cr.tzolkinCoefficient, cr.tzolkinName), getHaabPos(cr.haabCoefficient, cr.haabName), names);
    let god = getGodNum(lc.winals, lc.kins);
    let moonAge = getMoonAge(lcd, correlation);
    let jdn = getJDNFromLCD(lcd, correlation);
    let determinant = getDeterminant(lcd);
    let flipDeterminant = -determinant;
    let station = getLast819Station(lcd);
    let stationLC = getLCValues(station);
    let lunarInfo = getLunarInfo(lcd, moonAge, correlation);
    let diffLC = getLCValues(lcd - station);
        

    return(
        
        <div>

            <Grid container justifyContent="center" >
                

                <Grid item style={{width: '330px'}}>
                    <Paper sx={ paperStyle }>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={12}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="age-simple">Choose Input</InputLabel>
                                    <Select
                                        value={selectedInput}
                                        onChange={(event) => handleInputChange(event)}
                                        labelid="age-simple"
                                        label="Choose Input"
                                    >
                                        <MenuItem value="lc">Maya Long Count Input</MenuItem>
                                        <MenuItem value="date">Gregorian/Julian Date Input</MenuItem>
                                        <MenuItem value="jdn">Julian Day Number Input</MenuItem>
                                        <MenuItem value="lcd">Long Count Decimal Input</MenuItem>
                                        <MenuItem value="datePop">Display 1 POP Nearest a Date Input</MenuItem>
                                        <MenuItem value="lcPop">Display 1 POP Nearest an LC Input</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>{inputContent()}</Grid>
                        </Grid>
                    </Paper>
                </Grid>



                <Grid item md={1}><br></br></Grid>



                {/* Create an item with fixed width to keep glyphs close-packed */}

                <Grid item style={{width: '330px'}}>
                    <Paper sx={ paperStela }>
                        <Grid container>


                            {/* Build the header above the virtual stela */}


                            <Grid item xs={12} md={12}>
                                <h2>{getLCString(lc.piktuns, lc.baktuns, lc.katuns, lc.tuns, lc.winals, lc.kins) + '  '} 
                                    {TZOLKIN_COEFFICIENTS[cr.tzolkinCoefficient]} {TZOLKIN_NAMES[cr.tzolkinName][names] + ' '}
                                    {cr.haabCoefficient === 0 ? 'Seating of ' : cr.haabCoefficient + ' '}  {HAAB_NAMES[cr.haabName][names]}
                                    <br></br>
                                    {getJDNDateString(jdnToDate(jdn, 'g'), 'g', true)}
                                </h2>
                            </Grid>
                            
                            <Grid item xs={12} md={12}></Grid>


                            {/* Construct the virtual stela, start with Initial Series */}


                            <Grid item xs={4} md={4}>
                                <p>Initial Series Introductory <br></br> Glyph (ISIG)</p>
                                <p>"Here follows a date.."</p>
                            </Grid>
                            <Grid item xs={8} md={8}><BootstrapTooltip title={toolTipMessages[0]}><img src={ISIGGlyphPaths[ cr.haabName ]} alt="glyph" /></BootstrapTooltip></Grid>


                            <Grid item xs={4} md={4}>
                                <p>{'?'} Kalabtuns<br></br>{lc.piktuns} Piktuns</p>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[30]}><img src={LCGlyphPaths[6]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lc.piktuns]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[29]}><img src={LCGlyphPaths[5]} alt="glyph" /></BootstrapTooltip></Grid>


                            <Grid item xs={4} md={4}>
                                <p>{lc.baktuns} Baktuns<br></br>{lc.katuns} Katuns</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[ lc.baktuns < 0 || lc.baktuns > 19 ? 20 : lc.baktuns ]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[1]}><img src={LCGlyphPaths[4]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lc.katuns]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[2]}><img src={LCGlyphPaths[3]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>{lc.tuns} Tuns<br></br>{lc.winals} Winals</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lc.tuns]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[3]}><img src={LCGlyphPaths[2]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lc.winals]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[4]}><img src={LCGlyphPaths[1]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>{lc.kins} Kins<br></br>Tzolkin: {TZOLKIN_COEFFICIENTS[cr.tzolkinCoefficient]} {TZOLKIN_NAMES[cr.tzolkinName][names]}</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lc.kins]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[5]}><img src={LCGlyphPaths[0]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[TZOLKIN_COEFFICIENTS[cr.tzolkinCoefficient]]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[6]}><img src={tzolkinGlyphPaths[cr.tzolkinName]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>Lord of the Night: {god}<br></br>Glyph F</p>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[7]}><img src={lordsGlyphPaths[god-1]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[8]}><img src={letteredGlyphPaths[0]} alt="glyph" /></BootstrapTooltip></Grid>


                            {/* Here we start the Supplementary Series */}


                            <Grid item xs={4} md={4}>
                                <p>Glyph D - {lunarInfo.D}<br></br>Glyph E - {lunarInfo.E}</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lunarInfo.D]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[9]}><img src={letteredGlyphPaths[1]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lunarInfo.E]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[10]}><img src={letteredGlyphPaths[2]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>Glyph C - {lunarInfo.C}<br></br>X - Lunar month</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lunarInfo.C]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[11]}><img src={letteredGlyphPaths[3]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[12]}><img src={letteredGlyphPaths[ lunarInfo.C + 8 ]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>B - "was its name"<br></br>A - {getMonthSize(moonAge) + 29} day month</p>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[13]}><img src={letteredGlyphPaths[5]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[14]}><img src={letteredGlyphPaths[ getMonthSize(moonAge) + 6 ]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>Glyph YZ - {lunarInfo.Y}<br></br>
                                Haab: {cr.haabCoefficient === 0 ? 'Seating of ' : cr.haabCoefficient} {HAAB_NAMES[cr.haabName][names]}</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lunarInfo.Y]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[15]}><img src={letteredGlyphPaths[4]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[cr.haabCoefficient]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[16]}><img src={haabGlyphPaths[cr.haabName]} alt="glyph" /></BootstrapTooltip></Grid>


                            {/* Now we start the 819-day Series */}


                            <Grid item xs={4} md={4}>
                                <p>DNIG<br></br>ADI</p>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[17]}><img src={variousGlyphPaths[2]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[18]}><img src={variousGlyphPaths[3]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>{diffLC.tuns} Tun<br></br>{diffLC.winals} Winal</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[ diffLC.tuns ]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[19]}><img src={LCGlyphPaths[2]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[ diffLC.winals ]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[20]}><img src={LCGlyphPaths[1]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>{diffLC.kins} Kin<br></br>Tzolkin: {TZOLKIN_COEFFICIENTS[lcdToCRInfo(station).tzolkinCoefficient] + ' ' + 
                                    TZOLKIN_NAMES[lcdToCRInfo(station).tzolkinName][names]}</p>
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[ diffLC.kins ]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[21]}><img src={LCGlyphPaths[0]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[ TZOLKIN_COEFFICIENTS[lcdToCRInfo(station).tzolkinCoefficient] ]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[22]}><img src={tzolkinGlyphPaths[ lcdToCRInfo(station).tzolkinName ]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>Haab: {lcdToCRInfo(station).haabCoefficient + ' ' + 
                                    HAAB_NAMES[lcdToCRInfo(station).haabName][names]}<br></br>
                                819 Dedicatory Verb</p>    
                            </Grid>
                            <Grid item xs={2} md={2}><img src={numberGlyphPaths[lcdToCRInfo(station).haabCoefficient]} alt="glyph" /></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[23]}><img src={haabGlyphPaths[ lcdToCRInfo(station).haabName ]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[24]}><img src={variousGlyphPaths[0]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>Direction: {DIRECTIONS[(lcdToCRInfo(station).tzolkinName % 4)]} <br></br>
                                Color: {COLORS[(lcdToCRInfo(station).tzolkinName % 4)]}</p>
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[25]}><img src={directionGlyphPaths[ (lcdToCRInfo(station).tzolkinName % 4) ]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[26]}><img src={colorGlyphPaths[ (lcdToCRInfo(station).tzolkinName % 4) ]} alt="glyph" /></BootstrapTooltip></Grid>

                            <Grid item xs={4} md={4}>
                                <p>K'awil god<br></br>Unknown glyph</p> 
                            </Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[27]}><img src={variousGlyphPaths[1]} alt="glyph" /></BootstrapTooltip></Grid>
                            <Grid item xs={2} md={2}></Grid>
                            <Grid item xs={2} md={2}><BootstrapTooltip title={toolTipMessages[28]}><img src={variousGlyphPaths[4]} alt="glyph" /></BootstrapTooltip></Grid>

                        </Grid>
                    </Paper>
                </Grid>


                <Grid item md={1}><br></br></Grid>
                {/* Now we start the right hand column, which is basically a text data dump */}


                <Grid item style={{width: '330px'}}>
                    <Paper sx={ paperData }>
                        <Grid container>
                            <Grid item xs={12}>
                                
                                <p><b>Calendar Conversion</b><br></br>
                                Long Count Days: {lcd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br></br>
                                + Correlation: {correlation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br></br>
                                = Julian Day No: {jdn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br></br>
                                {getJDNDateString(jdnToDate(jdn, 'g'), 'g', true)}<br></br>
                                {getJDNDateString(jdnToDate(jdn, 'j'), 'j', true)}</p>

                                <p>---</p>

                                <p><b>Calendar Round (CR)</b><br></br>
                                CR: {Math.floor(lcd / 18980)} completed<br></br>
                                CR day {getCRPos(getTzolkPos(cr.tzolkinCoefficient, cr.tzolkinName), 
                                        getHaabPos(cr.haabCoefficient, cr.haabName)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} of 18,980<br></br>
                                Tzolkin day {getTzolkPos(cr.tzolkinCoefficient, cr.tzolkinName)} of 260<br></br>
                                Haab day {getHaabPos(cr.haabCoefficient, cr.haabName)} of 365</p>

                                <p>---</p>

                                <p><b>819-Day Cycle</b><br></br>
                                Day {getPlaceIn819Cycle(lcd)} of 819<br></br>
                                Station # {getNumStations(lcd)}<br></br>
                                {buildLCString(stationLC)}<br></br>
                                {TZOLKIN_COEFFICIENTS[lcdToCRInfo(station).tzolkinCoefficient] + ' ' + 
                                    TZOLKIN_NAMES[lcdToCRInfo(station).tzolkinName][names] + ' ' + 
                                    lcdToCRInfo(station).haabCoefficient + ' ' + 
                                    HAAB_NAMES[lcdToCRInfo(station).haabName][names]}<br></br>
                                {DIRECTIONS[(lcdToCRInfo(station).tzolkinName % 4)] + ' ' + 
                                    COLORS[(lcdToCRInfo(station).tzolkinName % 4)]}<br></br>
                                Distance: {getLCString(0,0,0,diffLC.tuns, diffLC.winals, diffLC.kins)}</p>

                                <p>---</p>

                                <p><b>Determinant</b><br></br>
                                { determinant >= 0 ? 'Subtracting ' + determinant : 'Adding ' + flipDeterminant} days leads to...<br></br>
                                {getLCValues(lcd - determinant).piktuns + '.' +
                                getLCValues(lcd - determinant).baktuns + '.' +
                                getLCValues(lcd - determinant).katuns + '.' +
                                getLCValues(lcd - determinant).tuns + '.' + 
                                getLCValues(lcd - determinant).winals + '.' + 
                                getLCValues(lcd - determinant).kins}<br></br>
                                {TZOLKIN_COEFFICIENTS[lcdToCRInfo(lcd - determinant).tzolkinCoefficient] + ' ' + 
                                    TZOLKIN_NAMES[lcdToCRInfo(lcd - determinant).tzolkinName][names] + ' ' +
                                    lcdToCRInfo(lcd - determinant).haabCoefficient + ' ' +
                                    HAAB_NAMES[lcdToCRInfo(lcd - determinant).haabName][names]}</p>

                                <p> --- </p>

                                <p><b>Year Bearer</b><br></br>
                                Tikal / Dresden (0 Pop) system:<br></br>
                                {yearCount.number} {TZOLKIN_NAMES[yearCount.name][names]}, {DIRECTIONS[yearCount.direction]} {COLORS[yearCount.color]}<br></br>
                                {FORECAST[yearCount.forecast]}</p>

                                <p> --- </p>

                                <p><b>Astronomical: Days in Cycle</b><br></br>
                                Moon Age: {Math.round(moonAge * 10) / 10} days<br></br>
                                Venus: {(lcdTo3Planets(lcd).venus > 0 ? '+' : '') + Math.round(lcdTo3Planets(lcd).venus)} days<br></br>
                                Jupiter: {(lcdTo3Planets(lcd).jupiter > 0 ? '+' : '') + Math.round(lcdTo3Planets(lcd).jupiter)} days<br></br>
                                Saturn: {(lcdTo3Planets(lcd).saturn > 0 ? '+' : '') + Math.round(lcdTo3Planets(lcd).saturn)} days</p>

                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
                
                <Grid item md={12}>
                    <Paper sx={ paperStyle }>
                        <h1>Interactive Calendar Display</h1>
                        <p>Use the controls on the left to select an input method and then fill in the desired values<br></br> 
                        Hover over a glyph to read a description when viewing this site on a laptop/desktop</p>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );

}

CalendarCore.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

