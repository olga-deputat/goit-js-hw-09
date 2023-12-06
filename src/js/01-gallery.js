import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

const galleryMarkup = createGalleryItems(galleryItems);
function createGalleryItems(items) {
    return items.map(({ preview, original, description }) => {
        return `<li class="gallery_item">
            <a class="gallery_link" href="${original}">
                <img 
                    class="gallery_image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    }).join("");
}
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
const lightbox = new SimpleLightbox('.gallery a', {  });

