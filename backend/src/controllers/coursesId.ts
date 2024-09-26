import { Request, Response } from "express";
import z from "zod";
import { programNameType, programNameSchema } from "../types/getCoursesId";
import { getDoc } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { getAllDocsIds } from "../services/firebase/documentsOperation";
export const getCoursesIdController = async (req: Request, res: Response) => {
  try {
    const programName: any = req.query.programName;
    console.log(programName);
    const parsedProgramName: programNameType =
      programNameSchema.parse(programName); //e.g AIST
    console.log(parsedProgramName);
    const courseCode: string[] = await getAllDocsIds(
      dbName.courseData,
      parsedProgramName
    );
    const data: any = {};
    data[parsedProgramName] = courseCode;

    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("getCoursesIdController error", error.message);
      res.json({ success: false, errorCode: 404, errorMessage: error.message });
    }
  }
};
