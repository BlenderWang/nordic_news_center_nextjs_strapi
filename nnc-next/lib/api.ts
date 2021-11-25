export function getStrapiURL(path = "") {
    return `${process.env.STRAPI_API}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    // const response = await fetch(requestUrl);
    const baseUrl = process.env.STRAPI_API
    const response = await fetch(`${baseUrl}/${path}`);
    const data = await response.json();
    return data;
}
