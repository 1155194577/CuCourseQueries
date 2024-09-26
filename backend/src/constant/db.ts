export const dbName: { [key: string]: string } = {
  default: "default",
  courseData: "courseData",
};

// src/sum.ts
type sumType = (a: number, b: number) => number;
export const sum: sumType = (a, b) => a + b;
