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

    removeHtmlTags(inputString) {
        return inputString.replace(/<[^>]*>/g, '');
    }

    escapeRegExp(inputString) : string {
        return inputString.replace(/[.*+?^${}()\|\[\]\\]/g, '\\$&');
    }

    addKeywordsTags(inputString) {
        
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

    addFunctionTags(inputString) {

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

    addTypeTags(inputString) {

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

    addVariableTags(inputString) {

        const self = this;
        const pattern = /([$]{1,2}[\w+]*)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'var')
        });
    }

    addStringTags(inputString) {

        const self = this;
        const pattern = /('[^']*'|"[^"]*")/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'str')
        });
    }

    addNumberTags(inputString) {

        const self = this;
        const pattern = /(?<![\w])([+-]?([0-9]*[.|,])?[0-9]+)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'num')
        });
    }

    addCommentsTags(inputString) {

        const self = this;
        const pattern = /(\/\/.*)/g;

        return inputString.replace(pattern, (match) => {
            return self.getTag(match, 'com')
        });
    }

    addOperatorTags(inputString) {

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

    addSyntaxColoration(inputString) {

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