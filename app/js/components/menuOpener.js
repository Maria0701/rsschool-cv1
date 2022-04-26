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
        menuLinks.forEach(item => item.removeEventListener('click', linksHahdler));
    }

    function openHandler() { 
        closeOtherElts();
        bodyElement.classList.add('overflow-hidden'); 
        headerElt.classList.add('opened');
        opener.removeEventListener('click', openHandler);
        closeEl.addEventListener('click', closeHandler);
        overlay.addEventListener('click', outOfAreaHandler);
        overlay.classList.add('overlay--active');
        menuLinks.forEach(item => item.addEventListener('click', linksHahdler));
    }

    function closeOtherElts() {
        const opened = document.querySelector('.opened')
        if (opened && opened !==headerElt)  opened.classList.remove('opened');
    }

    function linksHahdler(evt) {
        const target = evt.target.closest('.menu__link');
        if (target.classList.contains('menu__link--active')) {
            closeHandler();
            return;
        }

        const blockId = target.getAttribute('href');
        if (blockId.startsWith('#')) {
            evt.preventDefault();
            closeHandler();
            document.querySelector(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })        
        }    
    }

    

    opener.addEventListener('click', openHandler);
}