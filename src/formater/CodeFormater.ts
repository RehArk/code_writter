export class CodeFormatter {

    escapeRegExp(inputString) : string {
        return inputString.replace(/[\+\*\?\&\|]/g, '\\\$1')
    }

    addHtmlTag(inputString: string, tempTag : string, htmlTag : string) : string {

        const patternStart = new RegExp('\\\\' + tempTag,'g');
        const patternEnd = new RegExp(tempTag + '\\\\', 'g');

        inputString = inputString.replace(patternStart, '<' + htmlTag + '>');
        inputString = inputString.replace(patternEnd, '</' + htmlTag + '>');

        return inputString;
    }

    addKeywordsTags(inputString) {
        return this.addHtmlTag(inputString, 'kw', 'keyword');
    }

    addFunctionTags(inputString) {
        return this.addHtmlTag(inputString, 'fn', 'function');
    }

    addTypeTags(inputString) {
        return this.addHtmlTag(inputString, 'typ', 'type');
    }

    addVariableTags(inputString) {
        return this.addHtmlTag(inputString, 'var', 'variable');
    }

    addStringTags(inputString) {
        return this.addHtmlTag(inputString, 'str', 'string');
    }

    addNumberTags(inputString) {
        return this.addHtmlTag(inputString, 'num', 'number');
    }

    addCommentsTags(inputString) {
        return this.addHtmlTag(inputString, 'com', 'comment');
    }

    addOperatorTags(inputString) {
        return this.addHtmlTag(inputString, 'op', 'operator');
    }

    addSyntaxColoration(inputString) {

        let formatedString = inputString;

        formatedString = this.addKeywordsTags(formatedString);
        formatedString = this.addFunctionTags(formatedString);
        formatedString = this.addTypeTags(formatedString);
        formatedString = this.addVariableTags(formatedString);
        formatedString = this.addStringTags(formatedString);
        formatedString = this.addNumberTags(formatedString);
        formatedString = this.addCommentsTags(formatedString);
        formatedString = this.addOperatorTags(formatedString);

        return formatedString;

    }

}