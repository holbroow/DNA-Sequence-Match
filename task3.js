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


// Function to generate variations for a given sequence
function generateVariations(sequence) {
    // Check if the sequence contains any characters with alternatives
    const hasAlternatives = sequence.split('').some(character => possibleNucleotides[character]);

    // If there are no characters with alternatives, return the sequence as a single-element array
    if (!hasAlternatives) {
        return [sequence];
    }

    // Generate variations for characters with alternatives in the sequence
    let variations = sequence.split('').reduce((acc, character, index) => {
        // If the character has alternatives in possibleNucleotides
        if (possibleNucleotides[character]) {
            // Generate variations for each alternative of the character
            let altVariations = possibleNucleotides[character].flatMap(alt => {
                // Replace the character with the alternative and generate variations for the modified sequence
                let newSequence = sequence.substring(0, index) + alt + sequence.substring(index + 1);
                return generateVariations(newSequence);
            });
            // Concatenate the variations obtained from the alternatives to the accumulator array
            return acc.concat(altVariations);
        }
        // If the character has no alternatives, return the accumulator array as is
        return acc;
    }, []);

    // Return the array of variations for the sequence
    return variations;
}



testlib.on('ready', function(patterns) {
    // Assign the input patterns to the variable 'sequences'
    sequences = patterns;
    // Print the received sequences to the console
    console.log("Sequences:", sequences);

    // Generate all variations for each sequence and flatten the resulting arrays into a single array
    const allVariations = sequences.flatMap(sequence => generateVariations(sequence));
    
    // PRINT ALL POSSIBLE PATTERNS
    console.log("Possible Patterns:", allVariations);

    // RUN TESTS
    //// testlib.runTests();
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
