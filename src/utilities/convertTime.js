export const convertTime = (time) => {
  return new Date(time).toLocaleDateString("af-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
