(() => {
  // src/code_element/Line.ts
  var Line = class {
    code;
    constructor(code2) {
      this.code = code2;
    }
    getDuration(delai) {
      return delai * this.code.length + delai;
    }
  };

  // src/code_element/Code.ts
  var Code = class {
    lines;
    constructor(code2) {
      this.lines = [];
      for (let code_line of code2) {
        let line = new Line(code_line);
        this.lines.push(line);
      }
    }
    getDuration(caller) {
      let duration = 0;
      for (let line of this.lines) {
        duration += line.getDuration(caller.delai) + caller.delai;
      }
      return duration;
    }
  };

  // src/code_element/Updates.ts
  var Updates = class {
    updates;
    constructor(updates2) {
      this.updates = updates2;
    }
  };

  // src/formater/CodeFormater.ts
  var CodeFormatter = class {
    escapeRegExp(inputString) {
      return inputString.replace(/[\+\*\?\&\|]/g, "\\$1");
    }
    addHtmlTag(inputString, tempTag, htmlTag) {
      const patternStart = new RegExp("\\\\" + tempTag, "g");
      const patternEnd = new RegExp(tempTag + "\\\\", "g");
      inputString = inputString.replace(patternStart, "<" + htmlTag + ">");
      inputString = inputString.replace(patternEnd, "</" + htmlTag + ">");
      return inputString;
    }
    addKeywordsTags(inputString) {
      return this.addHtmlTag(inputString, "kw", "keyword");
    }
    addFunctionTags(inputString) {
      return this.addHtmlTag(inputString, "fn", "function");
    }
    addTypeTags(inputString) {
      return this.addHtmlTag(inputString, "typ", "type");
    }
    addVariableTags(inputString) {
      return this.addHtmlTag(inputString, "var", "variable");
    }
    addStringTags(inputString) {
      return this.addHtmlTag(inputString, "str", "string");
    }
    addNumberTags(inputString) {
      return this.addHtmlTag(inputString, "num", "number");
    }
    addCommentsTags(inputString) {
      return this.addHtmlTag(inputString, "com", "comment");
    }
    addOperatorTags(inputString) {
      return this.addHtmlTag(inputString, "op", "operator");
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
  };

  // src/formater/PhpCodeFormater.ts
  var PhpCodeFormatter = class {
    getStartTag(keyCode) {
      return "\\" + keyCode;
    }
    getEndTag(keyCode) {
      return keyCode + "\\";
    }
    getTag(match, tag) {
      return this.getStartTag(tag) + match + this.getEndTag(tag);
    }
    removeHtmlTags(inputString) {
      return inputString.replace(/<[^>]*>/g, "");
    }
    escapeRegExp(inputString) {
      return inputString.replace(/[.*+?^${}()\|\[\]\\]/g, "\\$&");
    }
    addKeywordsTags(inputString) {
      const self = this;
      var keywords = [
        "if",
        "else",
        "while",
        "for",
        "foreach",
        "function",
        "class",
        "public",
        "private",
        "protected",
        "throw",
        "return",
        "yield"
      ];
      keywords.forEach(function(keyword) {
        var pattern = new RegExp("\\b" + keyword + "\\b", "g");
        inputString = inputString.replace(pattern, (match) => {
          return self.getTag(match, "kw");
        });
      });
      return inputString;
    }
    addFunctionTags(inputString) {
      const self = this;
      const pattern = /([\w+]{1,}[ ]{0,}[(])/g;
      var functions = [
        "echo"
      ];
      functions.forEach(function(fun) {
        var pattern2 = new RegExp("\\b" + fun + "\\b", "g");
        inputString = inputString.replace(pattern2, (match) => {
          return self.getTag(match, "fn");
        });
      });
      inputString = inputString.replace(pattern, (match) => {
        match = match.slice(0, match.length - 1);
        return self.getTag(match, "fn") + "(";
      });
      return inputString;
    }
    addTypeTags(inputString) {
      const self = this;
      var types = ["int", "float", "string", "bool", "void"];
      types.forEach(function(type) {
        var pattern = new RegExp("\\b" + type + "\\b", "g");
        inputString = inputString.replace(pattern, (match) => {
          return self.getTag(match, "typ");
        });
      });
      return inputString;
    }
    addVariableTags(inputString) {
      const self = this;
      const pattern = /([$]{1,2}[\w+]*)/g;
      return inputString.replace(pattern, (match) => {
        return self.getTag(match, "var");
      });
    }
    addStringTags(inputString) {
      const self = this;
      const pattern = /('[^']*'|"[^"]*")/g;
      return inputString.replace(pattern, (match) => {
        return self.getTag(match, "str");
      });
    }
    addNumberTags(inputString) {
      const self = this;
      const pattern = /(?<![\w])([+-]?([0-9]*[.|,])?[0-9]+)/g;
      return inputString.replace(pattern, (match) => {
        return self.getTag(match, "num");
      });
    }
    addCommentsTags(inputString) {
      const self = this;
      const pattern = /(\/\/.*)/g;
      return inputString.replace(pattern, (match) => {
        return self.getTag(match, "com");
      });
    }
    addOperatorTags(inputString) {
      const self = this;
      var operators = [
        "+",
        "-",
        "*",
        "/",
        "=",
        "==",
        "!=",
        "<",
        ">",
        "<=",
        ">=",
        "&&",
        "||",
        "+=",
        "-=",
        "*=",
        "/="
      ];
      operators.forEach(function(operator) {
        var pattern = new RegExp("\\b" + self.escapeRegExp(operator) + "\\b", "g");
        inputString = inputString.replace(pattern, (match) => {
          return self.getTag(match, "typ");
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
      const codeFormater = new CodeFormatter();
      return codeFormater.addSyntaxColoration(formatedString);
    }
  };

  // src/CodeWritter.ts
  var CodeWritter = class {
    code_container;
    code;
    updates;
    delai = 50;
    constructor(target, option) {
      this.code = null;
      this.updates = null;
      this.code_container = target;
    }
    setCode(code_lines) {
      this.code = new Code(code_lines);
      return this;
    }
    setUpdates(updates2) {
      this.updates = new Updates(updates2);
      return this;
    }
    run() {
      this.buildCodeContainer();
      setTimeout(() => {
        this.updateCode();
      }, this.code?.getDuration(this));
    }
    getCodeContainerLine(line) {
      const code_container = this.code_container;
      const id = code_container.id;
      const line_elem = code_container.querySelector("#" + id + "-line-code-" + line);
      const code_content = line_elem?.querySelector("." + id + "code-content");
      return code_content;
    }
    writeAnimation(line_elem, text, index = 0) {
      if (index > text.length - 1) {
        return;
      }
      let self = this;
      const code_formatter = new PhpCodeFormatter();
      setTimeout(function() {
        const char = text[index];
        line_elem.innerHTML = code_formatter.addSyntaxColoration(line_elem.innerHTML + char);
        self.writeAnimation(line_elem, text, index + 1);
      }, this.delai);
    }
    formatLine(line, code2) {
      let id = this.code_container.id;
      let pre = '<span class="pre-code">' + line + "</span>";
      let separator = '<span class="separator"></span>';
      let content = '<span class="' + id + 'code-content">' + code2 + "</span>";
      line = '<li id="' + id + "-line-code-" + line + '">' + pre + separator + content + "</li>";
      return line;
    }
    buildCodeContainer() {
      this.code_container.innerHTML = "";
      let self = this;
      let duration = 0;
      for (let index in this.code?.lines) {
        let line = this.code?.lines[index];
        setTimeout(function() {
          self.code_container.innerHTML += self.formatLine(index, "");
          const line_elem = self.getCodeContainerLine(index);
          self.writeAnimation(line_elem, line.code);
        }, duration);
        duration += line.getDuration(this.delai);
      }
    }
    updateCode(index = 0) {
      if (!this.updates) {
        return;
      }
      if (index > this.updates?.updates.length - 1) {
        return;
      }
      const update = this.updates.updates[index];
      update.exec(this);
      const self = this;
      setTimeout(() => {
        this.updateCode(index + 1);
      }, update.getDuration(this));
    }
    displayCode() {
      let self = this;
      this.code_container.innerHTML = "";
      const code_formatter = new PhpCodeFormatter();
      for (let index in this.code?.lines) {
        this.code_container.innerHTML += this.formatLine(index, "");
        let line = this.code.lines[index];
        const line_elem = self.getCodeContainerLine(index);
        line_elem.innerHTML += code_formatter.addSyntaxColoration(line.code);
      }
    }
  };

  // src/action/AbstractAction.ts
  var AbstractAction = class {
    getCodeContainer(code_writter, line) {
      return code_writter.getCodeContainerLine(line);
    }
    getStep(update) {
      return 1;
    }
    getDuration(code_writter, update) {
      return this.getStep(update) * code_writter.delai + code_writter.delai;
    }
    exec(code_writter, line) {
      throw "Not implemented yet !";
    }
    rebuildCode(code_writter) {
      code_writter.displayCode();
    }
    replaceCode(line_elem, code2) {
      const code_formatter = new PhpCodeFormatter();
      line_elem.innerHTML = code_formatter.addSyntaxColoration(code2);
    }
  };

  // src/action/ActionAdd.ts
  var ActionAdd = class extends AbstractAction {
    code;
    constructor(code2) {
      super();
      this.code = code2;
    }
    getStep() {
      return this.code.length;
    }
    exec(code_writter, line) {
      code_writter.code.lines.splice(line, 0, new Line(""));
      this.rebuildCode(code_writter);
      code_writter.code.lines[line] = new Line(this.code);
      const line_elem = this.getCodeContainer(code_writter, line);
      code_writter.writeAnimation(line_elem, this.code);
    }
  };

  // src/action/ActionRemove.ts
  var ActionRemove = class extends AbstractAction {
    exec(code_container, line) {
      code_container.code.lines.splice(line, 1);
      this.rebuildCode(code_container);
    }
  };

  // src/action/ActionReplace.ts
  var ActionReplace = class extends AbstractAction {
    code;
    constructor(code2) {
      super();
      this.code = code2;
    }
    exec(code_container, line) {
      code_container.code.lines[line] = new Line(this.code);
      const line_elem = code_container.getCodeContainerLine(line);
      this.replaceCode(line_elem, this.code);
    }
    getDuration(code_writter, update) {
      return this.getStep(update) * code_writter.delai + code_writter.delai;
    }
  };

  // src/action/ActionSwitch.ts
  var ActionSwitch = class extends AbstractAction {
    line;
    constructor(line) {
      super();
      this.line = line;
    }
    getStep(update) {
      const line = update.line;
      const switch_line = this.line;
      return Math.abs(line - switch_line) + 1;
    }
    switch_line(code2, i, j) {
      let temp = code2.lines[i];
      code2.lines[i] = code2.lines[j];
      code2.lines[j] = temp;
    }
    exec(code_writter, line) {
      const switch_line = this.line;
      const delai = code_writter.delai;
      if (line < switch_line) {
        for (var i = line; i < switch_line; i++) {
          const prev = i;
          const next = i + 1;
          setTimeout(() => {
            this.switch_line(code_writter.code, prev, next);
            this.rebuildCode(code_writter);
          }, i);
        }
      }
      if (line > switch_line) {
        for (var i = line; i > switch_line; i--) {
          const prev = i;
          const next = i - 1;
          setTimeout(() => {
            this.switch_line(code_writter.code, prev, next);
            this.rebuildCode(code_writter);
          }, Math.abs(line - i));
        }
      }
    }
  };

  // src/code_element/Update.ts
  var Update = class {
    line;
    action;
    constructor(line, action) {
      this.line = line;
      this.action = action;
    }
    exec(code_writter) {
      this.action.exec(code_writter, this.line);
    }
    getDuration(code_writter) {
      return this.action.getDuration(code_writter, this);
    }
  };

  // src/app.ts
  var code = [
    "// refactoring",
    "if($var_1 == 1) {",
    '   echo "PLOP";',
    "} else {",
    '   throw "AHHHHHH !!!";',
    "}"
  ];
  var updates = [
    new Update(1, new ActionReplace("if($var_1 != 1) {")),
    new Update(3, new ActionReplace("}")),
    new Update(5, new ActionRemove()),
    new Update(2, new ActionSwitch(3)),
    new Update(4, new ActionSwitch(2)),
    new Update(4, new ActionReplace('echo "PLOP";')),
    new Update(4, new ActionAdd("")),
    new Update(1, new ActionAdd("")),
    new Update(1, new ActionAdd("function isValid($var) {")),
    new Update(2, new ActionAdd("   return $var != 1;")),
    new Update(3, new ActionAdd("}")),
    new Update(5, new ActionReplace("if(isValid($var)) {"))
  ];
  window.addEventListener("DOMContentLoaded", () => {
    const elem = document.getElementById("refactoring-animation");
    const options = {};
    const code_writter = new CodeWritter(elem, options);
    code_writter.setCode(code).setUpdates(updates).run();
  });
})();
