export function formatDate(timestamp) {
  const date = new Date(timestamp); // Parse the timestamp to ensure it's an integer representing milliseconds
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-LT", options);
}
