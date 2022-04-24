import { getJson } from "./getData";


const cardElt = ({id, img, name}) => {
    return `
    <a href="#" class="friend-card" title="friend-name" data-id="${id}">
        <div class="friend__img-wrapper">
            <img src="${img}" class="friend__img">
        </div>    
        <div class="friend__description">
            <span class="friend__name">${name}</span>
            <button class="button button--light friend__button">
                Learn more
            </button>
        </div>    
    </a>`;
};

export class CreateElements {
    constructor(container, url, id) {
        this.container = container;
        this.url = url;
        this.id = id;
        this.elt = null;
        this.callback = this.callback.bind(this);  
    }

    init() {
        return getJson(this.url, this.callback);
    }

    callback(data) {       
        const pet = data.find(item => item.id === this.id);
        this.createTemplate(pet);
    }

    createTemplate(pet, place) {
        const content = this.createElementContent(pet);       
        const elt = this.createElt('div', 'slider__item', 'beforeend', content);
        place === 'before' ? this.prependElt(elt, this.container) : this.appendElt(elt, this.container);
    }


    appendElt(elt, place = document.querySelector('body')) {
        return place.append(elt);    
    }

    prependElt(elt, place = document.querySelector('body')) {
        return place.prepend(elt);    
    }

    createElementContent(obj) {
        return cardElt(obj);
    }

    createElt(tagName, className, place, content) {
        this.elt = document.createElement(tagName);
        this.elt.classList.add(className)
        this.elt.insertAdjacentHTML(place, content); 
        return this.elt;
    }

    removeElt() {
        this.elt.parentNode.removeChild(this.elt);
    }
}