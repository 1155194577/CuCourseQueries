import { dbName } from "../constant/db";
import { getDocByQuery } from "../services/firebase/documentOperation";
import { WhereFilterOp } from "firebase-admin/firestore";
import { FireBaseQueryType, fireBaseQuerySchema } from "../types/fireBaseQuery";
import { CourseSchema, LessonSchema } from "../types/courses";
describe("test query", () => {
  test("should parse with success", () => {
    const testData: any = {
      field: "lessonName",
      operator: "==",
      value: "lesson1",
    };

    const res: boolean = fireBaseQuerySchema.safeParse(testData).success;
    expect(res).toBe(true);
  });

  test("should fetch lesson Data with lessonSchemaType", async () => {
    //fetch By courseCode
    const testQuery: any = {
      field: "courseCode",
      operator: "==",
      value: "AIST1000",
    };

    const parsedQuery: FireBaseQueryType = fireBaseQuerySchema.parse(testQuery);
    const res: any = await getDocByQuery(dbName.default, "lessons", [
      parsedQuery,
    ]);
    console.log(res);
    expect(res).toBeDefined();

    const parsedCourseData: any = LessonSchema.safeParse(res[0]);
    expect(parsedCourseData.success).toEqual(true);
    expect(parsedCourseData.data.courseCode).toEqual("AIST1000");
  });
  it("should fetch lesson data that are held on day 4", async () => {
    const testTimeQuery: any = {
      field: "days",
      operator: "array-contains",
      value: 4,
    };
    const parsedQuery: FireBaseQueryType =
      fireBaseQuerySchema.parse(testTimeQuery);
    const res: any = await getDocByQuery(dbName.default, "lessons", [
      parsedQuery,
    ]);
    expect(res).toBeDefined();
    const parsedCourseData: any = LessonSchema.safeParse(res[0]);
    console.log(parsedCourseData);
    expect(parsedCourseData.success).toEqual(true);
    expect(parsedCourseData.data.days).toContain(4);
  });

  test("more than one query", async () => {
    const testQuery: any = {
      field: "courseCode",
      operator: "==",
      value: "ENGG2720",
    };
    const testQuery2: any = {
      field: "days",
      operator: "array-contains",
      value: 4,
    };
    const queryArray: FireBaseQueryType[] = [
      fireBaseQuerySchema.parse(testQuery),
      fireBaseQuerySchema.parse(testQuery2),
    ];
    const res: any = await getDocByQuery(dbName.default, "lessons", queryArray);
    expect(res).toBeDefined();
    console.log(res);
    const parsedCourseData: any = LessonSchema.safeParse(res[0]);
    console.log(parsedCourseData);
    expect(parsedCourseData.success).toEqual(true);
    expect(parsedCourseData.data.days).toContain(4);
  });
});
