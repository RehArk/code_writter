import { Update } from "./code_element/Update";
import { Code } from "./code_element/Code";
import { Updates } from "./code_element/Updates";
import { PhpCodeFormatter } from "./formater/PhpCodeFormater";


export class CodeWritter {

    private code_container : HTMLElement;
    private code : Code;
    private updates : Updates;
    private writing_delai : number = 50;
    private action_delai : number = 450;

    
    constructor(target : HTMLElement, option : Object) {
        this.code = new Code([]);
        this.updates = new Updates([]);
        this.code_container = target;
    }

    public getWritingDelai() : number {
        return this.writing_delai;
    }

    public getActionDelai() : number {
        return this.action_delai;
    }

    public getCode() : Code {
        return this.code;
    }

    public setCode(code_lines : Array<string>) : this {
        this.code = new Code(code_lines);
        return this;
    }

    public setUpdates(updates : Array<Update>) : this {
        this.updates = new Updates(updates);
        return this;
    }

    public run() : void {

        this.buildCodeContainer();
        
        setTimeout(() => {
            this.updateCode();
        }, this.code.getDuration(this) + this.action_delai * 5);

    }

    public getCodeContainerLine(line : number) : Element {
        const code_container = this.code_container;
        const id = code_container.id;
        const line_elem = code_container.querySelector("#" + id + "-line-code-" + line);
        const code_content = line_elem!.querySelector("." + id + "code-content")
        return code_content!;
    }

    public writeAnimation(line_elem, text, index = 0) : void {

        if(index > text.length - 1) {
            return;
        }

        let self = this;
        const code_formatter = new PhpCodeFormatter();
    
        setTimeout(function() {

            const char = text[index];

            line_elem.innerHTML = code_formatter.addSyntaxColoration(line_elem.innerHTML + char);

            self.writeAnimation(line_elem, text, index +1);
            
        }, this.writing_delai);
    
    }

    private formatLine(line, code) : string {

        let id = this.code_container.id;

        let pre = "<span class=\"pre-code\">" + line + "</span>";

        let separator = "<span class=\"separator\"></span>";

        let content = "<span class=\"" + id + "code-content\">" + code + "</span>";

        line = "<li id=\"" + id + "-line-code-" + line + "\">" + pre + separator + content + "</li>";

        return line;

    }

    private buildCodeContainer() : void {

        let self = this;
        let duration = 0;
        this.code_container.innerHTML = "";

        for(let index in this.code.lines) {

            let line = this.code.lines[index];
            
            setTimeout(function() {
                self.code_container.innerHTML += self.formatLine(index, "")
                const line_elem = self.getCodeContainerLine(index);
                self.writeAnimation(line_elem, line.getCode());
            }, duration)
            
            duration += line.getDuration(this.writing_delai);

        }

    }

    private updateCode(index = 0) : void {

        if(index > this.updates.getAll().length - 1) {
            return;
        }

        const update = this.updates.getAll()[index]
        update.exec(this);

        setTimeout(() => {
            this.updateCode(index + 1);
        }, update.getDuration(this) + this.action_delai);

    }

    public displayCode() : void {
        
        let self = this;
        this.code_container.innerHTML  = "";
        const code_formatter = new PhpCodeFormatter();

        for(let index in this.code.lines) {
            this.code_container.innerHTML += this.formatLine(index, "")
            let line = this.code.lines[index];
            const line_elem = self.getCodeContainerLine(index);
            line_elem!.innerHTML += code_formatter.addSyntaxColoration(line.getCode());
        }

    }

}