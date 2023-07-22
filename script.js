/**
 * Given a string of text, this function returns a list of numbers
 * where a's become 1's (both upper and lowe case), b's are 2's, and
 * so on. Other characters are ignored
 * @param {String} str input string of text
 * @returns {Array<number>} list of corresponding numbers
 */
function textToNum(str) {
    let result = [];
    for(let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if(c >= 65 && c <= 90) {
            result.push(c - 64);
        } else if(c >= 97 && c <= 122) {
            result.push(c - 96);
        }
    }
    return result;
}

/**
 * Given a list of numbers (in the range 1-26), this function returns
 * a string of characters replacing 1's with a's, 2's with b's, and
 * so on.
 * @param {Array<number>} nums
 * @returns {String} corresponding characters (all lowercase)
 */
function numToText(nums) {
    return numToText(nums, false);
}

function numToText(nums, isUpperCase) {
    let result = "";
    for(let i = 0; i < nums.length; i++) {
        let n = nums[i];
        if (n == 0) n = 26;
        let k = 96;
        if(isUpperCase) k = 64;
        result += String.fromCharCode(n + k);
    }
    return result;
}

/**
 * Given a list of numbers, this function performs an identical
 * operation to each number in the list. For example, add 3 to the
 * number and reduce it mod 26
 * @param {Array<number>} nums input list of numbers
 * @param {char} op operation (+, -, *, /, or %)
 * @param {number} scale number to apply operation with
 */
 function listCompute(nums, op, scale) {
    for(let i = 0; i < nums.length; i++) {
        if(op == '+') nums[i] += scale;
        else if(op == '-') nums[i] -= scale;
        else if(op == '*') nums[i] *= scale;
        else if(op == '/') nums[i] /= scale;
        else if(op == '%') nums[i] = ((nums[i] % scale)+scale)%scale;
          
    }
}

/**
 * This function cleans a String of text by deleting any non-letter
 * characters, and changing each character to a capital letter.
 * @param {String} text input String of text
 * @returns {String} cleaned String of text
 */
function cleanText(text) {
    return cleanTextCaseSensative(text.toUpperCase());
}

function cleanTextCaseSensative(text) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if((c > 64 && c < 91) || (c > 96 && c < 123)) {
            result = result.concat(text.charAt(i));
        }
    }
    return result;
}

/**
 * This function cleans a String of text by deleting any non-letter
 * characters, and changing each character to a capital letter.
 * @param {String} text input String of text
 * @returns {String} cleaned String of text
 */
 function cleanTextSpaces(text) {
    return cleanTextCaseSensativeSpaces(text.toUpperCase());
}

function cleanTextCaseSensativeSpaces(text) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if((c > 64 && c < 91) || (c > 96 && c < 123)) {
            result = result.concat(text.charAt(i));
        } else{
            if(c == 32) {result = result.concat(text.charAt(i));}
        }
    }
    return result;
}





   

/**
 * Given a string of text, this function tracks the frequency of
 * each substring of a given length, and stores the data in a
 * dictionary
 * @param {String} text input string of text
 * @param {Number} length length of substrings
 * @returns {Dictionary} dictionary of strings as keys and numbers as
 * values 
 */
function frequencyAnalysis(text, length) {
    let dict = {};
    for(let i = 0; i < text.length - (length - 1); i++) {
        let sub = text.substring(i, i + length);
        if(dict.hasOwnProperty(sub)) {
            dict[sub]++;
        } else {
            dict[sub] = 1;
        }
    }
    if(length == 1) {
        for(key in dict) {
            dict[key] /= text.length;
            dict[key] *= 1000.0;
            dict[key] = Math.round(dict[key]);
            dict[key] /= 10.0;
        }
    }
    return dict;
}

/**
 * Given a dictionary of frequency analysis data, this function
 * outputs the data to the HTML table on the frequency analysis
 * page
 * @param {Dictionary} dict dictionary of data
 * @param {Number} column number from 1-3 specifying which column
 * @param {String} tableId HTML id of table to edit
 * to output data to
 */
