import { Request, Response } from "express";
import {
  getCourseRequestSchema,
  getCourseRequestType,
  ErrorSchema,
  ErrorType,
} from "../types/controller";
import { getDoc } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { CourseType } from "../types/courses";
import z from "zod";
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
      const result: any = await getDoc(
        dbName.courseData,
        courseRequest.programName,
        courseRequest.courseCode
      );
      if (result) {
        res.json(result);
      } else {
        throw new Error("Course not found");
      }
    } else {
      //TODO : allow get all courses by program name
      throw new Error("Course code is required");
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
