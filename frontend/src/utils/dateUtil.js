export const formatDate = (localtime) => {
  const date = new Date(localtime);
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatWeekday = (localtime, short = false) => {
  const normalized = localtime.replace(/-/g, "/");
  return new Date(normalized).toLocaleDateString("en-US", {
    weekday: short ? "short" : "long",
  });
};

export const formatTime = (
  localtime,
  { hour12 = true, showPeriod = true } = {}
) => {
  const time = new Date(localtime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  });

  if (hour12 && !showPeriod) {
    return time.replace(/\s?(AM|PM)/i, "");
  }

  return time;
};

export const formatFullDate = (localtime) => {
  return `${formatWeekday(localtime)}, ${formatDate(localtime)}`;
};
