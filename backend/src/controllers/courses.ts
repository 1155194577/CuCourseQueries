import { Request, Response } from "express";
import {
  getCourseRequestSchema,
  getCourseRequestType,
  ErrorSchema,
  ErrorType,
} from "../types/getCourses";
import { getDoc } from "../services/firebase/typedDocumentOperation";
import { dbName } from "../constant/db";
import { CoursesArrayType, CourseSchema, CourseType } from "../types/courses";
import { dBcollectionType, dBDocumentStrictType } from "../types/fireBaseQuery";
import { getAllDocs } from "../services/firebase/typedDocumentsOperation";

export const getCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const programName: any = req.query.programName;
    const courseCode: any = req.query.courseCode;
    const courseRequestParseResult: any = getCourseRequestSchema.safeParse({
      programName: programName,
      courseCode: courseCode,
    });
    if (!courseRequestParseResult.success) {
      throw new Error("Invalid request, please provide programName");
    }
    const courseRequest: getCourseRequestType = courseRequestParseResult.data;

    if (courseRequest.courseCode) {
      //get course by program name and course code
      const dbdocument: dBDocumentStrictType = {
        dbName: dbName.courseData,
        colName: courseRequest.programName,
        docName: courseRequest.courseCode,
      };
      const courseData: CourseType | undefined = await getDoc<CourseType>(
        dbdocument
      );
      const courseDataParseResult = CourseSchema.safeParse(courseData);
      if (courseDataParseResult.success) {
        res.json({ courseArrayData: courseDataParseResult.data });
      } else {
        throw new Error("Course not found");
      }
    } else {
      if (courseRequest.programName) {
        const dbCollection: dBcollectionType = {
          dbName: dbName.courseData,
          colName: courseRequest.programName,
        };
        const courseArrayData: CoursesArrayType = await getAllDocs<CourseType>(
          dbCollection
        );
        if (courseArrayData.length > 0) {
          res.json({ courseArrayData });
        } else {
          throw new Error("Program Name not found");
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
      res.status(404).json(errorResponse);
    }
  }
};
