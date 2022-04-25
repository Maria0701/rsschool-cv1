const bodyElement = document.querySelector('body');

export function menuOpener (opener, elt, eltToOpen, closeElt) {

    const headerElt = eltToOpen;
    const overlay = document.querySelector('.overlay');
    const closeEl = closeElt || opener;
    const menuLinks = [...headerElt.querySelectorAll('.menu__link')];

    

    function outOfAreaHandler(evt) {
        if (elt.contains(evt.target))  return;        
        closeHandler();
    }    
    

    function closeHandler() {
        headerElt.classList.remove('opened');
        bodyElement.classList.remove('overflow-hidden');
        closeEl.removeEventListener('click', closeHandler);
        overlay.removeEventListener('click', outOfAreaHandler);
        opener.addEventListener('click', openHandler);
        overlay.classList.remove('overlay--active');
    }

    function openHandler() { 
        closeOtherElts();
        bodyElement.classList.add('overflow-hidden'); 
        headerElt.classList.add('opened');
        opener.removeEventListener('click', openHandler);
        closeEl.addEventListener('click', closeHandler);
        overlay.addEventListener('click', outOfAreaHandler);
        overlay.classList.add('overlay--active');
    }

    function closeOtherElts() {
        const opened = document.querySelector('.opened')
        if (opened && opened !==headerElt)  opened.classList.remove('opened');
    }

    menuLinks[menuLinks.length - 1].addEventListener('click', (evt) => {
        evt.preventDefault();
        closeHandler();
        const blockId = menuLinks[menuLinks.length - 1].getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         })
        

    });

    opener.addEventListener('click', openHandler);
}