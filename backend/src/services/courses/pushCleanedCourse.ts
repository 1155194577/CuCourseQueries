import { getLessonsArrayFromJson } from "./parseAndCleanData";
import { addDoc } from "../firebase/documentOperation";
// Parse Local Data and Push to Database
const programmeNames: string[] = [
  "AIST",
  "CSCI",
  "ELEG",
  "ENGG",
  "IERG",
  "MATH",
  "RMSC",
  "SEEM",
];

getLessonsArrayFromJson("../../data/courses/CSCI.json").then((lessonsArray) => {
  console.log(lessonsArray);
  for (const lesson of lessonsArray) {
    const lessonId = Object.keys(lesson)[0];
    addDoc("CSCI", lessonId, lesson[lessonId]);
  }
});
