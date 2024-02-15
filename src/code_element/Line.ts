export class Line {

    code : string;

    constructor(code : string) {
        this.code = code;
    }

    getDuration(delai : number) : number {
        return delai * this.code.length + delai;
    }

}