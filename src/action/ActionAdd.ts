import { CodeWritter } from "../CodeWritter";
import { Line } from "../code_element/Line";
import { AbstractAction } from "./AbstractAction";

export class ActionAdd extends AbstractAction {

    code : string;

    constructor(code : string) {
        super();
        this.code = code;
    }

    getStep() {
        return this.code.length;
    }
    
    exec(code_writter : CodeWritter, line : number) : void {

        code_writter.code!.lines.splice(line, 0, new Line(""));
        this.rebuildCode(code_writter);

        code_writter.code!.lines[line] = new Line(this.code);
                    
        const line_elem = this.getCodeContainer(code_writter, line);
        code_writter.writeAnimation(line_elem, this.code);
        
    }

}