export function dateByDays(date?: Date, days = 0) {
  const today = date || new Date();
  if (days === 0) {
    return today.toISOString().split("T")[0];
  } else {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + days);
    const checkOutString = newDate.toISOString().split("T")[0];
    return checkOutString;
  }
}
