const cardElt = ({img, name}) => {
    return `
    <a href="#" class="friend-card" title="friend-name">
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
    constructor(container, url) {
        this.container = container;
        this.url = url;
        this.init();
    }

    init() {
        return fetch(this.url, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
         })
        .then( res => res.json())
        .then((data) => {
             console.log(data);
        });
    }

    appendElt(elt, place = document.querySelector('body')) {
        return place.append(elt);    
    }
}