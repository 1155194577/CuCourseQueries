import { promises as fs } from "fs";

export async function asyncReadJsonFile<T>(
  filePath: string
): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T; //casting data to type T
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}
