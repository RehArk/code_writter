import { Code } from "../../src/code_element/Code";

it("test empty Code creation", () => {
    const code = new Code([]);
    expect(code.lines.length).toBe(0)
})

it("test Code creation", () => {
    const code = new Code([
        "$var = 10;",
        "echo $var;"
    ]);
    expect(code.lines.length).toBe(2)
})

it("test empty Code duration", () => {
    const line = new Code([]);
    expect(line.getDuration(50)).toBe(0);
})

it("test Code duration", () => {
    const line = new Code([
        "$var = 10;",
        "echo $var;"
    ]);
    expect(line.getDuration(50)).toBe(10 * 2 * 50);
})