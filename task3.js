// TASK 3 (TASK 1 AND 2 EXTENDED)

"use strict";
const testlib = require( './testlib.js' ); 		// SPECIFY THE USE OF THE TESTLIB FILE FOR FUNCTIONS

let possibleNucleotides = {                     // ALL POSSIBLE ACTUAL NUCLEOTIDES FOR EACH RECORDED CHARACTER
    'R' : ['G', 'A'],
    'Y' : ['T', 'C'],
    'K' : ['G', 'T'],
    'M' : ['A', 'C'],
    'S' : ['G', 'C'],
    'W' : ['A', 'T'],
    'B' : ['G', 'T', 'C'],
    'D' : ['G', 'A', 'T'],
    'H' : ['A', 'C', 'T'],
    'V' : ['G', 'C', 'A'],
    'N' : ['A', 'G', 'C', 'T']
}
let sequences = [];						// PATTERNS TO BE SEARCHED FOR
let possiblePatterns = [];              // POSSIBLE PATTERNS FROM THE INPUT SEQUENCES, GIVEN POSSIBLE NUCLEOTIDES
let patternFrequency = {};			    // THE FREQUENCY OF PATTERN APPEARANCE
let prevLetter;						    // THE NEXT	LETTER TO BE CONSIDERED
let currentLetter;					    // THE CURRENT LETTER BEING CONSIDERED
let concatPattern;					    // THE CONCATENATED STRING TO COMPARE TO THE PATTERN
let letterCount = 0;                    // NUMBER OF LETTERS CHECKED/ITERATED THROUGH

// STORES THE PATTERNS TO BE SEARCHED FOR AND RUNS TESTS
testlib.on( 'ready', function( patterns ) {
	// take in patterns as an array and append all possible patterns, given possibleNucleotides, to possiblePatterns
    sequences = patterns;
	console.log( "Sequences:", sequences);
    
    sequences.array.forEach(element => {
        // for each in sequences, create alternatives based on each letters possible alternative and store them in 
        
    });

    console.log(possiblePatterns);
	//testlib.runTests();
} );


// THIS IS THE CODE THAT ACTS ON EACH PIECE OF DATA
testlib.on( 'data', function( data ) {
    letterCount++; // INCREMENT COUNT FOR LETTER BYTE COUNT
	currentLetter = data;
	console.log( "<<<", currentLetter ); // PRINT CURRENT LETTER READ
	
	concatPattern = prevLetter + currentLetter;
	console.log("<<<<<<", concatPattern); // PRINT CONCATENATED STRING (PATTERN IN QUESTION)

	// IF THE CONCATENATED STRING IS A PATTERN, UPDATE ITS VALUE IN THE TABLE
	if (patternsToSearch.includes(concatPattern)) {
		if (!patternFrequency[concatPattern]) {
			patternFrequency[concatPattern] = 1;
		} else {
			patternFrequency[concatPattern] += 1;
		}
        testlib.foundMatch(concatPattern, letterCount);
	}

	prevLetter = currentLetter;	// STORE THE CHARACTER AS A PREVIOUS CHARACTER FOR THE NEXT ITERATION
} );


// AT THE END OF THE TEST, THE FREQUENCY TABLE IS PRINTED
testlib.on( 'end', function( data ) {
	console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
} );

// RUNS TEST
testlib.setup( 3 ); 
