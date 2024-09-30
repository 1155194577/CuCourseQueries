import { dbName } from "../constant/db";
import {
  getAllCollectionsIds,
  getAllDocsIds,
} from "../services/firebase/documentsOperation";
describe("test get course by id", () => {
  test("should fetch and return all course ids", async () => {
    const res: any = await getAllDocsIds(dbName.courseData, "AIST");
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
  });

  test("should fetch and return all course ids in a collection", async () => {
    const res: any = await getAllCollectionsIds(dbName.courseData);
    expect(res).toBeDefined();
    console.log(res);
    expect(res.length).toBeGreaterThan(0);
  });
});
