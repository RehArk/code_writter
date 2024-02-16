import { ActionAdd } from "../../src/action/ActionAdd";
import { ActionRemove } from "../../src/action/ActionRemove";
import { ActionReplace } from "../../src/action/ActionReplace";
import { ActionSwitch } from "../../src/action/ActionSwitch";
import { Update } from "../../src/code_element/Update";
import { Updates } from "../../src/code_element/Updates";

it("test empty Updates creation", () => {
    const upadtes = new Updates([]);
    expect(upadtes.getAll().length).toBe(0);
})

it("test Updates creation", () => {
    const upadtes = new Updates([
        new Update(1, new ActionReplace("if($var != 1) {")),
        new Update(5, new ActionRemove()),
        new Update(2, new ActionSwitch(3)),
        new Update(4, new ActionAdd("")),    
    ]);
    expect(upadtes.getAll().length).toBe(4);
})