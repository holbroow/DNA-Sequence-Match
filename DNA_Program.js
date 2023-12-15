/* SCC212 JS Coursework
   Will Holbrook
   Student ID: 38722798
*/

"use strict";
const testlib = require( './testlib.js' );


let possibleNucleotides = {             // ALL POSSIBLE ACTUAL NUCLEOTIDES FOR EACH RECORDED CHARACTER
    'R': ['G', 'A'],
    'Y': ['T', 'C'],
    'K': ['G', 'T'],
    'M': ['A', 'C'],
    'S': ['G', 'C'],
    'W': ['A', 'T'],
    'B': ['G', 'T', 'C'],
    'D': ['G', 'A', 'T'],
    'H': ['A', 'C', 'T'],
    'V': ['G', 'C', 'A'],
    'N': ['A', 'G', 'C', 'T']
};
let sequences = [];						// PATTERNS TO BE SEARCHED FOR
let largestSequenceSize = 0;            // THE NUMBER OF CHARACTERS IN THE LARGEST SEQUENCE (USED WHEN DECIDING A BUFFER SIZE)
let patternFrequency = {};			    // THE FREQUENCY OF PATTERN APPEARANCE
let currentLetter;					    // THE CURRENT LETTER BEING CONSIDERED
let letterCount = 0;                    // NUMBER OF LETTERS CHECKED/ITERATED THROUGH
let buffer;                             // THE BUFFER THAT STORES THE LAST n CHARACTERS FROM THE DATA FILE
let bufferString;                       // THE BUFFER AT ANY GIVEN POINT, CONVERTED TO A PLAIN STRING FOR COMPARISON
let allVariations = [];                 // ALL VARIATIONS FOUND FROM USING POSSIBLE NUCLEOTIDES AND PROVIDED SEQUENCES (with duplicates removed!)
let allUnfilteredVariations;            // ALL VARIATIONS FOUND FROM USING POSSIBLE NUCLEOTIDES AND PROVIDED SEQUENCES


// FUNCTION TO GENERATE VARIATIONS FOR A GIVEN SEQUENCE
function generateVariations(sequence) {
    // CHECK IF ANY CHARACTERS IN THE SEQUENCE HAVE ALTERNATIVES
    const hasAlternatives = sequence.split('').some(character => possibleNucleotides[character]);

    // IF THERE ARE NO ALTERNATIVES, RETURN SINGLE SEQUENCE AS IT IS UNIQUE
    if (!hasAlternatives) {
        return [sequence];
    }

    // IF THERE ARE ALTERNATIVES, GENERATE ALTERNATIVES GIVEN ALTERNATE CHARACTERS
    let variations = sequence.split('').reduce((accumulator, character, index) => {
        // IF THE CURRENT CHARACTER HAS ALTERNATIVES IN POSSIBLE NUCLEOTIDE DICTIONARY
        if (possibleNucleotides[character]) {
            // GENERATE VARIATIONS FOR EACH ALTERNATIVE OF THE CHARACTER
            let altVariations = possibleNucleotides[character].flatMap(alt => {
                // REPLACE THE CHARACTER WITH THE ALTERNATIVE CHARACTER AND THEN FURTHER GENERATE ALTERNATE VARIATIONS FOR THAT SEQUENCE
                let newSequence = sequence.substring(0, index) + alt + sequence.substring(index + 1);
                // if (!seenSequences.includes(newSequence)) {
                //     seenSequences.push(newSequence);
                    return generateVariations(newSequence);
                //}
            });
            // ADD ORIGINAL SEQUENCE AS ONE OF THE VARIATIONS
            altVariations.push(sequence);
            // CONCATENATE OBTAINED VARIATIONS TO AN ACCUMULATOR ARRAY FOR THE SEQUENCE
            return accumulator.concat(altVariations);
        }
        // IF THE CHARACTER DOESNT HAVE ALTERATIVES, RETURN THE ACCUMULATOR ARRAY AS IS
        return accumulator;
    }, []);

    // RETURN THE RESULTING ARRAY OF VARIATIONS FOR THE SEQUENCE
    return variations;
}


