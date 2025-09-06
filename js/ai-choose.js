import { hands } from "./constans.js";
import { mode } from "./mode.js";

export function aiChoose(mode) {
    const randomIndex = Math.trunc(Math.random() * (mode === "EASY" ? 3 : 5));
    return hands[randomIndex];
}
