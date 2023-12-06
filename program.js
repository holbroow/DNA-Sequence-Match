"use strict";

const testlib = require( './testlib.js' );
let nextLetter;
let patternFrequency = {};
let characters;

testlib.on( 'ready', function( patterns ) {

	console.log( "Patterns:", patterns );
    characters = patterns;

	testlib.runTests();
} );

testlib.on( 'data', function( data ) {
	console.log( "<<<", data );

    
} );

testlib.on( 'reset', function( data ) {
	console.log( "<<<", data );

    
    nextLetter = data;
} );

testlib.on( 'end', function( data ) {
	console.log( "<<<", data );
    testlib.frequencyTable(patternFrequency);
} );

testlib.setup( 1 ); // Runs test 1 (task1.data and task1.seq)
