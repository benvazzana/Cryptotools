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
    return numToText(nums, true);
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
        else if(op == '%') nums[i] %= scale;
    }
}

/**
 * This function cleans a String of text by deleting any non-letter
 * characters, and changing each character to a capital letter.
 * @param {String} text input String of text
 * @returns {String} cleaned String of text
 */
function cleanText(text) {
    text = text.toUpperCase();
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if(c > 64 && c < 91) {
            result = result.concat(text.charAt(i));
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