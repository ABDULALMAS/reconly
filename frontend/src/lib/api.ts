const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const analyzeCompany = async (
  url: string,
) => {
  const response = await fetch(
    `${API_URL}/api/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    },
  );

  const data =
    await response.json();

    console.log("data:",data)

  if (!response.ok) {
    throw {
      code:
        data.code ??
        "UNKNOWN_ERROR",

      message:
        data.message ??
        "Analysis failed.",
    };
  }

  return data.data;
};