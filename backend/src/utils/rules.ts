export function isValidTime(time: string): boolean {
    const timeRegex = /^\d{1,2}:\d{2}$/;
    return timeRegex.test(time);
  }