function outputTable(dict, column, tableId) {
    let table = document.getElementById(tableId);
    let rows = table.rows;
    let length = Object.keys(dict).length;
    if(length > 26) length = 15;
    for(let i = 0; i < length; i++) {
        let n = -1;
        let letter = "";
        for(key in dict) {
            let value = dict[key];
            if(value > n) {
                n = value;
                letter = key;
            }
        }
        rows[i + 2].cells[column * 2].innerHTML = letter;
        rows[i + 2].cells[(column * 2) + 1].innerHTML = dict[letter];
        delete dict[letter];
    }
}

function spaceText(text, length) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        result = result.concat(text.charAt(i));
        if((i + 1) % length == 0) result = result.concat(' ');
    }
    return result;
}

/**
 * This function Encrypts a string of text with the vigenere
 * cipher given a keyword
 * @param {String} text input plain text
 * @param {String} keyword encryption keyword
 * @returns {String} encrypted ciphertext
 */
function vigenereEncrypt(text, keyword) {
    text = cleanText(text);
    keyword = cleanText(keyword);

    let textNums = textToNum(text);
    let keywordNums = textToNum(keyword);

    // Reduce each keyword value by 1 since 'a' indicates no shift
    for(let i = 0; i < keywordNums.length; i++) {
        keywordNums[i]--;
    }

    let n = keywordNums.length;

    for(let i = 0; i < textNums.length; i++) {
        textNums[i] += keywordNums[i % n];
        textNums[i] %= 26;
    }

    let result = numToText(textNums, true);
    return spaceText(result, 5);
}

/**
 * This function Decrypts a string of vigenere ciphertext given a
 * keyword
 * @param {String} text vigenere ciphertext
 * @param {String} keyword decryption keyword
 * @returns {String} decrypted message
 */
function vigenereDecrypt(text, keyword) {
    text = cleanText(text);
    keyword = cleanText(keyword);

    let textNums = textToNum(text);
    let keywordNums = textToNum(keyword);

    // Reduce each keyword value by 1 since 'a' indicates no shift
    for(let i = 0; i < keywordNums.length; i++) {
        keywordNums[i]--;
    }

    let n = keywordNums.length;

    for(let i = 0; i < textNums.length; i++) {
        textNums[i] -= keywordNums[i % n];
        if(textNums[i] < 0) textNums[i] += 26;
    }

    let result = numToText(textNums, false);
    return spaceText(result, 5);
}

/**
 * This function encrypts a string of text with a monoalphabetic
 * substitution cipher given a ciphertext alphabet
 * @param {String} text input plain text
 * @param {String} key string of length 26 representing a
 * ciphertext alphabet
 * @returns {String} encrypted ciphertext
 */
function monoEncrypt(text, key) {
    text = cleanText(text);
    key = cleanText(key);
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let keyIndex = text.charCodeAt(i) - 65;
        result = result.concat(key.charAt(keyIndex));
    }
    return spaceText(result, 5);
}

function monoEncryptSpaces(text, key) {
    text = cleanTextSpaces(text);
    key = cleanText(key);
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let keyIndex = text.charCodeAt(i) - 65;
        if (keyIndex == -33) {
            result = result.concat(" ");
        } else {
        result = result.concat(key.charAt(keyIndex));}
    }
    return result;
}

function monoEncryptPunctuation(text, key) {
    text = text.toUpperCase();
    key = cleanText(key);
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let keyIndex = text.charCodeAt(i) - 65;
        if ((keyIndex < 26) && (keyIndex > -1)) {
            result = result.concat(key.charAt(keyIndex));;
        } else {result = result.concat(text.substr(i,1));
        }
    }
    return result;
}

/**
 * This function decrypts a string of ciphertext with a
 * monoalphabetic substitution cipher given a ciphertext alphabet
 * @param {String} text input ciphertext
 * @param {String} key string of length 26 representing a
 * ciphertext alphabet
 * @returns {String} decrypted message
 */
function monoDecrypt(text, key) {
    text = cleanText(text);
    key = cleanText(key);
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        let index = key.indexOf(c);
        result = result.concat(String.fromCharCode(index + 65));
    }
    return spaceText(result, 5).toLowerCase();
}

function monoDecryptSpaces(text, key) {
    text = cleanTextSpaces(text);
    key = cleanText(key);
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        if (c == " ") {
        result = result.concat(" ");
        } else {
        let index = key.indexOf(c);
        result = result.concat(String.fromCharCode(index + 65));
        }
    }
    return result;
}

