export class CodeFormatter {

    private addHtmlTag(inputString: string, tempTag : string, htmlTag : string) : string {

        const patternStart = new RegExp('\\\\' + tempTag,'g');
        const patternEnd = new RegExp(tempTag + '\\\\', 'g');

        inputString = inputString.replace(patternStart, '<' + htmlTag + '>');
        inputString = inputString.replace(patternEnd, '</' + htmlTag + '>');

        return inputString;
    }

    private addKeywordsTags(inputString) : string {
        return this.addHtmlTag(inputString, 'kw', 'keyword');
    }

    private addFunctionTags(inputString) : string {
        return this.addHtmlTag(inputString, 'fn', 'function');
    }

    private addTypeTags(inputString) : string {
        return this.addHtmlTag(inputString, 'typ', 'type');
    }

    private addVariableTags(inputString) : string {
        return this.addHtmlTag(inputString, 'var', 'variable');
    }

    private addStringTags(inputString) : string {
        return this.addHtmlTag(inputString, 'str', 'string');
    }

    private addNumberTags(inputString) : string {
        return this.addHtmlTag(inputString, 'num', 'number');
    }

    private addCommentsTags(inputString) : string {
        return this.addHtmlTag(inputString, 'com', 'comment');
    }

    private addOperatorTags(inputString) : string {
        return this.addHtmlTag(inputString, 'op', 'operator');
    }

    public addSyntaxColoration(inputString) : string {

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