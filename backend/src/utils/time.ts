function convertTimeToSeconds(time:string):number {
  const [hours, minutes] = time.split(':');
  const second : number = (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60);
  return second; 
} 
console.log(convertTimeToSeconds('12:30')); // 45000

// npx tsx time.ts (in terminal)`
//npx ts-node time.ts (not working) , Unknown file extension ".ts
// npx ts-node --esm src/index.ts (not working)
// esno time.ts (working)