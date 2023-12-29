export function getDurationWeeks(startDate: Date, endDate: Date): number {
  // 1 week in milliseconds
  // 7 for 7 days in a week, 24 is for 24 hours in a week, 60 is for 60 minutes in a hour, again 60 is for 60 seconds in a minute, and in last 1000 is for 1 seconds in milliseconds.
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();

  // Calculate the difference in weeks
  const totalWeeks = Math.ceil(diffInMilliseconds / millisecondsPerWeek);
  return totalWeeks;
}

export function getSortOperator(sortOrder: string) {
  if (sortOrder === "asc") {
    return "+";
  } else if (sortOrder === "desc") {
    return "-";
  } else {
    return "+";
  }
}
