import { switchZone } from "./switch-zone.js";
import { elAi, elClickSound } from "./html-elements.js";

export function refreshGame() {
    switchZone(false)
    elAi.src = '/images/oval.svg';
}