/**
 * This function removes any duplicate letters from a given string
 * of text.
 * @param {String} text input text
 * @returns {String} text with duplicate characters removed
 */
function removeDupLetters(text) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        if(result.indexOf(c) == -1) result = result.concat(c);
    }
    return result;
}

/**
 * This function removes all given letters from the given string of
 * text.
 * @param {*} text input text
 * @param  {...char} letters any letter
 */
function removeLetters(text, letters) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        if(!letters.includes(c)) result = result.concat(c);
    }
    return result;
}

/**
 * This function removes all spaces from a given string of text
 * @param {String} text input text
 * @returns {String} text with spaces removed
 */
function removeSpaces(text) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        if(c != " ") result = result.concat(c);
    }
    return result;
}

/**
 * This function generates a keyword alphabet for a keyword cipher
 * given an encryption key and a shift letter
 * @param {String} key keyword to insert into alphabet
 * @param {char} letter letter indicating where to shift keyword into
 * alphabet
 * @returns {String} keyword alphabet to be used for monoalphabetic
 * substitution cipher
 */
function getKeywordAlphabet(key, letter) {
    key = cleanText(key);
    key = removeDupLetters(key);
    letter = letter.toUpperCase();
    let letterCode = letter.charCodeAt(0) - 65;
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let monoKey = [];
    for(let i = 0; i < key.length; i++) {
        monoKey[(i + letterCode) % 26] = key.charAt(i);
    }
    alphabet = removeLetters(alphabet, key);
    for(let i = 0; i < alphabet.length; i++) {
        monoKey[(i + letterCode + key.length) % 26] = alphabet.charAt(i);
    }
    return monoKey.join('');
}

/**
 * This function encrypts a string of text with a keyword cipher
 * given a string of text, a keyword, and a shift letter
 * @param {String} text input plain text
 * @param {String} key keyword
 * @param {char} letter letter indicating where to shift keyword
 * into cipher alphabet
 * @returns {String} encrypted text
 */
function keywordEncrypt(text, key, letter) {
    let alphabet = getKeywordAlphabet(key, letter);
    return monoEncrypt(text, alphabet);
}

function keywordEncryptSpaces(text, key, letter) {
    let alphabet = getKeywordAlphabet(key, letter);
    return monoEncryptSpaces(text, alphabet);
}

function keywordEncryptPunctuation(text, key, letter) {
    let alphabet = getKeywordAlphabet(key, letter);
    return monoEncryptPunctuation(text, alphabet);
}



/**
 * This function decrypts a string of keyword-ciphered text
 * @param {String} text input ciphertext
 * @param {String} key keyword
 * @param {char} letter letter indicating where to shift keyword
 * into cipher alphabet
 * @returns {String} decrypted text
 */
function keywordDecrypt(text, key, letter) {
    let alphabet = getKeywordAlphabet(key, letter);
    return monoDecrypt(text, alphabet);
}

function keywordDecryptSpaces(text, key, letter) {
    let alphabet = getKeywordAlphabet(key, letter);
    return monoDecryptSpaces(text, alphabet);
}

/**
 * This function encrypts a string of text with a binary cipher
 * given a string of text, and a key (in binary)
 * @param {String} text input pain text
 * @param {String} key binary encryption key
 * @returns {String} encrypted text in hexadecimal form
 */
function binaryEncrypt(text, key) {
    let binaryText = textToBinary(text);
    let encryptedBinaryText = addKey(binaryText, key);
    return binToHex(encryptedBinaryText);
}

/**
 * This function converts a string of text into binary and returns
 * it in the form of a string
 * @param {String} text input string of text
 * @returns {String} output binary text
 */
function textToBinary(text) {
/**
    text = cleanTextCaseSensative(text);
*/  
    let binaryText = "";
    for(let i = 0; i < text.length; i++) {
        let letterCode = text.charCodeAt(i);
        let letterBinaryStr = letterCode.toString(2);
        letterBinaryStr = "00000000".substr(letterBinaryStr.length) + letterBinaryStr;
        binaryText = binaryText.concat(letterBinaryStr);
    }
    return spaceText(binaryText, 8);  
}

/**
 * This function converts a binary string of text to normal text
 * @param {String} binaryText binary text
 * @returns {String} output normal text
 */
