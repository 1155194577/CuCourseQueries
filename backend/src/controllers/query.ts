import { Request, Response } from "express";
import { fireBaseQuerySchema, FireBaseQueryType } from "../types/fireBaseQuery";
import { getDocByQuery } from "../services/firebase/documentOperation";
import { dbName } from "../constant/db";
import { LessonArrayType, LessonSchema, LessonType } from "../types/courses";
import { match } from "assert";
export const postQueryController = async (req: Request, res: Response) => {
  //TODO : add error handling via try and catch
  const body = req.body;
  console.log(body);
  if (!body) {
    res.json({ error: "No body found" });
  }
  if (body.queries) {
    const queriesData = body.queries;
    const queryArray: FireBaseQueryType[] = [];
    const matchedLessons: LessonType[] = [];
    for (const query of queriesData) {
      queryArray.push(fireBaseQuerySchema.parse(query));
    }
    const fetchLessons: any = await getDocByQuery(
      dbName.default,
      "lessons",
      queryArray
    );
    for (const lesson of fetchLessons) {
      matchedLessons.push(LessonSchema.parse(lesson));
    }
    const responseData = {
      matches: matchedLessons,
    };
    res.status(200).json(responseData);
  }
};
