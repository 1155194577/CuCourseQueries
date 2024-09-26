import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the root of the project
const projectRoot = path.resolve(__dirname, "../");

// Define other paths relative to the project root
export const paths = {
  coursesFolder: path.join(projectRoot, "data/courses"),
  configFolder: path.join(projectRoot, "config"),
};

// /Users/hejinyu/Projects/cuCourseMap/backend/src/data