function binToText(binaryText) {
    binaryText = removeSpaces(binaryText);
    let result = "";
    for(let i = 0; i < binaryText.length / 8; i++) {
        let letterBinaryStr = binaryText.substr(i * 8, 8);
        let letterCode = parseInt(letterBinaryStr, 2);
        let ch = String.fromCharCode(letterCode);
        result = result.concat(ch);
    }
/**    
    return spaceText(result, 5);
*/ 
    return result
}

/**
 * This function adds a key (XOR operator) to a binary string of
 * text and returns the result as a string
 * @param {String} binaryText input binary text
 * @param {String} key binary encryption key
 * @returns {String} resulting binary ciphertext
 */
function addKey(binaryText, key) {
    binaryText = removeSpaces(binaryText);
    key = removeSpaces(key);
    let keyLength = binaryText.length;
    let extendedKey = "";
    for(let i = 0; i < keyLength; i++) {
        extendedKey = extendedKey.concat(key[i % key.length]);
    }
    let resultBinary = "";
    for(let i = 0; i < binaryText.length; i++) {
        let bit1Str = binaryText.charAt(i);
        let bit2Str = extendedKey.charAt(i);
        let bit1 = parseInt(bit1Str, 2);
        let bit2 = parseInt(bit2Str, 2);
        let sumBit = (bit1 ^ bit2).toString(2);
        resultBinary = resultBinary.concat(sumBit);
    }
    return spaceText(resultBinary, 8);
}

/**
 * This function converts a binary string of text into hexadecimal
 * form
 * @param {String} binaryText input binary text
 * @returns {String} hexadecimal form of the text
 */
function binToHex(binaryText) {
    binaryText = removeSpaces(binaryText);
    let result = "";
    for(let i = 0; i < binaryText.length / 4; i++) {
        let nibble = binaryText.substr(i * 4, 4);
        let n = parseInt(nibble, 2);
        result = result.concat(n.toString(16));
    }
    return spaceText(result, 5);
}

/**
 * This function converts a hex string of text into binary
 * form
 * @param {String} hexText input hex text
 * @returns {String} binary form of the text
 */
function hexToBin(hexText) {
    hexText = removeSpaces(hexText);
    let result = "";
    for(let i = 0; i < hexText.length; i++) {
        let c = hexText.charAt(i);
        let n = parseInt(c, 16);
        let letterBinaryStr = n.toString(2);
        letterBinaryStr = "0000".substr(letterBinaryStr.length) + letterBinaryStr;
        result = result.concat(letterBinaryStr);
    }
    return spaceText(result, 8);
}

/**
 * This function decrypts a string of ciphertext with a binary cipher
 * given the ciphertext, and a key (in binary)
 * @param {String} text input ciphertext
 * @param {String} key binary key
 * @returns {String} decrypted text (cases are preserved)
 */
function binaryDecrypt(text, key) {
    let binaryCipherText = "";
    text = removeSpaces(text);
    for(let i = 0; i < text.length; i++) {
        let c = text.charAt(i);
        let n = parseInt(c, 16);
        let letterBinaryStr = n.toString(2);
        letterBinaryStr = "0000".substr(letterBinaryStr.length) + letterBinaryStr;
        binaryCipherText = binaryCipherText.concat(letterBinaryStr);
    }
    let keyLength = text.length * 4;
    let extendedKey = "";
    for(let i = 0; i < keyLength; i++) {
        extendedKey = extendedKey.concat(key[i % key.length]);
    }
    let decryptedTextBinary = "";
    for(let i = 0; i < keyLength; i++) {
        let bit1 = binaryCipherText.charAt(i);
        let bit2 = extendedKey.charAt(i);
        let sumBit = "";
        if(bit1 == "0") {
            sumBit = bit2;
        } else if(bit1 == "1") {
            if(bit2 == "0") sumBit = "1";
            else {
                sumBit = "0";
            }
        }
        decryptedTextBinary = decryptedTextBinary.concat(sumBit);
    }
    let leadingZeroes = "";
    for(let i = 0; i < text.length * 4; i++) {
        leadingZeroes = leadingZeroes.concat("0");
    }
    decryptedTextBinary = leadingZeroes.substr(decryptedTextBinary.length) + decryptedTextBinary;
    let result = "";
    for(let i = 0; i < text.length / 2; i++) {
        let letterBinary = decryptedTextBinary.substr(i * 8, 8);
        let letterValue = parseInt(letterBinary, 2);
        result = result.concat(String.fromCharCode(letterValue));
    }
    return result;
}

