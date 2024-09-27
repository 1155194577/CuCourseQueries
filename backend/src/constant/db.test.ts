import { sum } from "./db";
// import { paths } from "./paths";

describe("test const exportation", () => {
  test("should get curr path", () => {
    console.log(__dirname, __filename);
    expect(__dirname).toBeDefined();
    expect(__filename).toBeDefined();
  });
});
