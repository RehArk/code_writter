import { CodeWritter } from "../CodeWritter";
import { Update } from "../code_element/Update";
import { PhpCodeFormatter } from "../formater/PhpCodeFormater";

export class AbstractAction {

    getCodeContainer(code_writter : CodeWritter, line: number) {
        return code_writter.getCodeContainerLine(line);
    }

    getStep(update : Update) {
        return 1;
    }

    getDuration(code_writter : CodeWritter, update : Update) {
        return this.getStep(update) * code_writter.delai + code_writter.delai;
    }

    exec(code_writter : CodeWritter, line : number) : void {
        throw "Not implemented yet !";
    }

    rebuildCode(code_writter : CodeWritter) {
        code_writter.displayCode();
    }

    replaceCode(line_elem, code : string) {
        const code_formatter = new PhpCodeFormatter();
        line_elem.innerHTML = code_formatter.addSyntaxColoration(code);
    }

}