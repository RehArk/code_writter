import { CodeWritter } from "../CodeWritter";
import { AbstractAction } from "./AbstractAction";

export class ActionRemove extends AbstractAction {
    
    public exec(code_container : CodeWritter, line : number) : void {
        code_container.getCode().lines.splice(line, 1);
        this.rebuildCode(code_container);
    }
    
}