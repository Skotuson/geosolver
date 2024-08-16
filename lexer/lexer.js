const TOK_NORTH = -1;
const TOK_EAST = -2;
const TOK_DEGREE = -3;
const TOK_NUMBER = -4;
const TOK_PLUS = -5;
const TOK_MINUS = -6;
const TOK_MULTIPLICATION = -7;
const TOK_DIVISION = -8;
const TOK_LPAR = -9;
const TOK_RPAR = -10;
const TOK_MINUTE = -11;
const TOK_EOF = -12;
const TOK_UNDEFINED = - 13;
const TOK_FLOATING = -14;

let TOKENS = new Map();
TOKENS.set('°', TOK_DEGREE);
TOKENS.set('+', TOK_PLUS);
TOKENS.set('-', TOK_MINUS);
TOKENS.set('*', TOK_MULTIPLICATION);
TOKENS.set('/', TOK_DIVISION);
TOKENS.set('(', TOK_LPAR);
TOKENS.set(')', TOK_RPAR);
TOKENS.set('\'', TOK_MINUTE);
TOKENS.set('.', TOK_FLOATING);
TOKENS.set(',', TOK_FLOATING);

let SYMBOLS = new Map(Array.from(TOKENS, el => el.reverse()))

class Lexer {
    constructor(str) {
        this.str = str;
        this.idx = 0;
        this.val = 0;
        this.tok = "";
        // Geographic coordinate system, used to distinguish between N a E letters of 
        // latitutde and longtitude and coordinate variables.
        this.gcs = true;
    }

    number() {
        return this.val;
    }

    lexNumber() {
        let char = this.str[this.idx];
        this.val = 0;
        while(!isNaN(char)){
            this.val *= 10;
            this.val += Number.parseInt(char);
            char = this.str[++this.idx];
        }
        return TOK_NUMBER;
    }

    get() {
        let front = this.str[this.idx];

        while(/\s/.test(front)) {
            front = this.str[++this.idx];
        }

        if (front == 'N' && this.gcs) {
            this.gcs = false;
            this.tok = TOK_NORTH;
        }

        else if (front == 'E' && this.gcs) {
            this.gcs = false;
            this.tok = TOK_EAST;
        }

        else if (!isNaN(front)) {
            return this.tok = this.lexNumber();
        }

        else if (TOKENS.has(front)) {
            this.tok = TOKENS.get(front);
            if(TOKENS.get(front) == TOK_MINUTE) {
                this.gcs = true;
            }
        }

        // Whole input has been lexed
        else if (this.idx == this.str.length) {
            this.tok = TOK_EOF;
        }

        else {
            this.tok = TOK_UNDEFINED;
        }

        this.idx++;
        return this.tok;
    }

    peek() {
        return this.tok;
    }
}

// Simple console asserts
let lexerCorrect = new Lexer("N 50°40.(1555-1037)' E 15° 43.(1604-924)'");
console.assert(lexerCorrect.get() == TOK_NORTH)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 50)
console.assert(lexerCorrect.get() == TOK_DEGREE)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 40)
console.assert(lexerCorrect.get() == TOK_FLOATING)
console.assert(lexerCorrect.get() == TOK_LPAR)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 1555)
console.assert(lexerCorrect.get() == TOK_MINUS)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 1037)
console.assert(lexerCorrect.get() == TOK_RPAR)
console.assert(lexerCorrect.get() == TOK_MINUTE)
console.assert(lexerCorrect.get() == TOK_EAST)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 15)
console.assert(lexerCorrect.get() == TOK_DEGREE)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 43)
console.assert(lexerCorrect.get() == TOK_FLOATING)
console.assert(lexerCorrect.get() == TOK_LPAR)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 1604)
console.assert(lexerCorrect.get() == TOK_MINUS)
console.assert(lexerCorrect.get() == TOK_NUMBER && lexerCorrect.number() == 924)
console.assert(lexerCorrect.get() == TOK_RPAR)
console.assert(lexerCorrect.get() == TOK_MINUTE)
console.assert(lexerCorrect.get() == TOK_EOF)

let lexerUndefined = new Lexer("N49°32,(5-D)(2)(13+0H)'E15°21,(F-1)(D)(16-13)'");
console.assert(lexerUndefined.get() == TOK_NORTH)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 49)
console.assert(lexerUndefined.get() == TOK_DEGREE)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 32)
console.assert(lexerUndefined.get() == TOK_FLOATING)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 5)
console.assert(lexerUndefined.get() == TOK_MINUS)
console.assert(lexerUndefined.get() == TOK_UNDEFINED)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 2)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 13)
console.assert(lexerUndefined.get() == TOK_PLUS)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 0)
console.assert(lexerUndefined.get() == TOK_UNDEFINED)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_MINUTE)
console.assert(lexerUndefined.get() == TOK_EAST)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 15)
console.assert(lexerUndefined.get() == TOK_DEGREE)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 21)
console.assert(lexerUndefined.get() == TOK_FLOATING)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_UNDEFINED)
console.assert(lexerUndefined.get() == TOK_MINUS)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 1)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_UNDEFINED)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_LPAR)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 16)
console.assert(lexerUndefined.get() == TOK_MINUS)
console.assert(lexerUndefined.get() == TOK_NUMBER && lexerUndefined.number() == 13)
console.assert(lexerUndefined.get() == TOK_RPAR)
console.assert(lexerUndefined.get() == TOK_MINUTE)
console.assert(lexerUndefined.get() == TOK_EOF)