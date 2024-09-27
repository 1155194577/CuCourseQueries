import { paths } from "./paths";
describe("test const exportation", () => {
  test("should get curr path", () => {
    expect(__dirname).toBeDefined();
    expect(__filename).toBeDefined();
  });

  test("should get valid paths", () => {
    expect(paths.coursesFolder).toBeDefined();
    expect(paths.configFolder).toBeDefined();
    expect(paths.constFolder).toBeDefined();
    const localDir: string = `${paths.coursesFolder}/AIST.json`;
    expect(localDir).toBeDefined();
  });
});
