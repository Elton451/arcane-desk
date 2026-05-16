const getInitials = (val: string) => {
  return val
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();
};

export default getInitials;
