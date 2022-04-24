import { CreateElements } from "./components/createElements";
import { CreatePet } from "./components/createPopup";
import { preventEvt } from "./components/evtPrevent";
import { getJson, getRandomArbitrary } from "./components/getData";
import { getNumberOfItems } from "./components/getNumberOfTiems";
import { menuOpener } from "./components/menuOpener";

const URL = 'http://localhost:3000/js/pets.json';
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
    const cardClickHandler = (evt) => {
        const target = evt.target.closest('.friend-card');
        if (target) {
            evt.preventDefault();
            const petName = Number(target.dataset.id);
            const petPopup = new CreatePet(petName, URL);
        }
    }

    cardsElt.addEventListener('click', cardClickHandler);
} catch(e) {
    console.log(e);
}



try { 
    if (cardsElt) {
        let elemsList = [];
        let petEls = [];
        let length = getNumberOfItems('slider');
        let lengthOfSlider = length * 2;

        const callback = (data) => {
            while (elemsList.length < lengthOfSlider) {
                var newElmId = getRandomArbitrary(1, data.length);
                if (!elemsList.includes(newElmId)) {
                    elemsList.push(newElmId);
                    const pet = data.find(item => item.id === newElmId);
                    const petElt = new CreateElements(cardsElt, URL, newElmId)
                    petElt.createTemplate(pet);
                    petEls.push(petElt);
                }
            }

            return elemsList;
        }

        getJson(URL, callback);
        
        const arrows = document.querySelectorAll('.slider__arrow');

        arrows.forEach(arrow => arrow.addEventListener('click', sliderEventHandler));

        cardsElt.addEventListener('animationend', animationEndHandler)

        function animationEndHandler(animation) {
            if (animation.animationName === 'move-left') {
                cardsElt.classList.remove('transition-left');
            }
            
            if (animation.animationName === 'move-right') {
                cardsElt.classList.remove('transition-right');                
            }
            
            elemsList.slice(0,length);
            elemsList = elemsList.slice(0,length);
            [...petEls.slice(-length)].forEach(item => {
                item.removeElt();
            });

            petEls = petEls.slice(0,length);

            const callback = (data) => {
                while (elemsList.length < lengthOfSlider) {
                    var newElmId = getRandomArbitrary(1, data.length);
                    if (!elemsList.includes(newElmId)) {
                        elemsList.unshift(newElmId);
                        const pet = data.find(item => item.id === newElmId);
                        const petElt = new CreateElements(cardsElt, URL, newElmId)
                        petElt.createTemplate(pet, 'before');
                        petEls.unshift(petElt);
                    }
                }
    
                return elemsList;
            }
            getJson(URL, callback);            
            
            arrows.forEach(arrow => arrow.addEventListener('click', sliderEventHandler));
        }

        function sliderEventHandler(evt) {            
            arrows.forEach(arrow => arrow.removeEventListener('click', sliderEventHandler));            
            if (evt.target.closest('.slider__arrow-right')) {
                cardsElt.classList.add('transition-right');
                console.log(length);
                for (let i = 0; i<length; i++) {
                    cardsElt.append(cardsElt.children[0]);
                }      
            }

            if (evt.target.closest('.slider__arrow-left')) {
                cardsElt.classList.add('transition-left'); 
            }                
                
        }
    }
} catch(e) {
    console.log(e);
}