/**
 * Performs a Hill cipher on a string of text given a 2x2 matrix
 * as a key
 * @param {String} text 
 * @param {Array<Number>} mat2 array storing 2x2 matrix
 * @returns {String} encrypted text
 */
function hillCipher(text, mat2) {
    text = cleanText(text);
    if(text.length % 2 == 1) {
        text += "q";
    }
    let a = mat2[0];
    let b = mat2[1];
    let c = mat2[2];
    let d = mat2[3];
    if(a * d - b * c == 0) console.log("Matrix is not invertible!");
    txtNums = textToNum(text);
    let resultNums = [];
    for(let i = 0; i < txtNums.length - 1; i += 2) {
        let m = txtNums[i];
        let n = txtNums[i + 1];
        let h = (a * m + b * n);
        let k = (c * m + d * n);
        while(h < 0) h += 26;
        while(k < 0) k += 26;
        h %= 26;
        k %= 26;
        resultNums.push(h, k);
    }
    let result = numToText(resultNums, true);
    return spaceText(result, 4);
}

/**
 * Performs a decryption for a Hill cipher on a string of text given a 2x2 matrix
 * as a key
 * @param {String} text 
 * @param {Array<Number>} mat2 array storing 2x2 matrix
 * @returns {String} encrypted text
 */
function hillDeCipher(text, mat2) {
    let det = mat2[0] * mat2[3] - mat2[1] * mat2[2];
    let matinv = [];
    let detInv = multInverseModn(det,26);
    matinv[0] = mod(detInv*mat2[3],26);
    matinv[1] = mod((-1)*detInv*mat2[1],26);
    matinv[2] = mod((-1)*detInv*mat2[2],26);
    matinv[3] = mod(detInv*mat2[0],26);
    return hillCipher(text, matinv);
}

/**
 * Converts a string of text into a list of numbers by grouping
 * characters into groups of 4, filling in 0's in front of single
 * digits
 * @param {String} message input plaintext
 * @returns {Array<Number>} list of numbers
 */
function phTxtNums(message) {
    message = cleanText(message);
    let nExtraCharacters = (4 - (message.length % 4)) % 4;
    for(let i = 0; i < nExtraCharacters; i++) {
        message += "Q";
    }
    let nums = textToNum(message);
    let groupedNumStrs = [];
    for(let i = 0; i < message.length; i += 4) {
        let str = "";
        for(let j = 0; j < 4; j++) {
            let n = nums[i + j];
            if(n < 10) str += ("0" + n.toString());
            else str += n.toString();
        }
        groupedNumStrs.push(str);
    }
    let groupedNums = [];
    for(let i = 0; i < groupedNumStrs.length; i++) {
        groupedNums.push(parseInt(groupedNumStrs[i]));
    }
    return groupedNums;
}

/**
 * Converts a list of numbers into characters by splitting
 * each number into 4 sections, getting a single character from
 * each section
 * @param {Array<Number>} nums input list of numbers
 * @returns {String} resulting string
 */
function phNumsTxt(nums) {
    let result = "";
    for(let i = 0; i < nums.length; i++) {
        let n = nums[i];
        let numStr = n.toString();
        if(numStr.length < 8) {
            numStr = "0" + numStr;
        }
        for(let j = 0; j < 4; j++) {
            let charNumStr = numStr.substr(j * 2, 2);
            let charNum = parseInt(charNumStr);
            charNum %= 26;
            let ch = charNum + 64;
            result += String.fromCharCode(ch);
        }
    }
    return spaceText(result,4);
}

/**
 * Converts a string of text into a list of numbers by grouping
 * characters into groups of 4, converting characters to ASCII codes filling in 0's in front of single
 * digits
 * @param {String} message input plaintext
 * @returns {Array<Number>} list of numbers
 */


function phTxtNumsAscii(message) {
    let nExtraCharacters = (4 - (message.length % 4)) % 4;
    for(let i = 0; i < nExtraCharacters; i++) {
        message += "Q";
    }
    let nums = textToNumAscii(message);
    let groupedNumStrs = [];
    for(let i = 0; i < message.length; i += 4) {
        let str = "";
        for(let j = 0; j < 4; j++) {
            let n = nums[i + j];
            if(n < 10) str += ("00" + n.toString());
            else 
              if(n < 100) str += ("0" + n.toString());
              else str += n.toString();
        }
        groupedNumStrs.push(str);
    }
    let groupedNums = [];
    for(let i = 0; i < groupedNumStrs.length; i++) {
        groupedNums.push(parseInt(groupedNumStrs[i]));
    }
    return groupedNums;
}

