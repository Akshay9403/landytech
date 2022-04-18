export default async function handleErrors(response) {
  if (!response.ok) {
    const result = await response.json()
    throw Error(result.error);
  }
  return response;
}
