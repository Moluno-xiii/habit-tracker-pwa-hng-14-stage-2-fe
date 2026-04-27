const getDateInLongFormat = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getSlicedDate = () => {
  return new Date().toISOString().slice(0, 10);
};

export { getDateInLongFormat, getSlicedDate };
