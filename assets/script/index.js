/***********************************************/
var pwd = ""; 
var pwdLength;
var pwdMinLength = 8; 
var pwdMaxLength = 128; 
var upperCaseChar;
var upperCasePos; 
var lowerCaseChar;
var lowerCasePos;
var specChar;
var specCharPos;
var numChar;
var numCharPos;
var randomType; 
var randomChar; 

/************************************************
 * get a random number within the given range 
 * *********************************************/

function GetRandomNumInRange (myLowerBound, myUpperBound) {

    return Math.floor (Math.random () * (myUpperBound - myLowerBound + 1)) + myLowerBound;

}

/************************************************
 * convert a number to its ASCII character  
 * *********************************************/

function GetChar (myNum) {

    return String.fromCharCode (myNum);

}

function GeneratePwd () {

    /************************************************
     * randomize the length of the password 
     ***********************************************/

    pwd = '';
    pwdLength = GetRandomNumInRange (pwdMinLength, pwdMaxLength); 
    console.log ("pwd length will be " + pwdLength);

    /************************************************
     * force there to be at least one each of upper case, lower case, 
     * a special char and a number 
     ***********************************************/

    upperCaseChar = GetChar (GetRandomNumInRange (65, 90)); 
    upperCasePos = GetRandomNumInRange (1, pwdLength);
    console.log ("upper case " + upperCaseChar + " pos " + upperCasePos);

    /* no dups!! */
    lowerCaseChar = GetChar (GetRandomNumInRange (97, 122));
    lowerCasePos; 
    do {

        lowerCasePos = GetRandomNumInRange (1, pwdLength);
    }
    while  (lowerCasePos === upperCasePos); 
    console.log ("lower case " + lowerCaseChar + " pos " + lowerCasePos);

    specChar = GetChar (GetRandomNumInRange (35, 47));
    specCharPos; 
    do {
        specCharPos = GetRandomNumInRange (1, pwdLength);
    } 
    while (specCharPos === upperCaseChar || specCharPos === lowerCasePos); 
    console.log ("upper case " + specChar + " pos " + specCharPos);

    numChar = GetRandomNumInRange (0, 9); 
    numCharPos; 
    do {
        numCharPos = GetRandomNumInRange (1, pwdLength);
    }
    while (numCharPos === upperCaseChar || numCharPos === lowerCasePos || numCharPos === specCharPos); 
    console.log ("upper case " + numChar + " pos " + numCharPos);

    /************************************************
     * Ive got 4 mandatory characters and a length. Now start building the pwd
     * Use my preassigned values in their positions, otherwise get another random 
     * value 
     ***********************************************/

    for (i=1; i<=pwdLength; i++) {

        switch (i) {
        case upperCasePos: 
            pwd = pwd + upperCaseChar;
            break;
        case lowerCasePos:
            pwd = pwd + lowerCaseChar;    
            break;
        case specCharPos: 
            pwd = pwd + specChar; 
            break;
        case numCharPos: 
            pwd = pwd + numChar.toString (); 
            break;

        /********************************************
         * what do we want in our randomized positions? How 
         * about numbers and characters only? 
         *******************************************/
        default: 

            randomType = GetRandomNumInRange (1, 3); 
            switch (randomType) {
            case 1:  /* upper case */
                randomChar = GetChar (GetRandomNumInRange (65, 90));
                break;
            case 2: /* lower case */
                randomChar = GetChar (GetRandomNumInRange (97, 122));
                break;
            case 3: /* numeric */ 
                randomChar = GetRandomNumInRange (0, 9).toString();
                break; 
            } /* switch randomType */
            pwd = pwd + randomChar;
            
        } /* switch i */  
    } /* for loop i */ 
    console.log (pwd); 
}

function Generate () {
    document.getElementById('pwdText').value = '';
    GeneratePwd();
    document.getElementById('pwdText').value = pwd; 
}
function CopyToClipboard () {
    var ta = document.querySelector ("#pwdText"); 
    ta.select();
    document.execCommand("copy"); 
    alert("copy complete"); 
}

/* **********************************************
*************************************************/
