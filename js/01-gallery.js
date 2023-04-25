import { galleryItems } from "./gallery-items.js";

const refs = {
    targetElement: document.querySelector(".gallery"),
};

const variables = {
    largeImageUrl: "",
    isBasicLightboxVisible: "",
    instance: "",
};
/**
 * Creates markup for one gallery item
 * @param {object} galleryItem
 * @returns {string} String with markup
 */
const createGalleryElement = (galleryItem) => {
    const { preview, original, description } = galleryItem;
    return `
    <li class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
            />
        </a>
    </li>`;
};
/**
 * Gets event target (large image) url, checks if right target was clicked
 * @param {event} event
 */
const getLargeImageUrl = (event) => {
    event.preventDefault();
    const imageUrl = event.target.dataset.source;
    if (event.target.nodeName !== "IMG") {
        return;
    }
    variables.largeImageUrl = imageUrl;
};
/**
 * Checks if modal window was opened, closes modal window only by ESC key
 * @param {event} event
 */
const onEscPress = (event) => {
    if (variables.isBasicLightboxVisible && event.key === "Escape") {
        variables.instance.close();
        variables.isBasicLightboxVisible = !variables.isBasicLightboxVisible;
    }
};
/**
 * Opens modal window with large image, checks if right target was clicked
 * @param {event} event
 */
const onOpenModal = (event) => {
    if (event.target.nodeName !== "IMG") {
        return;
    }
    variables.instance = basicLightbox.create(
        `
		<img width="1400" height="900" src=${variables.largeImageUrl}>
	`,
        {
            onShow: () => {
                window.addEventListener("keydown", onEscPress);
            },
            onClose: () => {
                window.removeEventListener("keydown", onEscPress);
            },
        }
    );
    variables.instance.show();
    variables.isBasicLightboxVisible = basicLightbox.visible();
};

const createdGallery = galleryItems.map(createGalleryElement).join("");
refs.targetElement.insertAdjacentHTML("afterbegin", createdGallery);
refs.targetElement.addEventListener("click", getLargeImageUrl);
refs.targetElement.addEventListener("click", onOpenModal);
