import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
    const imageUrl = media.url.startsWith("/")
        ? getStrapiURL(media.url)
        : media.url;
    //return imageUrl;
    console.log(media.url)
    return media.url;
}
