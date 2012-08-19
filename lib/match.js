// **************************************************************************
// Copyright 2007 - 2009 Tavs Dokkedahl
// Contact: http://www.jslab.dk/contact.php
//
// This file is part of the JSLab Standard Library (JSL) Program.
//
// JSL is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 3 of the License, or
// any later version.
//
// JSL is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
// ***************************************************************************

/*
 Calculate the Levensthein distance (LD) of two strings
 Algorithm is taken from http://www.merriampark.com/ld.htm. The algorithm is considered to be public domain.
 1
 Set n to be the length of s.
 Set m to be the length of dictValue.
 If n = 0, return m and exit.
 If m = 0, return n and exit.
 Construct a matrix containing 0..m rows and 0..n columns.  
 2 
 Initialize the first row to 0..n.
 Initialize the first column to 0..m.
 3
 Examine each character of s (i from 1 to n). 
 4
 Examine each character of dictValue (j from 1 to m). 
 5
 If s[i] equals dictValue[j], the cost is 0.
 If s[i] doesn'dictValue equal dictValue[j], the cost is 1. 
 6
 Set cell d[i,j] of the matrix equal to the minimum of:
 a. The cell immediately above plus 1: d[i-1,j] + 1.
 b. The cell immediately to the left plus 1: d[i,j-1] + 1.
 c. The cell diagonally above and to the left plus the cost: d[i-1,j-1] + cost.
 7
 After the iteration steps (3, 4, 5, 6) are complete, the distance is found in cell d[n,m].
 */
function levenshtein(value, dictValue) {
	// ith character of s
	var characterIndex;
	// Step 1
	var valueLength = value.length;
	var dictValueLength = dictValue.length;
	// Matrix
	var matrix = [];
	var valueLengthCounter, dictValueLengthCounter;

	if (!valueLength) { return dictValueLength; }
	if (!dictValueLength) { return valueLength; }

	// Step 2 - Init matrix
	for (valueLengthCounter = 0; valueLengthCounter <= valueLength; valueLengthCounter++) {
		matrix[valueLengthCounter] = [];
		matrix[valueLengthCounter][0] = valueLengthCounter;
	}

	for (dictValueLengthCounter = 0; dictValueLengthCounter <= dictValueLength; dictValueLengthCounter++) {
		matrix[0][dictValueLengthCounter] = dictValueLengthCounter;
	}

	// Step 3 - For each character in this
	for (valueLengthCounter = 1; valueLengthCounter <= valueLength; valueLengthCounter++) {
		characterIndex = value.charAt(valueLengthCounter - 1);
		// Step 4 - For each character in dictValue do step 5 (characterIndex == dictValue.charAt(dictValueLengthCounter - 1) ? 0 : 1) and 6
		for (dictValueLengthCounter = 1; dictValueLengthCounter <= dictValueLength; dictValueLengthCounter++)
			matrix[valueLengthCounter][dictValueLengthCounter] = Math.min(matrix[valueLengthCounter - 1][dictValueLengthCounter] + 1, matrix[valueLengthCounter][dictValueLengthCounter - 1] + 1, matrix[valueLengthCounter - 1][dictValueLengthCounter - 1] + (characterIndex == dictValue.charAt(dictValueLengthCounter - 1) ? 0 : 1));
	}
	//console.log("matrix", value, dictValue, valueLength, dictValueLength, matrix);
	// Step 7
	return matrix[valueLength][valueLength];
}

exports.related = function (value, dictionary, howClose) {
	var levenshteinIndex;
	// Return this array
	var results = [];
	// Length of dictionary
	var l = dictionary.length;
	// for each entry in the dictionary
	for (var i = 0; i < l; i++) {
		// If LD of calling string and string at results[i]
		// is less than howClose then include results[i] in result
		levenshteinIndex = levenshtein(value, dictionary[i]);
		if (levenshteinIndex <= howClose) {
			// Save LD and string as we need LD to sort later
			results.push({ld: levenshteinIndex, s: dictionary[i]});
		}
	}
	// Sort by LD ascending
	results.sort(function (a, b) {
		return a.ld - b.ld
	});
	if (results.length > 0) {
		var ld = results[0].ld;
		results = results.filter(function (result) {
			return result.ld === ld;
		});
	}
	return results.map(function (result) { return result.s; });
};
