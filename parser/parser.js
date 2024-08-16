
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
            case TOK_EOF:
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

    Expr2R() {
        switch (this.lexer.peek()) {
            case TOK_PLUS:
                /* rule 5: Expr2R -> + Expr1 Expr2R */
                this.lexer(TOK_PLUS);
                this.Expr1();
                this.Expr2R();
                break;
            case TOK_MINUS:
                /* rule 6: Expr2R -> - Expr1 Expr2R */
                this.lexer(TOK_MINUS);
                this.Expr1();
                this.Expr2R();
                break;
            case TOK_NUMBER:
            case TOK_LPAR:
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
            case TOK_RPAR:
                /* rule 7: Expr2R ->  */
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Expr1() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
            case TOK_LPAR:
                /* rule 8: Expr1 -> Expr Expr1R */
                this.Expr();
                this.Expr1R();
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Expr1R() {
        switch (this.lexer.peek()) {
            case TOK_MULTIPLICATION:
                /* rule 9: Expr1R -> * Expr Expr1R */
                this.lexer(TOK_MULTIPLICATION);
                this.Expr1();
                this.Expr2R();
                break;
            case TOK_DIVISION:
                /* rule 10: Expr1R -> / Expr Expr1R */
                this.lexer(TOK_DIVISION);
                this.Expr1();
                this.Expr2R();
                break;
            case TOK_PLUS:
            case TOK_MINUS:
            case TOK_NUMBER:
            case TOK_LPAR:
            case TOK_DEGREE:
            case TOK_FLOATING:
            case TOK_MINUTE:
            case TOK_RPAR:
                /* rule 11: Expr1R ->  */
                break;
            default:
                throw new Error("Parsing error");
        }
    }

    Expr() {
        switch (this.lexer.peek()) {
            case TOK_NUMBER:
                /* rule 12: Expr -> number */
                this.lexer.match(TOK_NUMBER);
                break;
            case TOK_LPAR:
                /* rule 13: Expr -> ( Expr2 ) */
                this.lexer(TOK_LPAR);
                this.Expr2();
                this.lexer(TOK_RPAR);
                break;
            default:
                throw new Error("Parsing error");
        }
    }
}