"use strict";
const testlib = require( './testlib.js' ); 		// SPECIFY THE USE OF THE TESTLIB FILE FOR FUNCTIONS

let patterns = [];								// PATTERNS TO BE SEARCHED FOR
let prevLetter;									// THE NEXT	LETTER TO BE CONSIDERED
let currentLetter;								// THE CURRENT LETTER BEING CONSIDERED
let concatPattern;								// THE CONCATENATED STRING TO COMPARE TO THE PATTERN
let patternFrequency = {};						// THE FREQUENCY OF PATTERN APPEARANCE

// STORES THE PATTERNS TO BE SEARCHED FOR AND RUNS TESTS
testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );
    patterns = patterns;

	testlib.runTests();
} );

// THIS IS THE CODE THAT ACTS ON EACH PIECE OF DATA
testlib.on( 'data', function( data ) {
	console.log( "<<<", data );
	currentLetter = data;
	
	// check if substrings starting from the current position match any of the predefined patterns
	// compare each in patterns with the current and next letter(s) from data
	// if length of pattern is of concern, measure length of patterns in patterns array
	concatPattern = prevLetter + currentLetter;
	console.log("<<<<<<", concatPattern);

    if (patterns.includes(concatPattern)) {
        // If the concatenated string is a pattern, increment its frequency in the table, 
        if (patterns[concatPattern]) {
			patterns[concatPattern]++;
			console.log("Pattern found!");
        }
    }

	// STORE THE CHARACTER AS A PREVIOUS CHARACTER FOR THE NEXT ITERATION
	prevLetter = currentLetter;
} );

// AT THE END OF THE TEST, THE FREQUENCY TABLE IS PRINTED
testlib.on( 'end', function( data ) {
	console.log( "<<<", data );
    testlib.frequencyTable(patterns);
} );


testlib.setup( 1 ); // Runs test 1 (task1.data and task1.seq)
