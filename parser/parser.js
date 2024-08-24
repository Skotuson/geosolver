// 7 6 6 3 5 9 4 2
class Parser {
    constructor(str) {
        this.lexer = new Lexer(str)
        this.coords = "";
        this.latitude = "";
        this.longtitude = "";
        this.latitude_decimal = "";
        this.longtitude_decimal = "";
        this.north = true;
        this.dec = false;
        this.dec = false;
    }

    match(token) {
        if (this.lexer.peek() != token) {
            throw new Error("Malformed coordinates");
        }
        this.lexer.get();
    }

    Start() {
        // Kickstart the lexer
        this.lexer.get();
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
            case TOK_DEGREE:
                /* rule 1: Start -> n Exprs ° Exprs , Exprs ' e Exprs ° Exprs , Exprs ' */
                this.coords += "N";
                this.Exprs();
        
                this.match(TOK_DEGREE);
                this.coords += SYMBOLS.get(TOK_DEGREE);
                this.dec = true;
                this.Exprs();

                this.match(TOK_FLOATING);
                this.coords += '.';
                this.latitude_decimal += ".";
                this.Exprs();

                this.match(TOK_MINUTE);
                this.coords += SYMBOLS.get(TOK_MINUTE) + " ";

                this.coords += "E";
                this.north = false;
                this.dec = false;
                this.Exprs();

                this.match(TOK_DEGREE);
                this.coords += SYMBOLS.get(TOK_DEGREE);
                this.dec = true;
                this.Exprs();

                this.match(TOK_FLOATING);
                this.coords += '.';
                this.longtitude_decimal += ".";
                this.Exprs();

                this.match(TOK_MINUTE);
                this.coords += SYMBOLS.get(TOK_MINUTE);
                break;
            case TOK_EOF:
                break;
            default:
                console.log(this.lexer.peek())
                throw new Error("Start Parsing error");
        }
    }

    Exprs() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 2: Exprs -> Expr2 Exprs */
                let val = this.Expr2();
                this.coords += val;
                console.log(val);
                
                if (this.north && !this.dec) {
                    this.latitude += val;
                }

                else if (this.north && this.dec) {
                    this.latitude_decimal += val;
                }

                else if (!this.north && !this.dec) {
                    this.longtitude += val;
                }

                else if (!this.north && this.dec) {
                    this.longtitude_decimal += val;
                }

                return this.Exprs();
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
                /* rule 3: Exprs ->  */
                return "";
            default:
                console.log(this.lexer.peek())
                throw new Error("Exprs Parsing error");
        }
    }

    Expr2() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 4: Expr2 -> Expr1 Expr2R */
                return this.Expr2R(this.Expr1());
            default:
                console.log(this.lexer.peek())
                throw new Error("Expr2 Parsing error");
        }
    }

    Expr2R(lhs) {
        switch (this.lexer.peek()) {
            case TOK_PLUS:
                /* rule 5: Expr2R -> + Expr1 Expr2R */
                this.match(TOK_PLUS);
                return lhs + this.Expr1R(this.Expr());
            case TOK_MINUS:
                /* rule 6: Expr2R -> - Expr1 Expr2R */
                this.match(TOK_MINUS);
                return lhs - this.Expr1R(this.Expr());
            case TOK_NUMBER:
            case TOK_LPAR:
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
            case TOK_RPAR:
                /* rule 7: Expr2R ->  */
                return lhs;
            default:
                console.log(this.lexer.peek())
                throw new Error("Expr2R Parsing error");
        }
    }

    Expr1() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 8: Expr1 -> Expr Expr1R */
                return this.Expr1R(this.Expr());
            default:
                console.log(this.lexer.peek())
                throw new Error("Expr1 Parsing error");
        }
    }

    Expr1R(lhs) {
        switch (this.lexer.peek()) {
            case TOK_MULTIPLICATION:
                /* rule 9: Expr1R -> * Expr Expr1R */
                this.match(TOK_MULTIPLICATION);
                return lhs * this.Expr1R(this.Expr());
            case TOK_DIVISION:
                /* rule 10: Expr1R -> / Expr Expr1R */
                this.lexer(TOK_DIVISION);
                return lhs / this.Expr1R(this.Expr());
            case TOK_PLUS:
            case TOK_MINUS:
            case TOK_NUMBER:
            case TOK_LPAR:
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
            case TOK_RPAR:
                /* rule 11: Expr1R ->  */
                return lhs;
            default:
                console.log(this.lexer.peek())
                throw new Error("Expr1R Parsing error");
        }
    }

    Expr() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
                /* rule 12: Expr -> number */
                let value = this.lexer.number();
                this.match(TOK_NUMBER);
                return Number.parseInt(value);
            case TOK_LPAR:
                /* rule 13: Expr -> ( Expr2 ) */
                this.match(TOK_LPAR);
                let result = this.Expr2();
                this.match(TOK_RPAR);
                return result;
            default:
                console.log(this.lexer.peek())
                throw new Error("Expr Parsing error");
        }
    }
}