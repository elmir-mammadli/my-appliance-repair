export const openHiringModal = () => {
 if (typeof window !=='undefined') {
 window.dispatchEvent(new CustomEvent('open-hiring'));
 }
};
