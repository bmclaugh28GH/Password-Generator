/***********************************************
 * Globals 
/***********************************************/

var pwd = ""; 
var pwdLength;
var pwdMinLength = 8; 
var pwdMaxLength = 128; 

var upperCaseSelected = false; 
var lowerCaseSelected = false; 
var specCharSelected = false; 
var numCharSelected = false; 

/************************************************
 * get a random number within the given range 
 * *********************************************/

function GetRandomNumInRange (myLowerBound, myUpperBound) {

    return Math.floor (Math.random () * (myUpperBound - myLowerBound + 1)) + myLowerBound;

} // GetRandomNumInRange

/************************************************
 * convert an ASCII number to its character  
 * *********************************************/

function GetChar (myNum) {

    return String.fromCharCode (myNum);

} // GetChar

// **********************************************
// Generate a password 
// **********************************************

function GeneratePwd () {

    pwd = '';
    console.log ("pwd length will be " + pwdLength);

    /************************************************
     * Load up the character types the user wants to use. Up to 4.  
     ***********************************************/

    var charTypeList=[]; 
    if (upperCaseSelected===true) {
        charTypeList.push("U");
    }
    if (lowerCaseSelected===true) {
        charTypeList.push("L");
    }
    if (specCharSelected===true) {
        charTypeList.push("S");
    }
    if (numCharSelected===true) {
        charTypeList.push("N");
    }
    console.log (charTypeList); 

    /************************************************
     * Start building the pwd based on user criteria 
     ***********************************************/

    for (i=1; i<=pwdLength; i++) {

        // pick a random character type using the array 
        randomType = GetRandomNumInRange (0, charTypeList.length - 1); 
        //console.log ("cell " + randomType + " value " + charTypeList[randomType]); 

        switch (charTypeList[randomType]) {
        case "U":  /* upper case */
            randomChar = GetChar (GetRandomNumInRange (65, 90));
            break;
        case "L": /* lower case */
            randomChar = GetChar (GetRandomNumInRange (97, 122));
            break;
        case "S": /*special characters */
            randomChar = GetChar (GetRandomNumInRange (35, 47));
            break;
        case "N": /* numeric */ 
            randomChar = GetRandomNumInRange (0, 9).toString();
            break; 
        default: /* ERROR */
            randomChar = "X";
            break; 
        } /* switch randomType */

        pwd = pwd + randomChar;
            
    } /* for loop i */ 

    console.log (pwd); 

} // GeneratePwd

/************************************************
 * called from the button. Do the edits, then Generate()
/***********************************************/

function Generate () {

    document.getElementById('pwdText').value = '';
    pwdLength = document.getElementById('pwdLength').value;

    // ******************************************
    // edits. first the length 
    // ******************************************

    //alert ("selected len " + pwdLength); 
    if (isNaN(pwdLength) === true) { 
        alert ("ERROR! You must enter a length between " + pwdMinLength + " and " + pwdMaxLength);
        return;
    }
    if (pwdLength < pwdMinLength) {
        alert ("ERROR! Password length must exceed " + (pwdMinLength - 1) + " characters");
        return;
    }
    if (pwdLength > pwdMaxLength) {
        alert ("ERROR! Password length must not exceed " + pwdMaxLength + " characters");
        return;
    }

    // ******************************************
    // edits. now the checkboxes 
    // ******************************************
    //var cbx_uc=document.getElementById("cbx_uc");
    //console.log(cbx_uc.checked); 

    upperCaseSelected = document.getElementById("cbx_uc").checked;
    lowerCaseSelected = document.getElementById("cbx_lc").checked;
    specCharSelected = document.getElementById("cbx_sc").checked;
    numCharSelected = document.getElementById("cbx_nc").checked;

    if (upperCaseSelected === false && lowerCaseSelected === false) {
        alert ("ERROR! You must select at least one of upper or lower case characters");
        return;
    }

    // ******************************************
    // all good. generate 
    // ******************************************

    GeneratePwd();
    document.getElementById('pwdText').value = pwd; 

} // Generate

/************************************************
 * copy to clipboard
/***********************************************/

function CopyToClipboard () {

    var ta = document.querySelector ("#pwdText"); 
    ta.select();
    document.execCommand("copy"); 
    alert("copy complete"); 

} // CopyToClipboard

/* **********************************************
*************************************************/
