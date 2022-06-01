export const getCompletion = async (input) => {
  if (input.length === 0) {
    return {
      error: "Input is empty",
    };
  }

  const { data } = await fetch(
    `${process.env.REACT_APP_AI_SERVER_URL}/study-notes?input=${input}`
  ).then((res) => res.json());

  return data;
};
