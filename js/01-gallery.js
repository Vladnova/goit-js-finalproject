import { galleryItems } from "./gallery-items.js";
// Change code below this line

const list = document.querySelector(".gallery");
list.addEventListener("click", handlerClick);

let instance;

function handlerClick(e) {
  e.preventDefault();
  const { currentTarget, target } = e;

  if (currentTarget === target) {
    return;
  }

  window.addEventListener("keydown", handlerCloseEscape);

  instance = basicLightbox.create(`
  <img src="${target.dataset.source}" width="800" height="600">
  `);
  instance.show();
  closeModalClickBackdrop();
}

function handlerCloseEscape(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
function closeModalClickBackdrop() {
  const modalBackdrop = document.querySelector(".basicLightbox");
  modalBackdrop.addEventListener("click", closeModal);
}

function closeModal() {
  instance.close();
  window.removeEventListener("keydown", handlerCloseEscape);
}


function createMarkup(arr) {
  return arr
    .map(
      ({ description, original, preview }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src=${preview}
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </li>`
    )
    .join("");
}

list.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
