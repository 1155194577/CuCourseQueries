import { getDoc } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { CoursesArraySchema, CourseSchema } from "../types/courses";
import { getAllDocs } from "../services/firebase/documentsOperation";
describe("getDoc", () => {
  test("should give 2+2 = 4", () => {
    expect(2 + 2).toBe(4);
  });

  test("should fetch course Data with CourseSchemaType", async () => {
    const res: any = await getDoc(dbName.courseData, "AIST", "1000");
    expect(res).toBeDefined();
    expect(CourseSchema.safeParse(res).success).toEqual(true);
  });

  test("should fetch course Data Array with CourseSchemaArrayType", async () => {
    const res: any = await getAllDocs(dbName.courseData, "AIST");
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    expect(CoursesArraySchema.safeParse(res).success).toEqual(true);
  });
});
