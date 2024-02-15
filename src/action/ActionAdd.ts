import { CodeWritter } from "../CodeWritter";
import { Line } from "../code_element/Line";
import { AbstractAction } from "./AbstractAction";

export class ActionAdd extends AbstractAction {

    private code : string;

    constructor(code : string) {
        super();
        this.code = code;
    }

    public getStep() : number {
        return this.code.length;
    }
    
    public exec(code_writter : CodeWritter, line : number) : void {

        code_writter.getCode().lines.splice(line, 0, new Line(""));
        this.rebuildCode(code_writter);

        const line_elem = this.getCodeContainer(code_writter, line);
        code_writter.getCode().lines[line] = new Line(this.code);
        code_writter.writeAnimation(line_elem, this.code);
        
    }

}