// SANITISES A STRING TO NOT INCLUDE ANY HIDDEN/NOT ALPHA CHARACTERS
function sanitiseString(string) {
    // let newString = [];
    // Array.from(string).forEach(char => {
    //     if (char <= 'Z' && char >= 'A') {
    //         newString.push(char);
    //     }
    // });
    // let stringResult = toString(newString);
    // return stringResult;
    return string.replace(/[^a-zA-Z]/g, ''); // ONLY KEEP LETTERS BETWEEN 'a' and 'Z' (a-z + A-Z)
}


// AT THE START OF THE PROGRAM
testlib.on('ready', (patterns) => {
    // SANITISE AND APPEND THE PATTERNS/SEQUENCES, REMOVING ANY UNWANTED CHARS
    patterns.forEach(element => {
        sequences.push(sanitiseString(element));
    });

    // PRINT THE RESULTING PATTERN/SEQUENCE ARRAY
    console.log("Sequences:", sequences, "\n");

    // DECIDE THE CHARACTER BUFFER SIZE FOR THE TEST (SIZE OF LARGEST SEQUENCE)
    sequences.forEach(element => {
        if (element.length > largestSequenceSize) {
            largestSequenceSize = element.length;
        }
    });
    buffer = new Array(largestSequenceSize);

    // Generate all variations for each sequence and flatten the resulting arrays into a single array
    allUnfilteredVariations = sequences.flatMap(sequence => generateVariations(sequence));

    // REMOVE DUPLICATES IN ALLVARIATIONS ARRAY
    allUnfilteredVariations.forEach(element => {
        if (!allVariations.includes(element)) {
            allVariations.push(element);
        }
    });

    // PRINT ALL POSSIBLE PATTERNS
    console.log("Possible Patterns: ", allVariations, "\n");

    // RUN TESTS
    testlib.runTests();
} );

// THIS IS THE CODE THAT ACTS ON EACH PIECE OF DATA
testlib.on( 'data', ( data ) => { 
    letterCount++; // INCREMENT COUNT FOR LETTER BYTE COUNT
	currentLetter = data;
	// console.log( "<<<", currentLetter ); // PRINT CURRENT LETTER READ
	
    if (buffer.length < largestSequenceSize) {
        buffer.push(currentLetter);
    } else {
        buffer.shift();
        buffer.push(currentLetter);
    }
    bufferString = buffer.join("");
    // console.log(bufferString);

	// IF THE CONCATENATED STRING IS A PATTERN, UPDATE ITS VALUE IN THE TABLE
    allVariations.forEach(variation => {
        let varLength = sanitiseString(variation).length;
        // if (bufferString.length > varLength) {
        //     bufferString.slice(bufferString.length - (varLength - 1));
        // }
        if (sanitiseString(bufferString).endsWith(sanitiseString(variation))) {
            if (!patternFrequency[sanitiseString(variation)]) {
                patternFrequency[sanitiseString(variation)] = 1;
            } else {
                patternFrequency[sanitiseString(variation)] += 1;
            }
            // console.log("Buf Unsanitised: " + bufferString);
            // console.log("Buf Sanitised: " + sanitiseString(bufferString));
            // console.log("Var Unsanitised: " + variation);
            // console.log("Var Sanitised: " + sanitiseString(variation));
            testlib.foundMatch(sanitiseString(variation), (letterCount - sanitiseString(variation).length));
        }
    });
} );

// WHEN END OF THE LINE IS REACHED, RESET COUNTS AND TABLE DATA AND CONTINUE
testlib.on( 'reset', ( data ) => {
	// console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
    patternFrequency = {};
    letterCount = 0;
    console.log("\nNew line started!");
} );

// AT THE END OF THE TEST, THE FREQUENCY TABLE IS PRINTED
testlib.on( 'end', ( data ) => {
	console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
} );


// RUNS TEST
testlib.setup( 2 );
