import { Request, Response } from "express";
import {
  programNameType,
  programNameSchema,
  responseCourseIdType,
  responseCourseIdSchema,
} from "../types/getCoursesId";
import { dbName } from "../constant/db";
import {
  getAllCollectionsIds,
  getAllDocsIds,
} from "../services/firebase/documentsOperation";
import { ErrorType, ErrorSchema } from "../types/getCourses";
export const getCoursesIdController = async (req: Request, res: Response) => {
  try {
    const programName: any = req.query.programName;
    const programNames: string[] = [];
    if (programName) {
      programNames.push(programName);
    } else if (!programName) {
      const tempArr: string[] = await getAllCollectionsIds(dbName.courseData);
      for (const programName of tempArr) {
        programNames.push(programName);
      }
    }
    const parsedProgramNameArray: programNameType[] = programNames.map(
      (programName) => programNameSchema.parse(programName)
    );

    console.log(parsedProgramNameArray);
    const data: responseCourseIdType = {};
    for (const parsedProgramName of parsedProgramNameArray) {
      const courseCode: string[] = await getAllDocsIds(
        dbName.courseData,
        parsedProgramName
      );
      data[parsedProgramName] = courseCode;
    }
    const parsedResponseData = responseCourseIdSchema.parse(data);
    res.json(parsedResponseData);
  } catch (error) {
    if (error instanceof Error) {
      console.log("getCoursesIdController error", error.message);
      const errorRepsonse: ErrorType = ErrorSchema.parse({
        success: false,
        errorCode: 404,
        errorMessage: error.message,
      });
      res.status(404).json(errorRepsonse);
    }
  }
};
