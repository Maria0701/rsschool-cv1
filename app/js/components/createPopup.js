import { getJson } from "./getData";

const elementInside = ({img, name,type, breed, description, age, inoculations, diseases, parasites}) => {
    return `
        <button class="popup__button button-circle">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
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