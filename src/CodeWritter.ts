import { Update } from "./code_element/Update";
import { Code } from "./code_element/Code";
import { Updates } from "./code_element/Updates";
import { PhpCodeFormatter } from "./formater/PhpCodeFormater";


export class CodeWritter {

    code_container : HTMLElement;
    code : Code|null;
    updates : Updates|null;
    delai : number = 50;
    
    constructor(target : HTMLElement, option : Object) {
        this.code = null;
        this.updates = null;
        this.code_container = target;
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
        }, this.code?.getDuration(this));

    }

    public getCodeContainerLine(line : number) {
        const code_container = this.code_container;
        const id = code_container.id;
        const line_elem = code_container.querySelector("#" + id + "-line-code-" + line);
        const code_content = line_elem?.querySelector("." + id + "code-content")
        return code_content;
    }

    public writeAnimation(line_elem, text, index = 0) {

        if(index > text.length - 1) {
            return;
        }

        let self = this;
        const code_formatter = new PhpCodeFormatter();
    
        setTimeout(function() {

            const char = text[index];

            line_elem.innerHTML = code_formatter.addSyntaxColoration(line_elem.innerHTML + char);

            self.writeAnimation(line_elem, text, index +1);
            
        }, this.delai);
    
    }

    private formatLine(line, code) {

        let id = this.code_container.id;

        let pre = "<span class=\"pre-code\">" + line + "</span>";

        let separator = "<span class=\"separator\"></span>";

        let content = "<span class=\"" + id + "code-content\">" + code + "</span>";

        line = "<li id=\"" + id + "-line-code-" + line + "\">" + pre + separator + content + "</li>";

        return line;

    }

    private buildCodeContainer() {

        this.code_container.innerHTML = "";
        let self = this;
        let duration = 0;

        for(let index in this.code?.lines) {

            let line = this.code?.lines[index];
            
            setTimeout(function() {
                self.code_container.innerHTML += self.formatLine(index, "")
                const line_elem = self.getCodeContainerLine(index);
                self.writeAnimation(line_elem, line.code);
            }, duration)
            
            duration += line.getDuration(this.delai);

        }

    }

    private updateCode(index = 0) {

        if(!this.updates) {
            return;
        }

        if(index > this.updates?.updates.length - 1) {
            return;
        }

        const update = this.updates.updates[index]
        update.exec(this);

        const self = this;

        setTimeout(() => {
            this.updateCode(index + 1);
        }, update.getDuration(this));

    }

    public displayCode() {
        
        let self = this;
        this.code_container.innerHTML  = "";
        const code_formatter = new PhpCodeFormatter();

        for(let index in this.code?.lines) {
            this.code_container.innerHTML += this.formatLine(index, "")
            let line = this.code.lines[index];
            const line_elem = self.getCodeContainerLine(index);
            line_elem!.innerHTML += code_formatter.addSyntaxColoration(line.code);
        }

    }

}