// TASK 3 (TASK 1 AND 2 EXTENDED)

"use strict";
const testlib = require( './testlib.js' );


let possibleNucleotides = {             // ALL POSSIBLE ACTUAL NUCLEOTIDES FOR EACH RECORDED CHARACTER
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
let patternFrequency = {};			    // THE FREQUENCY OF PATTERN APPEARANCE
let currentLetter;					    // THE CURRENT LETTER BEING CONSIDERED
let letterCount = 0;                    // NUMBER OF LETTERS CHECKED/ITERATED THROUGH
let largestSequenceSize = 0;            // THE NUMBER OF CHARACTERS IN THE LARGEST SEQUENCE (USED WHEN DECIDING A BUFFER SIZE)
let buffer;                             // THE BUFFER THAT STORES THE LAST n CHARACTERS FROM THE DATA FILE
let allVariations;                      // ALL VARIATIONS FOUND FROM USING POSSIBLE NUCLEOTIDES AND PROVIDED SEQUENCES
let bufferString;                       // THE BUFFER AT ANY GIVEN POINT, CONVERTED TO A PLAIN STRING FOR COMPARISON


// FUNCTION TO GENERATE VARIATIONS FOR A GIVEN SEQUENCE
function generateVariations(sequence) {
    // CHECK IF ANY CHARACTERS IN THE SEQUENCE HAVE ALTERNATIVES
    const hasAlternatives = sequence.split('').some(character => possibleNucleotides[character]);

    // IF THERE ARE NO ALTERNATIVES, RETURN SINGLE SEQUENCE AS IT IS UNIQUE
    if (!hasAlternatives) {
        return [sequence];
    }

    // IF THERE ARE ALTERNATIVES, GENERATE ALTERNATIVES GIVEN ALTERNATE CHARACTERS
    let variations = sequence.split('').reduce((acc, character, index) => {
        // IF THE CURRENT CHARACTER HAS ALTERNATIVES IN POSSIBLE NUCLEOTIDE DICTIONARY
        if (possibleNucleotides[character]) {
            // GENERATE VARIATIONS FOR EACH ALTERNATIVE OF THE CHARACTER
            let altVariations = possibleNucleotides[character].flatMap(alt => {
                // REPLACE THE CHARACTER WITH THE ALTERNATIVE CHARACTER AND THEN FURTHER GENERATE ALTERNATE VARIATIONS FOR THAT SEQUENCE
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

    // DECIDE THE CHARACTER BUFFER SIZE FOR THE TEST (SIZE OF LARGEST SEQUENCE)
    sequences.forEach(element => {
        if (element.length > largestSequenceSize) {
            largestSequenceSize = element.length;
        }
    });
    console.log(largestSequenceSize);
    buffer = new Array(largestSequenceSize);

    // Generate all variations for each sequence and flatten the resulting arrays into a single array
    allVariations = sequences.flatMap(sequence => generateVariations(sequence));

    // need to remove duplicates here!!!!!!!!!!!!!!
    
    // PRINT ALL POSSIBLE PATTERNS
    console.log("Possible Patterns:", allVariations);

    // RUN TESTS
    testlib.runTests();
} );


// THIS IS THE CODE THAT ACTS ON EACH PIECE OF DATA
testlib.on( 'data', function( data ) { 
    letterCount++; // INCREMENT COUNT FOR LETTER BYTE COUNT
	currentLetter = data;
	console.log( "<<<", currentLetter ); // PRINT CURRENT LETTER READ
	
    if (buffer.length < largestSequenceSize) {
        buffer.push(currentLetter);
    } else {
        buffer.shift();
        buffer.push(currentLetter);
    }
    bufferString = buffer.join("");
	console.log("<<<<<<", bufferString); // PRINT CONCATENATED STRING (PATTERN IN QUESTION)

	// IF THE CONCATENATED STRING IS A PATTERN, UPDATE ITS VALUE IN THE TABLE
    allVariations.forEach(variation => {
        let varLength = variation.length-1;
        bufferString.slice(bufferString.length - (varLength - 1));

        if (allVariations.includes(bufferString)) {
            console.log("YES");
            if (!patternFrequency[bufferString]) {
                patternFrequency[bufferString] = 1;
            } else {
                patternFrequency[bufferString] += 1;
            }
            testlib.foundMatch(bufferString, letterCount);
        }
    });
} );


// AT THE END OF THE TEST, THE FREQUENCY TABLE IS PRINTED
testlib.on( 'end', function( data ) {
	console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
} );

// RUNS TEST
testlib.setup( 3 ); 
