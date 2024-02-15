import { CodeWritter } from "../CodeWritter";
import { AbstractAction } from "../action/AbstractAction";

export class Update {

    line : number;
    action : AbstractAction;

    constructor(line : number, action : AbstractAction) {
        this.line = line;
        this.action = action;
    }

    exec(code_writter : CodeWritter) {
        this.action.exec(code_writter, this.line)
    }

    getDuration(code_writter : CodeWritter) {
        return this.action.getDuration(code_writter, this);
    }

}