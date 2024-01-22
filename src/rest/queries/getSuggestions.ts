const getSuggestions = async (text: string, site: string) => {
  const url = `${process.env.NEXT_PUBLIC_REST_SUGGESTIONS_URL}?site=${site}`;

  const res = await fetch(`${url}&q=${text}`);

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
};

export default getSuggestions;
