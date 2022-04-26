
import { CreatePet } from "./components/createPopup";
import { preventEvt } from "./components/evtPrevent";
import { menuOpener } from "./components/menuOpener";
import { createPagination } from "./components/parination";
import { sliderMover } from "./components/slider";

const URL = './js/pets.json';
const cardsElt = document.querySelector('.slider__list');

try {
    const opener = document.querySelector('.js-toggler');
    const menuElt = document.querySelector('.header__menu');  
    
    if (opener && menuElt) {
        const eltToOpen = document.querySelector('.header');
        menuOpener(opener, menuElt, eltToOpen);
    }    
} catch(e) {
    console.log(e);
}

try {
    if (cardsElt) {
        const cardClickHandler = (evt) => {
            const target = evt.target.closest('.friend-card');
            if (target) {
                evt.preventDefault();
                const petName = Number(target.dataset.id);
                const petPopup = new CreatePet(petName, URL);
            }
        }
        cardsElt.addEventListener('click', cardClickHandler);
    }
    
} catch(e) {
    console.log(e);
}

try { 
    if (cardsElt) {
        sliderMover(cardsElt, URL);
    }
} catch(e) {
    console.log(e);
}


try {
    const pageElt = document.querySelector('.catalog__cards');
    const paginationElt = document.querySelector('.pagination');
    if (pageElt) {
        pageElt.innerHTML = '';
        createPagination(pageElt, paginationElt, URL); 
        
        const cardClickHandler = (evt) => {
            const target = evt.target.closest('.friend-card');
            if (target) {
                evt.preventDefault();
                const petName = Number(target.dataset.id);
                const petPopup = new CreatePet(petName, URL);
            }
        }
        pageElt.addEventListener('click', cardClickHandler);
    };
} catch(e) {
    console.log(e);
}