import { getJson } from "./getData";

const elementInside = ({img, name,type, breed, description, age, inoculations, diseases, parasites}) => {
    return `
        <button class="popup__button button-circle">
            <svg width="12" height="12">
                <use xlink:href="img/sprite.svg#icon-cross"></use>
            </svg>
        </button>
        <div class="popup__img-wrapper">
            <img class="popup__img" src="${img}" alt="${name}">
        </div>
        <div class="popup__content">
            <div class="popup__name">${name}</div>
            <div class="popup__kind">${type} - ${breed}</div>
            <div class="popup__text">${description}</div>
            <ul class="popup__list">
                <li class="popup__item">Age: <span>${age}</span></li>
                <li class="popup__item">Inoculations: <span>${inoculations.join(', ')}</span></li>
                <li class="popup__item">Diseases: <span>${diseases.join(', ')}</span></li>
                <li class="popup__item">Parasites: <span>${parasites.join(', ')}</span></li>
            </ul>
        </div>
    `}; 

const bodyElement = document.querySelector('body');

export class CreatePet {
    constructor(id, url) {
        this.id = id;
        this.elt = null;
        this.url = url;
        this.overlay = document.querySelector('.overlay');
        this.closeElt = null;
        this.closeHandler = this.closeHandler.bind(this);
        this.callback = this.callback.bind(this);
        this.init();
    }

    init() {
        return getJson(this.url, this.callback);
    }

    callback(data) {
        const pet = data.find(item => item.id === this.id);
        this.appendElt(this.createElt(pet));
        bodyElement.classList.add('overflow-hidden');
        if (this.overlay) this.overlay.classList.add('overlay--active');
        this.startEventListeners();
    }

    appendElt(elt, place = this.overlay) {
        return place.after(elt);    
    }

    startEventListeners() {
        this.closeElt = this.elt.querySelector('.popup__button');
        this.overlay.addEventListener('click', this.closeHandler);
        this.closeElt.addEventListener('click', this.closeHandler);
    }
    
    closeHandler() {
        if (this.overlay) this.overlay.classList.remove('overlay--active');
        bodyElement.classList.remove('overflow-hidden');
        this.overlay.removeEventListener('click', this.closeHandler);
        this.closeElt = null;
        this.elt.parentNode.removeChild(this.elt);
        this.elt = null;
    }

    createElt(obg) {
        this.elt = document.createElement('div');
        this.elt.classList.add('popup')
        this.elt.insertAdjacentHTML('beforeend',elementInside(obg)); 
        return this.elt;
    }
}