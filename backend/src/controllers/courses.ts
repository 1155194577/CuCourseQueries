import { Request, Response } from "express";
import {
  getCourseRequestSchema,
  getCourseRequestType,
  ErrorSchema,
  ErrorType,
} from "../types/getCourses";
import { getDoc } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { CourseSchema, CourseType } from "../types/courses";
import { getAllDocs } from "../services/firebase/documentsOperation";
export const getCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const programName: any = req.query.programName;
    const courseCode: any = req.query.courseCode;
    const courseRequest: getCourseRequestType = getCourseRequestSchema.parse({
      programName: programName,
      courseCode: courseCode,
    });
    if (courseRequest.courseCode) {
      //get course by program name and course code
      const courseData: any = await getDoc(
        dbName.courseData,
        courseRequest.programName,
        courseRequest.courseCode
      );
      const parsedCourseData: CourseType = CourseSchema.parse(courseData);
      if (parsedCourseData) {
        res.json({ courseArrayData: parsedCourseData });
      } else {
        throw new Error("Course not found");
      }
    } else {
      if (courseRequest.programName) {
        const courseArrayData = await getAllDocs(
          dbName.courseData,
          courseRequest.programName
        );
        if (courseArrayData) {
          res.json({ courseArrayData });
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("getCourseController error", error.message);
      const errorResponse: ErrorType = ErrorSchema.parse({
        success: false,
        errorCode: 404,
        errorMessage: error.message,
      });
      res.json(errorResponse);
    }
  }
};
