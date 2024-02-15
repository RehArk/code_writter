import { CodeWritter } from "../CodeWritter";
import { AbstractAction } from "../action/AbstractAction";

export class Update {

    private line : number;
    private action : AbstractAction;

    constructor(line : number, action : AbstractAction) {
        this.line = line;
        this.action = action;
    }

    public exec(code_writter : CodeWritter) : void {
        this.action.exec(code_writter, this.line)
    }

    public getLine() : number {
        return this.line;
    }

    public getDuration(code_writter : CodeWritter) : number {
        return this.action.getDuration(code_writter, this);
    }

}