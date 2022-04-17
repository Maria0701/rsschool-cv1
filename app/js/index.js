import { CreatePet } from "./components/createPopup";
import { preventEvt } from "./components/evtPrevent";
import { menuOpener } from "./components/menuOpener";

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
    const menuLinks = document.querySelectorAll('.menu__link');
    const menuLinksLength = menuLinks.length;

    menuLinks.forEach((item, id) => {
        if (id === (menuLinksLength - 1) || id === (menuLinksLength - 2)) {
            preventEvt(item, 'click');
        }
    })
} catch(e) {
    console.log(e);
}

try {
    const cardsElt = document.querySelector('.slider__list');

    const cardClickHandler = (evt) => {
        const target = evt.target.closest('.friend-card');
        if (target) {
            evt.preventDefault();
            const petName = target.querySelector('.friend__name').textContent;
            const petPopup = new CreatePet(petName);
        }
    }

    cardsElt.addEventListener('click', cardClickHandler);
} catch(e) {
    console.log(e);
}