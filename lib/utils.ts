// Temporary function for making sure Vitest is setup and running correctly
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = String(minutes).padStart(2, "0");
  const secondsString = String(remainingSeconds).padStart(2, "0");

  const time = `${minutesString}:${secondsString}`;

  return time;
}