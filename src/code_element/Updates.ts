import { Update } from "./Update";

export class Updates {

    public updates : Array<Update>

    constructor(updates : Array<Update>) {
        this.updates = updates;
    }

    public getAll() : Array<Update> {
        return this.updates;
    }

}