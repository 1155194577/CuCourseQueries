import { parseCourseData } from "./parseAndCleanData";
import { paths } from "../../constant/paths";
import { programmeNames } from "../../constant/programme";

for (const programmeName of programmeNames) {
  parseCourseData(`${paths.coursesFolder}/${programmeName}.json`).then(
    (data) => {
      console.log(data.length);
    }
  );
}
