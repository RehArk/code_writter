import { CodeFormatter } from "./CodeFormater";

export class PhpCodeFormatter {

    private getStartTag(keyCode : string) : string {
        return '\\' + keyCode;
    }

    private getEndTag(keyCode : string) : string {
        return keyCode + '\\';
    }

    private getTag(match : string, tag : string) : string {
        return this.getStartTag(tag) + match + this.getEndTag(tag)
    }

    private removeHtmlTags(inputString) : string {
        return inputString.replace(/<[^>]*>/g, '');
    }

    private escapeRegExp(inputString) : string {
        return inputString.replace(/[.*+?^${}()\|\[\]\\]/g, '\\$&');
    }

    private addKeywordsTags(inputString) : string {
        
        const self = this;
        var keywords = [
            'if', 'else', 
            'while', 'for', 'foreach', 'function', 
            'class', 'public', 'private', 'protected',
            'throw', 
            'return', 'yield'
        ];
        
        keywords.forEach(function (keyword) {
            var pattern = new RegExp('\\b' + keyword + '\\b', 'g');
            inputString = inputString.replace(pattern, (match) => {
                return self.getTag(match, 'kw');
            });
        });
        
        return inputString;
        
    }

    private addFunctionTags(inputString) : string {

        const self = this;
        const pattern = /([\w+]{1,}[ ]{0,}[(])/g;
        var functions = [
            'echo'
        ];

        functions.forEach(function (fun) {
            var pattern = new RegExp('\\b' + fun + '\\b', 'g');
            inputString = inputString.replace(pattern, (match) => {
                return self.getTag(match, 'fn')
            });
        });

        inputString = inputString.replace(pattern, (match) => {
            match = match.slice(0, match.length - 1);
            return self.getTag(match, 'fn') + '(';
        });

        return inputString;
    }

    private addTypeTags(inputString) : string {

        const self = this;
        var types = ['int', 'float', 'string', 'bool', 'void'];

        types.forEach(function (type) {
            var pattern = new RegExp('\\b' + type + '\\b', 'g');
            inputString = inputString.replace(pattern, (match) => {
                return self.getTag(match, 'typ')
            });
        });

        return inputString;
    }

    private addVariableTags(inputString) : string {

        const self = this;
        const pattern = /([$]{1,2}[\w+]*)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'var')
        });
    }

    private addStringTags(inputString) : string {

        const self = this;
        const pattern = /('[^']*'|"[^"]*")/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'str')
        });
    }

    private addNumberTags(inputString) : string {

        const self = this;
        const pattern = /(?<![\w])([+-]?([0-9]*[.|,])?[0-9]+)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'num')
        });
    }

    private addCommentsTags(inputString) : string {

        const self = this;
        const pattern = /(\/\/.*)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'com')
        });
    }

    private addOperatorTags(inputString) : string {

        const self = this;
        var operators = [
            '+', '-', '*', '/', 
            '=', '==', '!=', 
            '<', '>', '<=', '>=', 
            '&&', '||', 
            '+=', '-=', '*=', '/='
        ];

        operators.forEach(function (operator) {
            var pattern = new RegExp('\\b' + self.escapeRegExp(operator) + '\\b', 'g');
            inputString = inputString.replace(pattern, (match) => {
                return self.getTag(match, 'typ')
            });
        });

        return inputString;

    }

    public addSyntaxColoration(inputString) : string {

        let formatedString = this.removeHtmlTags(inputString);

        formatedString = this.addKeywordsTags(formatedString);
        formatedString = this.addFunctionTags(formatedString);
        formatedString = this.addTypeTags(formatedString);
        formatedString = this.addVariableTags(formatedString);
        formatedString = this.addStringTags(formatedString);
        formatedString = this.addNumberTags(formatedString);
        formatedString = this.addCommentsTags(formatedString);
        formatedString = this.addOperatorTags(formatedString);

        const codeFormater = new CodeFormatter()
        return codeFormater.addSyntaxColoration(formatedString);

    }

}