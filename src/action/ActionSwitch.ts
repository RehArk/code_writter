import { CodeWritter } from "../CodeWritter";
import { Update } from "../code_element/Update";
import { AbstractAction } from "./AbstractAction";

export class ActionSwitch extends AbstractAction {

    line;

    constructor(line) {
        super();
        this.line = line;
    }

    getStep(update : Update) {

        const line = update.line;
        const switch_line = this.line;

        return Math.abs(line - switch_line) + 1;
    }

    switch_line(code, i, j) {
        let temp = code.lines[i];
        code.lines[i] = code.lines[j];
        code.lines[j] = temp;
    }

    exec(code_writter : CodeWritter, line) : void {

        const switch_line = this.line;
        const delai = code_writter.delai;
        
        if (line < switch_line) {
            for (var i = line; i < switch_line; i++) {
                const prev = i;
                const next = i + 1;
                setTimeout(() => {
                    this.switch_line(code_writter.code, prev, next);
                    this.rebuildCode(code_writter);
                }, i);
            }
        } 
        
        if (line > switch_line) {
            for (var i = line; i > switch_line; i--) {
                const prev = i;
                const next = i - 1;
                setTimeout(() => {
                    this.switch_line(code_writter.code, prev, next);
                    this.rebuildCode(code_writter);
                }, Math.abs(line - i));
            }
        }
        
    }
    
}