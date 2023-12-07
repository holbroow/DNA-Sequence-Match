// TASK 2 (TASK 1 EXTENDED TO USE COUNTS)

"use strict";
const testlib = require( './testlib.js' ); 		// SPECIFY THE USE OF THE TESTLIB FILE FOR FUNCTIONS

let patternsToSearch = [];						// PATTERNS TO BE SEARCHED FOR
let patternFrequency = {};						// THE FREQUENCY OF PATTERN APPEARANCE
let prevLetter;									// THE NEXT	LETTER TO BE CONSIDERED
let currentLetter;								// THE CURRENT LETTER BEING CONSIDERED
let concatPattern;								// THE CONCATENATED STRING TO COMPARE TO THE PATTERN
let letterCount = 0;                            // NUMBER OF LETTERS CHECKED/ITERATED THROUGH



// STORES THE PATTERNS TO BE SEARCHED FOR AND RUNS TESTS
testlib.on( 'ready', function( patterns ) {
	patternsToSearch = patterns;
	console.log( "Patterns:", patternsToSearch );

	testlib.runTests();
} );


// THIS IS THE CODE THAT ACTS ON EACH PIECE OF DATA
testlib.on( 'data', function( data ) {
    letterCount++;

	currentLetter = data;
	console.log( "<<<", currentLetter ); 		// PRINT CURRENT LETTER READ
	concatPattern = prevLetter + currentLetter;
	console.log("<<<<<<", concatPattern);		// PRINT CONCATENATED STRING (PATTERN IN QUESTION)

	// IF THE CONCATENATED STRING IS A PATTERN, UPDATE ITS VALUE IN THE TABLE
	if (patternsToSearch.includes(concatPattern)) {
		if (!patternFrequency[concatPattern]) {
			patternFrequency[concatPattern] = 1;
		} else {
			patternFrequency[concatPattern] += 1;
		}
        testlib.foundMatch(concatPattern, letterCount);
	}

	prevLetter = currentLetter;		// STORE THE CHARACTER AS A PREVIOUS CHARACTER FOR THE NEXT ITERATION
} );


// AT THE END OF THE TEST, THE FREQUENCY TABLE IS PRINTED
testlib.on( 'end', function( data ) {
	console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
} );

// RUNS TEST
testlib.setup( 2 ); 
