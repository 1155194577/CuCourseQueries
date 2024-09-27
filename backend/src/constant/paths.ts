import path from "path";
import { fileURLToPath } from "url";
import * as url from "url";
try {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
} catch (e) {
  console.log(e);
}
const __filename = url.fileURLToPath(import.meta.url);
// Convert import.meta.url to a file path

const projectRoot = path.resolve(__filename, "..");

// Define other paths relative to the project root
export const paths = {
  coursesFolder: path.join(projectRoot, "data/courses"),
  configFolder: path.join(projectRoot, "config"),
  constFolder: path.join(projectRoot, "constant"),
};

// /Users/hejinyu/Projects/cuCourseMap/backend/src/data
