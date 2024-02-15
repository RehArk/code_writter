import { CodeWritter } from "../CodeWritter";
import { Line } from "./Line";

export class Code {

    public lines : Array<Line>;

    constructor(code : Array<string>) {

        this.lines = [];

        for(let code_line of code) {
            let line = new Line(code_line);
            this.lines.push(line);
        }

    }

    public getDuration(caller : CodeWritter) : number {

        let duration = 0;

        for(let line of this.lines) {
            duration += line.getDuration(caller.getWritingDelai());
        }

        return duration;

    }

}