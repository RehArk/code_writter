import { CodeWritter } from "../CodeWritter";
import { Line } from "../code_element/Line";
import { Update } from "../code_element/Update";
import { AbstractAction } from "./AbstractAction";

export class ActionReplace extends AbstractAction {

    code : string;

    constructor(code : string) {
        super();
        this.code = code;
    }

    public exec(code_container : CodeWritter, line : number) : void {
        code_container.code!.lines[line] = new Line(this.code);
        const line_elem = code_container.getCodeContainerLine(line);
        this.replaceCode(line_elem, this.code);
    }

    getDuration(code_writter : CodeWritter, update : Update) {
        return this.getStep(update) * code_writter.delai + code_writter.delai;
    }
    
}