import { getDoc } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { CoursesArraySchema, CourseSchema } from "../types/courses";
import { getAllDocs } from "../services/firebase/documentsOperation";
import request from "supertest";
import app from "../server";
describe("getDoc", () => {
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

  test("test getCourseController, get all course in aist", async () => {
    const response = await request(app)
      .get("/api/v1/courses")
      .query({ programName: "AIST" });
    const data = response.body;
    const courseArrayData = data.courseArrayData;
    console.log(courseArrayData);
    expect(courseArrayData).toBeDefined();
    expect(response.status).toBe(200);
  });
  test("test getCourseController : get aist1000", async () => {
    const response = await request(app)
      .get("/api/v1/courses")
      .query({ programName: "AIST", courseCode: "1000" });
    const data = response.body;
    const courseData = data.courseArrayData;
    console.log(data);
    // CourseSchema.parse(courseData);x/xw
    // console.log(CourseSchema.safeParse(courseData));
    expect(courseData).toBeDefined();
    expect(response.status).toBe(200);
  });

  it("should fail to fetch course Data with because programme name is wrong", async () => {
    const wrongProgramName = "AISTsandnsmdas";
    const response = await request(app)
      .get("/api/v1/courses")
      .query({ programName: wrongProgramName });
    const data = response.body;
    expect(data.errorMessage).toEqual("Program Name not found");
    expect(data.success).toEqual(false);
    expect(response.status).toBe(404);
  });

  it("should fail to fetch course Data with because course code is wrong", async () => {
    const wrongCourseCode = "100000";
    const response = await request(app)
      .get("/api/v1/courses")
      .query({ programName: "AIST", courseCode: wrongCourseCode });
    const data = response.body;
    expect(data.errorMessage).toEqual("Course not found");
    expect(data.success).toEqual(false);
    expect(response.status).toBe(404);
  });

  it("should fail because no program name is provided", async () => {
    const response = await request(app).get("/api/v1/courses");
    const data = response.body;
    expect(data.errorMessage).toEqual(
      "Invalid request, please provide programName"
    );
    expect(data.success).toEqual(false);
    expect(response.status).toBe(404);
  });
});
