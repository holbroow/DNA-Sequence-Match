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
let splitSequence = [];

// STORES THE PATTERNS TO BE SEARCHED FOR AND RUNS TESTS
testlib.on('ready', function(patterns) {
    // STORE AND PRINT DEFINED SEQUENCES
    sequences = patterns;
    console.log("Sequences:", sequences);

    // FOR EACH STORED SEQUENCE
    sequences.forEach(sequence => {
        // SPLIT THE SEQUENCE INTO CHARACTERS
        splitSequence = sequence.split('');
        // CREATE ARRAY FOR POSSIBLE ALTERNATE SEQUENCES FOR A GIVEN SEQUENCE
        let alteredSequences = [];
        
        // FOR EACH CHARACTER IN THE SEQUENCE
        splitSequence.forEach(character => {
            //// another for each here to check all characters OTHER THAN the one in the above forEach statement
            splitRemaining = 
            // IF THE CHARACTER RESIDES IN POSSIBLE NUCLEOTIDES
            if (possibleNucleotides[character]) {
                // FOR ALL ALTERNATIVE CHARACTERS
                possibleNucleotides[character].forEach(alt => {
                    // COPY THE UNMODIFIED SEQUENCE
                    let alteredSequence = [...splitSequence];
                    // SWAP OUT THE CHARACTER WITH THE ALTERNATIVE
                    alteredSequence[splitSequence.indexOf(character)] = alt;
                    // ADD THE NEW ALTERED SEQUENCE TO THE ARRAY OF ALTERNATIVE SEQUENCES FOR THAT SEQUENCE
                    alteredSequences.push(alteredSequence.join(''));
                });
            }
        });
        
        // FOR EACH ALTERNATIVE SEQUENCE
        alteredSequences.forEach(alteredSeq => {
            // IF THE PATTERN ISNT ALREADY IN POSSIBLE PATTERNS, ADD IT
            // ELSE INCREMENT THE KEY VALUE
            if (!possiblePatterns[alteredSeq]) {
                possiblePatterns[alteredSeq] = 1;
            } else {
                possiblePatterns[alteredSeq]++;
            }
        });
    });

    // PRINT POSSIBLE PATTERNS
    console.log("Possible Patterns:", possiblePatterns);

    // RUN TESTS
    //testlib.runTests();
});


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
