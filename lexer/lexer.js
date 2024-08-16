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

//TODO: hashmap for symbol tokens

class Lexer {
    constructor(str) {
        this.str = str;
        this.idx = 0;
        this.tok = "";
        // Geographic coordinate system, used to distinguish between N a E letters of 
        // latitutde and longtitude and coordinate variables.
        this.gcs = true;
    }

    get() {
        if (this.str[this.idx] == 'N' && this.gcs) {
            this.gcs = false;
            this.tok = TOK_NORTH;
        }

        else if (this.str[this.idx] == 'E' && this.gcs) {
            this.gcs = false;
            this.tok = TOK_EAST;
        }

        else if (this.str[this.idx] == '°') {
            this.tok = TOK_DEGREE;
        }

        else if (this.str[this.idx] == '\'') {
            this.gcs = true;
            this.tok = TOK_MINUTE;
        }

        else if (this.str[this.idx] == '+') {
            this.tok = TOK_PLUS;
        }

        else if (this.str[this.idx] == '-') {
            this.tok = TOK_MINUS;
        }

        else if (this.str[this.idx] == '*') {
            this.tok = TOK_MULTIPLICATION;
        }

        else if (this.str[this.idx] == '/') {
            this.tok = TOK_DIVISION;
        }

        else if (this.str[this.idx] == '(') {
            this.tok = TOK_LPAR;
        }

        else if (this.str[this.idx] == ')') {
            this.tok = TOK_RPAR;
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

export default Lexer;