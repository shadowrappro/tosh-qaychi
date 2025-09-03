import { hands } from "./constans.js";
import { mode } from "./mode.js";

export function aiChoose(mode = "easy") {
    const randomIndex = Math.trunc(Math.random() * (mode === "easy" ? 3 : 5));
    return hands[randomIndex];
}
