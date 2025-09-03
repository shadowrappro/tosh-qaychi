import { elGameZone, elProcessZone, elStatus } from "./html-elements.js";

export function switchZone(boolean) {
    if (boolean) {
        elGameZone.classList.add("hidden")
        elProcessZone.classList.remove("hidden")
        elProcessZone.classList.add("flex")
        elStatus.classList.remove("hidden")
        elStatus.innerText = ''
    } else {
        elGameZone.classList.remove("hidden")
        elProcessZone.classList.add("hidden")
        elStatus.classList.add("hidden")
    }
}