import { CodeWritter } from "../CodeWritter";
import { Code } from "../code_element/Code";
import { Update } from "../code_element/Update";
import { AbstractAction } from "./AbstractAction";

export class ActionSwitch extends AbstractAction {

    private line : number;

    constructor(line : number) {
        super();
        this.line = line;
    }

    public getStep(update : Update) : number {

        const line = update.getLine();
        const switch_line = this.line;

        return Math.abs(line - switch_line);
    }


    public getDuration(code_writter : CodeWritter, update : Update) : number {
        return this.getStep(update) * code_writter.getActionDelai();
    }

    private switch_line(code : Code, i : number, j : number) : void {
        let temp = code.lines[i];
        code.lines[i] = code.lines[j];
        code.lines[j] = temp;
    }

    public exec(code_writter : CodeWritter, line) : void {

        const switch_line = this.line;
        
        if (line < switch_line) {
            for (var i = line; i < switch_line; i++) {
                const prev = i;
                const next = i + 1;
                setTimeout(() => {
                    this.switch_line(code_writter.getCode(), prev, next);
                    this.rebuildCode(code_writter);
                }, (i - line) * code_writter.getActionDelai());
            }
        } 
        
        if (line > switch_line) {
            for (var i = line; i > switch_line; i--) {
                const prev = i;
                const next = i - 1;
                setTimeout(() => {
                    this.switch_line(code_writter.getCode(), prev, next);
                    this.rebuildCode(code_writter);
                }, Math.abs(line - i) * code_writter.getActionDelai());
            }
        }
        
    }
    
}