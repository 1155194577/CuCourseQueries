import { z } from "zod";

export const ClassSchema = z.object({
  startTimes: z.array(z.string()),
  endTimes: z.array(z.string()),
  locations: z.array(z.string()),
  days: z.array(z.number()),
  instructors: z.array(z.string()),
  meetingDates: z.array(z.string()),
});

export const ClassesSchema = z.record(z.string(), ClassSchema);

export const TermsSchema = z.record(ClassesSchema);

export const AssessmentsSchema = z.object({
  Attendance: z.string().optional(),
  Project: z.string().optional(),
  Participation: z.string().optional(),
  "Lab reports": z.string().optional(),
  "Essay test or exam": z.string().optional(),
  "Short answer test or exam": z.string().optional(),
});

export const CourseSchema = z.object({
  code: z.string(),
  title: z.string(),
  career: z.string(),
  units: z.string(),
  grading: z.string(),
  components: z.string(),
  campus: z.string(),
  academic_group: z.string(),
  requirements: z.string(),
  description: z.string(),
  outcome: z.string(),
  syllabus: z.string(),
  required_readings: z.string(),
  recommended_readings: z.string(),
  terms: TermsSchema,
  assessments: AssessmentsSchema,
});

export const CoursesArrSchema = z.array(CourseSchema);

export type Class = z.infer<typeof ClassSchema>;
export type Classes = z.infer<typeof ClassesSchema>;
// export type Terms = z.infer<typeof TermsSchema>;
export type Assessments = z.infer<typeof AssessmentsSchema>;
export type Course = z.infer<typeof CourseSchema>;
