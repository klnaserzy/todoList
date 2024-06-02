import { backgroundImages as backgroundImagePath } from "./fetchBackgroundImg.js";

const gallery = document.getElementById("gallery");
const imgBox = document.getElementsByClassName("imgBox");
const modalContainer = document.getElementById("modal-container");
const modalClose = document.getElementById("modal-close");
const modal = document.getElementById("modal");

window.onclick = (event) => {
    if(event.target === modalContainer || event.target === modalClose){
        modalContainer.style.display = "none";
        modal.innerHTML = ``;
    }
}

gallery.innerHTML = ``;

backgroundImagePath.map(el => {
    gallery.insertAdjacentHTML('beforeend', `    
        <span class="imgBox">
            <img class="galleryImg" src="${el.imgPath}" />
            <p>${el.photographer}</p>
        </span>
    `);
});


for(let i = 0; i < imgBox.length; ++i){
    imgBox[i].addEventListener("click", () => {
        modalContainer.style.display = "block";
        modal.insertAdjacentHTML("afterbegin", `
            <img id="modalImg" src="${backgroundImagePath[i].imgPath}" alt="landscape">
            <div id="gotoLink">
                <a href="https://www.pexels.com/zh-tw/" class="pexelsLink" target="_blank">
                    <img style="width: 100px;" src="https://images.pexels.com/lib/api/pexels-white.png" />
                </a>
                <a href="${backgroundImagePath[i].imgUrl}" class="imgUrl" target="_blank">
                    <i class="fa fa-solid fa-image fa-2xl" title="watch background images"></i>
                    <p>photo</p>
                </a>
                <a href="${backgroundImagePath[i].photographer_url}" class="photographer" target="_blank">
                    <i class="fa-solid fa-user fa-2xl"></i>
                    <p>${backgroundImagePath[i].photographer}</p>
                </a>
            </div>
        `)
    })
}