export default function logger(action, details) {
  const entry = { action, details, time: new Date().toISOString() };
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(entry);
  localStorage.setItem("logs", JSON.stringify(logs));
}
