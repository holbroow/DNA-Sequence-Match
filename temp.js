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