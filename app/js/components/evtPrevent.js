export function preventEvt(elt, eventName) {
    elt.addEventListener(eventName, (evt) => {
        evt.preventDefault();
    })
};