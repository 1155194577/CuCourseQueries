import { addDoc, getDoc } from "./documentOperation";
import path from "path";
import { readFileSync } from "fs";
import { get } from "http";

interface CourseData {
  terms: Record<string, Record<string, ClassData>>;
}

interface ClassData {
  startTimes: string[];
  endTimes: string[];
  locations: string[];
  days: string[];
}

interface LessonValue {
  time: [string[], string[]];
  locations: string[];
  day: string[];
}

async function getClassNumbers(programName: string, courseCode: string, termName: string): Promise<string[]> {
  const courseData: CourseData = await getDoc(programName, courseCode);
  const semestersCourseData = courseData.terms;
  const semesterCourseData = semestersCourseData[termName];
  const classNumbers = Object.keys(semesterCourseData);
  await getLessonValue(semesterCourseData, classNumbers[0]);
  return classNumbers;
}

async function getLessonValue(semesterCourseData: Record<string, ClassData>, classNumber: string): Promise<LessonValue> {
  const classData = semesterCourseData[classNumber];
  const lessonValue: LessonValue = {
    time: [classData.startTimes, classData.endTimes],
    locations: classData.locations,
    day: classData.days,
  };
  return lessonValue;
}

getClassNumbers("aist", "2010", "2024-25 Term 1");
