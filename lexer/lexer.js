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
        
    }

    peek() {

    }
}

export default Lexer;