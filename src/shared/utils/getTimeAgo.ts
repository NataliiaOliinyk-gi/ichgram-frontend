const getTimeAgo = (timestamp: string | number | Date) => {
  if (!timestamp) return "";

  const now = Date.now();
  const updated = new Date(timestamp).getTime();
  const diffMs = now - updated;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) return `${weeks} week${weeks > 1 ? "s" : ""}`;
  if (days >= 1) return `${days} day${days > 1 ? "s" : ""}`;
  if (hours >= 1) return `${hours} h`;
  if (minutes >= 1) return `${minutes} min`;
  return `${seconds} s`;
};

export default getTimeAgo;

// .sort((a, b) => {
//   const dateA = new Date(a.createdAt ?? 0).getTime();
//   const dateB = new Date(b.createdAt ?? 0).getTime();
//   return dateB - dateA;
// })
