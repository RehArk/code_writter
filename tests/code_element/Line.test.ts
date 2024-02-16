import { Line } from "../../src/code_element/Line";

it("test empty Line creation", () => {
    const line = new Line("");
    expect(line.getCode()).toBe("");
})

it("test Line creation", () => {
    const line = new Line("$var = 5;");
    expect(line.getCode()).toBe("$var = 5;");
})

it("test empty Line duration", () => {
    const line = new Line("");
    expect(line.getDuration(50)).toBe(0);
})

it("test Line duration", () => {
    const line = new Line("$var = 5;");
    expect(line.getDuration(50)).toBe(9 * 50);
})