import { Update } from "../../src/code_element/Update";

import { AbstractAction } from "../../src/action/AbstractAction";
import { ActionAdd } from "../../src/action/ActionAdd";
import { ActionRemove } from "../../src/action/ActionRemove";
import { ActionReplace } from "../../src/action/ActionReplace";
import { ActionSwitch } from "../../src/action/ActionSwitch";

import { CodeWritter } from "../../src/CodeWritter";

it("test Update creation", () => {
    const UpdateActionAdd = new Update(0, new ActionAdd(""));
    const UpdateActionRemove = new Update(0, new ActionRemove());
    const UpdateActionReplace = new Update(0, new ActionReplace(""));
    const UpdateActionSwitch = new Update(0, new ActionSwitch(1));

    expect(UpdateActionAdd.getLine()).toBe(0);
    expect(UpdateActionAdd.getAction() instanceof AbstractAction).toBe(true)

    expect(UpdateActionRemove.getLine()).toBe(0);
    expect(UpdateActionRemove.getAction() instanceof AbstractAction).toBe(true)

    expect(UpdateActionReplace.getLine()).toBe(0);
    expect(UpdateActionReplace.getAction() instanceof AbstractAction).toBe(true)

    expect(UpdateActionSwitch.getLine()).toBe(0);
    expect(UpdateActionSwitch.getAction() instanceof AbstractAction).toBe(true)

})

it("test Update null duration", () => {

    const code_writer = new CodeWritter(document.createElement("div"), {});

    const UpdateActionAdd = new Update(0, new ActionAdd(""));
    const UpdateActionRemove = new Update(0, new ActionRemove());
    const UpdateActionReplace = new Update(0, new ActionReplace(""));
    const UpdateActionSwitch = new Update(0, new ActionSwitch(0));

    expect(UpdateActionAdd.getDuration(code_writer)).toBe(0);
    expect(UpdateActionRemove.getDuration(code_writer)).toBe(0);
    expect(UpdateActionReplace.getDuration(code_writer)).toBe(0);
    expect(UpdateActionSwitch.getDuration(code_writer)).toBe(0);

})

it("test Update with duration", () => {

    const code_writer = new CodeWritter(document.createElement("div"), {});

    const UpdateActionAdd = new Update(0, new ActionAdd("$var = 5;"));
    const UpdateActionRemove = new Update(0, new ActionRemove());
    const UpdateActionReplace = new Update(0, new ActionReplace("$var = 5;"));
    const UpdateActionSwitch = new Update(0, new ActionSwitch(1));

    expect(UpdateActionAdd.getDuration(code_writer)).toBe(9 * code_writer.getWritingDelai());
    expect(UpdateActionRemove.getDuration(code_writer)).toBe(0);
    expect(UpdateActionReplace.getDuration(code_writer)).toBe(0);
    expect(UpdateActionSwitch.getDuration(code_writer)).toBe(code_writer.getActionDelai());

})
