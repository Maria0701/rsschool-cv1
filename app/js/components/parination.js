import { CreateElements } from "./createElements";
import { getJson } from "./getData";
import { getNumberOfItems } from "./getNumberOfTiems"
const URL = 'http://localhost:3000/js/pets.json';
const NUMBER_OF_ITEMS = 48;


export const createPagination = (container, pagination) => {
    const length = getNumberOfItems('catalog');
    const START_PAGE = pagination.querySelector('.first');
    const END_PAGE = pagination.querySelector('.last');
    const PREV_PAGE = pagination.querySelector('.prev');
    const NEXT_PAGE = pagination.querySelector('.next');
    const NUM_PAGE = pagination.querySelector('.num');
         
    let page = 1;
    let numberOnPage = length;
    let numberOfPages = NUMBER_OF_ITEMS / numberOnPage;
    let startNum = 1;
    let newArr = [];
    let currentItemsArr = [];

    const createTemplates = (itemsList) => {  
        console.log(startNum, numberOnPage);       
        for (let i = startNum; i <= numberOnPage * page; i++) {            
            const pet = itemsList[i - 1];            
            createPetsElms(pet);
        };
    };

    const createPetsArray = (data) => {
       newArr = [...data,...data, ...data, ...data, ...data, ...data];
       return newArr;
    } 
    
   
    const createPetsElms = (pet) => {
        const newElm = new CreateElements(container);
        currentItemsArr.push(newElm);
        newElm.createTemplate({
            pet, 
            tagName:'article',
            className:'catalog__card',
        });
    };  

    getJson(URL,createPetsArray)
    .then((data) => {
        newArr = data;
        createTemplates(data);
    });

    const pageTurnHandler = (evt) => {
        evt.preventDefault();
        [...currentItemsArr].forEach((item)=> {            
            item.removeElt();
            currentItemsArr.shift();
        });

        const target = evt.target;
        switch (true) {
            case NEXT_PAGE.contains(target):
                page ++;        
                startNum = startNum + numberOnPage;
                break;
            case PREV_PAGE.contains(target):
                page --;        
                startNum = startNum - numberOnPage;
                break;
            case START_PAGE.contains(target):
                page = 1;        
                startNum = 1;
                break;
            case END_PAGE.contains(target):
                page = numberOfPages;        
                startNum = NUMBER_OF_ITEMS - numberOnPage + 1;
                break;
        }
         

        if (page > 1) {
            START_PAGE.dataset.disabled = false;
            PREV_PAGE.dataset.disabled = false;
            NEXT_PAGE.addEventListener('click', pageTurnHandler);
            PREV_PAGE.addEventListener('click', pageTurnHandler);
            START_PAGE.addEventListener('click', pageTurnHandler);
            END_PAGE.addEventListener('click', pageTurnHandler);
        }

        if (page < numberOfPages) {
            END_PAGE.dataset.disabled = false;
            NEXT_PAGE.dataset.disabled = false;
            NEXT_PAGE.addEventListener('click', pageTurnHandler);
            PREV_PAGE.addEventListener('click', pageTurnHandler);
            START_PAGE.addEventListener('click', pageTurnHandler);
            END_PAGE.addEventListener('click', pageTurnHandler);
        }

        if (page === numberOfPages) {
            END_PAGE.dataset.disabled = true;
            NEXT_PAGE.dataset.disabled = true;
            NEXT_PAGE.removeEventListener('click', pageTurnHandler);
            END_PAGE.removeEventListener('click', pageTurnHandler);
        }

        if (page === 1) {
            PREV_PAGE.dataset.disabled = true;
            START_PAGE.dataset.disabled = true;
            PREV_PAGE.removeEventListener('click', pageTurnHandler);
            START_PAGE.removeEventListener('click', pageTurnHandler);
        }

        NUM_PAGE.innerText = page;
        createTemplates(newArr);
    }

    NEXT_PAGE.addEventListener('click', pageTurnHandler);
    END_PAGE.addEventListener('click', pageTurnHandler);
}