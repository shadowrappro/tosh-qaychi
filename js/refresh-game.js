import { switchZone } from "./switch-zone.js";
import { elAi, elClickSound } from "./html-elements.js";

export function refreshGame() {
    elClickSound.play()
    setTimeout(() => {
        switchZone(false)
        elAi.src = '/images/oval.svg'
    }, 1000)
}