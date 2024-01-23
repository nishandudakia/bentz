export async function fetchCountries(url) {
  try {
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data and return it
    return response.json();
  } catch (error) {
    // Forward the error
    throw error;
  }
}
