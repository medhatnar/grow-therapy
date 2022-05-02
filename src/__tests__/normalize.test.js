import { stripSpecialChars } from "../utils";

describe("stripSpecialChars", () =>
  it("replaces special characters excluding periods/parenthesis with spaces", 
  () => {
    const specialCharString = "A._J._Brown_(American_football)";
    const sanitizedString = "A. J. Brown (American football)";

    const result = stripSpecialChars(specialCharString);

    expect(result).toEqual(sanitizedString);
  }));
