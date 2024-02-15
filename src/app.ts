import { CodeWritter } from "./CodeWritter";
import { ActionAdd } from "./action/ActionAdd";
import { ActionRemove } from "./action/ActionRemove";
import { ActionReplace } from "./action/ActionReplace";
import { ActionSwitch } from "./action/ActionSwitch";
import { Update } from "./code_element/Update";

const code = [
    "// refactoring",
    "if($var == 1) {",
    "   echo \"PLOP\";",
    "} else {",
    "   throw \"AHHHHHH !!!\";",
    "}"
];

const updates : Array<Update> = [
    new Update(1, new ActionReplace("if($var != 1) {")),
    new Update(3, new ActionReplace("}")),
    new Update(5, new ActionRemove()),
    new Update(2, new ActionSwitch(3)),
    new Update(4, new ActionSwitch(2)),
    new Update(4, new ActionReplace("echo \"PLOP\";")),
    new Update(4, new ActionAdd("")),
    new Update(1, new ActionAdd("")),
    new Update(1, new ActionAdd("function isValid($var) {")),
    new Update(2, new ActionAdd("   return $var != 1;")),
    new Update(3, new ActionAdd("}")),
    new Update(5, new ActionReplace("if(isValid($var)) {")),
]

window.addEventListener("DOMContentLoaded", () => {

    const elem = document.getElementById("refactoring-animation");
    const options = {};
    
    const code_writter = new CodeWritter(elem!, options);
    
    code_writter
        .setCode(code)
        .setUpdates(updates)
        .run()
    ;
    
})