
export const getNumberOfItems = (type) => { 
    let num; 
    switch (type) {
        case 'slider':
            if  (window.matchMedia("(max-width: 767px)").matches) {
                num = 1;
            } else if (window.matchMedia("(max-width: 1279px)").matches) {
                num = 2;
            } else {
                num = 3;
            }
          break;
        case 'catalog':
            if  (window.matchMedia("(max-width: 767px)").matches) {
                num = 1;
            } else if (window.matchMedia("(max-width: 1279px)").matches) {
                num = 2;
            } else {
                num = 4;
            }
          break;
        default:
            alert( "Нет таких значений" );
    }
    return num;
}