/**
 * Converts a string into a list of ASCII code numbers
 * @param {String} str string
 * @returns {Array<Number>} resulting list of numbers
 */

function textToNumAscii(str) {
    let result = [];
    for(let i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}



/**
 * Converts a list of numbers into characters by splitting
 * each number into 4 sections, getting a single ASCII character from
 * each section
 * @param {Array<Number>} nums input list of numbers
 * @returns {String} resulting string
 */

function phNumsTxtAscii(nums) {
    let result = "";
    for(let i = 0; i < nums.length; i++) {
        let n = nums[i];
        let numStr = n.toString();
        if(numStr.length < 12) {
          if(numStr.length < 11) {
            numStr = "00" + numStr;
          } else
            numStr = "0" + numStr;
        }
        for(let j = 0; j < 4; j++) {
            let charNumStr = numStr.substr(j * 3, 3);
            let charNum = parseInt(charNumStr);
            result += String.fromCharCode(charNum);
        }
    }
    return (result);
}






/**
 * For each number in the list of numbers, this function calculates
 * list[i]^t mod n, returning it as a separate list
 * @param {Array<Number>} nums 
 * @param {Number} t 
 * @param {Number} n 
 * @returns {Array<Number>} resulting list of numbers
 */
function phExponentiate(nums, t, n) {
    let resultNums = [];
    for(let i = 0; i < nums.length; i++) {
        let result = successiveSquare(nums[i], t, n);
        resultNums.push(result);
    }
    return resultNums;
}

/**
 * This function generates a random integer between two given numbers,
 * both inclusive
 * @param {Number} min smallest possible value
 * @param {Number} max largest possible value
 */
function rng(min, max) {
    return parseInt((Math.random() * (max - (min - 1))) + min)
}

/**
 * This function computes the gcd of 2 integers recursively using
 * Euler's algorithm
 * @param {Number} a 
 * @param {Number} b 
 */
function gcd(a, b) {
    if(a == 0) return b;
    return gcd(b % a, a);
}

/**
 * This function computes the gcd of a list of integers 
 * @param {Array<Number>} x 
 */
function gcdList(x) {
    let g = gcd(x[0],x[1]);
    for(let i = 2; i < x.length; i++){
      g = gcd(g,x[i])
    }
    return(g);
  }

  


/**
 * This function computes the gcd of 2 integers, a and b, along with
 * 2 integers, x and y, such that ax + by = gcd(a, b) using Euler's
 * extended algorithm
 * @param {Number} a 
 * @param {Number} b 
 */
function extendedGcd(a, b) {
    if(a == 0) return [b, 0, 1];

    let list = extendedGcd(b % a, a);

    let x = list[2] - (Math.floor(b / a)) * list[1];
    let y = list[1];

    return [list[0], x, y];
}

/**
 * Given large numbers a, k, and n, this function computes
 * a^k modulus n using the successive squaring method
 * @param {Number} a base 
 * @param {Number} k exponent
 * @param {Number} n modulus
 * @return {Number} a^k modulus n
 */
/**
 * function successiveSquare(a, k, n) {
    let largest2Pow = 1;
    while(largest2Pow < k) largest2Pow *= 2;
    largest2Pow /= 2;

    let powerTable = {};

    for(let i = 1; i <= largest2Pow; i *= 2) {
        if(i == 1) {
            powerTable[i] = BigInt(a);
        } else {
            const base = BigInt(powerTable[i / 2]);
            let result = (base ** 2n) % BigInt(n);
            powerTable[i] = result;
        }
    }
    
    let exponent = k;
    let pow = largest2Pow;
    let powers = [];
    while(pow > 0) {
        powers.push(pow);
        exponent -= pow;
        while(pow > exponent) {
            pow /= 2;
        }
    }
    let result = 1n;
    for(let i = 0; i < powers.length; i++) {
        exponent = powers[i];
        result *= powerTable[exponent];
        result %= BigInt(n);
    }
    return result;
}
*/

function successiveSquare(a, k, n) {
    let largest2Pow = 1n;
    while(largest2Pow < k) largest2Pow *= 2n;
    largest2Pow /= 2n;
    
    let powerTable = {};
    for(let i = 1n; i <= largest2Pow; i *= 2n) {
        if(i == 1) {
            powerTable[i] = BigInt(a);
        } else {
            const base = BigInt(powerTable[i / 2n]);
            let result = (base ** 2n) % BigInt(n);
            powerTable[i] = result;
        }
    }
        let exponent = BigInt(k);
    let pow = largest2Pow;
    let powers = [];
    while(pow > 0) {
        powers.push(pow);
        exponent -= pow;
        while(pow > exponent) {
            pow /= 2n;
        }
    }
    let result = 1n;
    for(let i = 0; i < powers.length; i++) {
        exponent = powers[i];
        result *= powerTable[exponent];
        result %= BigInt(n);
    }
    return result;
}


/**
 * This function generates a key for a binary cipher given a prime
 * number, an exponent, and a length
 * @param {Number} p input prime
 * @param {Number} s exponent
 * @param {Number} m length
 * @return {String} binary key
 */
function generateBinaryOneTimePad(p, s, m) {
    let key = "";
    for(let t = s; t < s + m; t++) {
        let bit = Number(successiveSquare(2, t, p) % BigInt(2));
        key = key.concat(bit);
    }
    return spaceText(key, 8);
}

/**
 * Given an integer, n, this function returns the next prime number
 * found after n. If n itself is prime, the following prime number
 * will be returned.
 * @param {Number} n input integer 
 */
function findNextPrime(n) {
    let found = false;
    while(!found) {
        n++;
        if(isPrime(n)) {
            found = true;
        }
    }
    return n;
}

/**
 * Given a Big integer, n, this function returns the next prime number
 * found after n. If n itself is prime, the following prime number
 * will be returned.
 * @param {Big Integr} n input integer 
 */

function findNextPrimeBig(n) {
    let found = false;
    while(!found) {
        n++;
        if(isPrimeBig(n)) {
            found = true;
        }
    }
    return n;
}





/**
 * This function determines whether or not a given positive whole
 * number is prime (not 100% effective, tests primes with number
 * theory based predictions for large number efficiency)
 * @param {Number} n input number
 * @return {Boolean} true if prime, false if not
 */
function isPrime(n) {
    let s = n - 1;
    let r = 0;
    while(s % 2 == 0) {
        r++;
        s = s/2;
    }
    let result = false;
    let a = 2;
    if(successiveSquare(a, s, n) == 1) result = true;
    for(let i = 0; i < r; i++) {
        if(successiveSquare(a, (2**i) * s, n) == n - 1) result = true;
    }
    a = 3;
    if(successiveSquare(a, s, n) == 1) result = true;
    for(let i = 0; i < r; i++) {
        if(successiveSquare(a, (2**i) * s, n) == n - 1) result = true;
    }

    return result;
}

/**
 * This function determines whether or not a given Big Integer is prime (not 100% effective, tests primes with number
 * theory based predictions for large number efficiency)
 * @param {Big Integer} n input number
 * @return {Boolean} true if prime, false if not
 */
function isPrimeBig(n) {
    let s = n - 1n;
    let r = 0;
    while(s % 2n == 0) {
        r++;
        s = s/2n;
    }
    let result = false;
    let a = 2n;
    if(successiveSquare(a, s, n) == 1n) result = true;
    for(let i = 0; i < r; i++) {
        if(successiveSquare(a, (BigInt(2**i)) * s, n) == n - 1n) result = true;
    }
    a = 3;
    if(successiveSquare(a, s, n) == 1) result = true;
    for(let i = 0; i < r; i++) {
        if(successiveSquare(a, (BigInt(2**i)) * s, n) == n - 1n) result = true;
    }

    return result;
}


/**
 * This function returns the multiplicative inverse of a mod n. If gcd(a,n) is not 1, warning that a is not invertible is returned.
 * @param {Number} a input number
 * @param {Number} n input number
 */
 function multInverseModn(a,n) {
    let result = "The number is not invertible.";
    let g = extendedGcd(mod(a,n), n);
    if(g[0] == 1) {
        let inverse = extendedGcd(a, n)[1];
        if(inverse < 0) inverse += n;
        inverse %= n;
        result= inverse;
    }
    return result
 }

 function discreteLogarithm(a, b, n){
    let possibleKeys=[];
    for (let i = 2; i < n; i++){
      if (successiveSquare(a,i,n)== b){
        possibleKeys.push(i)
      }
    }
    return possibleKeys;
}

function discreteLogarithmOneAnswer(a, b, n){
    let k = 1;
    let x = a;
    let result = "No such exponent exists";
    while ((k < n) && (x !=b)){
        k++;
        x = (a*x)% n;
        };
    if (k < n ){
        result = k
        };
    return result
}



/**
 * This function computes the gcd of 2  Big Integers recursively using
 * Euler's algorithm
 * @param {BigInteger} a 
 * @param {BigInteger} b 
 */
 function gcdBig(a, b) {
    if(a == 0) return b;
    return gcdBig(b % a, a);
}


/**
 * This function returns the extended GCD of a and b using Big Integers. The inputs must be Big Integers.
 * @param {BigInt} a input number
 * @param {BigInt} b input number
 */

function extendedGcdBig(a, b) {
    if(a == 0) return [b, BigInt(0), BigInt(1)];

    let list = extendedGcdBig(b % a, a);

    let x = list[2] - ((b-(b % a))/a) * list[1];
    let y = list[1];

    return [list[0], x, y];
}

/**
 * This function returns the multiplicative inverse of a mod n using Big Integers. The inputs must be Big Integers. If gcd(a,n) is not 1, warning that a is not invertible is returned.
 * @param {BigInt} a input number
 * @param {BigInt} n input number
 */

 function multInverseModnBig(a,n) {
    let result = "The number is not invertible.";
    let g = extendedGcdBig(a, n);
    if(g[0] == 1) {
        let inverse = extendedGcdBig(a, n)[1];
        if(inverse < 0) inverse += n;
        inverse %= n;
        result= inverse;
    }
    return result
 }

/**
 * This function returns floor value of the square root of a Big Integer.
 * @param {BigInt} value input number
 */

 function sqrt(value) {
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}


/**
 * This function returns the list of factors of  a Big Integer.
 * @param {BigInt} n input number
 */

function factor(n){
    let result = [];
    let factor = 2n;
    let number = BigInt(n);
    while (factor <= sqrt(number))
    if (number % factor == 0n) {
      result.push(factor);
      number = number / factor;
    } else {
    factor++};
    if ( number > 1 ) result.push(number);
    return(result)
}

/**
 * This function returns the smallest prime factor of a Big Integer.
 * @param {BigInt} n input number
 */


function primeFactor(n){
    let number = BigInt(n);
    let factor = BigInt(2);
    while ((factor <= sqrt(number)) && (number % factor != 0)){
      factor++
    }
    if ((number % factor) == 0) {
      return(factor)
      } else {return(number)
      }
}

/**
 * Returns a mod n (fixes issues with negatives)

 */

 function mod(a,n){
    return(((a%n)+n)%n);
  }

/**
 * 
 * Hill Cryptanalysis

 */

function modSolve(x,y){
    let solutions = [];
    for (i = 0; i < 26; i++){
    if ( (mod((i*x),26)) == (mod(y,26)) ) 
      solutions.push(i);
    }
    return (solutions);
  }
  
  function matrixSolve(a,b,c,d,y,z){
    let det = a*d - b*c;
    let result = [];
    let m = modSolve(det, d*y-b*z);
    let n = modSolve(det, (-c)*y+a*z);
    for (i = 0; i < m.length; i++)
    {
      for (j =0; j < n.length; j++){
        if ( 
          ( mod((a*m[i]+b*n[j]),26) == (mod(y,26))) && 
          ( mod((c*m[i]+d*n[j]),26) == (mod(z,26)))
          )
        result.push([m[i],n[j]])
      }
    }
    
    return result;
  }
  
  function hillCrib(p,c){
   let plain = textToNum(p);
   let cipher = textToNum(c);
   let row1 = matrixSolve(plain[0],plain[1],plain[2],plain[3],cipher[0],cipher[2]);
   let row2 = matrixSolve(plain[0],plain[1],plain[2],plain[3],cipher[1],cipher[3]);
   return ([row1,row2]);
  }
  