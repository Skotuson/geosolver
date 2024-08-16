
class Parser {
    constructor(str) {
        this.lexer = new Lexer(str)
        this.north = "";
        this.east = "";
    }

    match(token) {
        if (this.lexer.peek() != token) {
            throw new Error("Malformed coordinates");
        }
        this.lexer.get();
    }

    Start() {
        switch (this.lexer.peek()) {
            case TOK_NORTH:
                /* rule 1: Start -> n Exprs ° Exprs , Exprs ' e Exprs ° Exprs , Exprs ' */
                this.match(TOK_NORTH);
                this.Exprs();
                this.match(TOK_DEGREE);
                this.Exprs();
                this.match(TOK_FLOATING);
                this.Exprs();
                this.match(TOK_MINUTE);
                this.match(TOK_EAST);
                this.Exprs();
                this.match(TOK_DEGREE);
                this.Exprs();
                this.match(TOK_FLOATING);
                this.Exprs();
                this.match(TOK_MINUTE);
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Exprs() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 2: Exprs -> Expr2 Exprs */
                this.Expr2();
                this.Exprs();
                break;
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
                /* rule 3: Exprs ->  */
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Expr2() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 4: Expr2 -> Expr1 Expr2R */
                this.Expr1();
                this.Expr2R();
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Expr2R() { }

    Expr1() { }

    Expr1R() { }

    Expr() { }
}