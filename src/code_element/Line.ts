export class Line {

    private code : string;

    constructor(code : string) {
        this.code = code;
    }

    public getCode() : string {
        return this.code;
    }

    public getDuration(delai : number) : number {
        return delai * this.code.length;
    }

}