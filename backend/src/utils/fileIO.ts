import { promises as fs } from 'fs';

export async function readJsonFile(filePath: string): Promise<object> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error; // Re-throw the error for further handling
  }
}

// Usage
// const main = async () => {
//   const jsonObject = await readJsonFile('./data.json');
//   console.log('JSON Object:', jsonObject);
// };

// main().catch(console.error);