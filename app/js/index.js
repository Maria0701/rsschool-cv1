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