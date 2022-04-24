import { getJson, getRandomArbitrary } from "./getData";
import { getNumberOfItems } from "./getNumberOfTiems";
import { CreateElements } from "./createElements";

export const sliderMover = (cardsElt, URL) => {
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
                    const petElt = new CreateElements(cardsElt)
                    petElt.createTemplate({
                        pet, 
                        tagName:'div',
                        className:'slider__item',
                    });
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
                        petElt.createTemplate({
                            pet, 
                            place:'before',
                            tagName:'div',
                            className:'slider__item',
                        });
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
};