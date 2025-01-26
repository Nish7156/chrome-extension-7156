// eventHandlers.ts
import { addDummyImage } from './domUtils';

export const setupEventHandlers = (setShowContent: (value: boolean) => void) => {
    const domLoaded = () => {
        console.log("DOM fully loaded and parsed");
        addDummyImage(setShowContent);
    };

    if (document.readyState === "complete") {
        console.log("DOM is already complete");
        domLoaded();
    } else {
        window.addEventListener('load', () => {
            console.log("Content loaded");
            console.log(window.location.href);
            domLoaded();
        });
    }
};
