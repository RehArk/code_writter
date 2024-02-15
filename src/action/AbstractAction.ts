import { CodeWritter } from "../CodeWritter";
import { Update } from "../code_element/Update";
import { PhpCodeFormatter } from "../formater/PhpCodeFormater";

export class AbstractAction {

    public getStep(update : Update) : number {
        return 1;
    }

    public getDuration(code_writter : CodeWritter, update : Update) : number {
        return this.getStep(update) * code_writter.getWritingDelai();
    }

    public exec(code_writter : CodeWritter, line : number) : void {
        throw "Not implemented yet !";
    }

    protected getCodeContainer(code_writter : CodeWritter, line: number) : Element {
        return code_writter.getCodeContainerLine(line);
    }

    protected rebuildCode(code_writter : CodeWritter) : void {
        code_writter.displayCode();
    }

    protected replaceCode(line_elem, code : string) : void {
        const code_formatter = new PhpCodeFormatter();
        line_elem.innerHTML = code_formatter.addSyntaxColoration(code);
    }

}