"use server";

const a = () => {
  console.log("rendered on the server");
  return "Expensive data computed on server";
};

export { a };
