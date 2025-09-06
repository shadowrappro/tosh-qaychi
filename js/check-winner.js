import { aiChoose } from "./ai-choose.js";
import { lizard, paper, rock, scissors, spock } from "./constans.js";
import { elLoseSound, elWinSound } from "./html-elements.js";
import { mode } from "./mode.js";

export function checkWinner(ai, player) {
    if (ai == player) {
        return "Draw";
    } else if(ai === paper && player === rock) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === rock && player === scissors) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === scissors && player === paper) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === spock && player && rock) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === spock && player && scissors) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === lizard && player && spock) {
        elLoseSound.play();
        return "You lose";
    } else if(ai === spock && player && paper) {
        elLoseSound.play();
        return "You lose";
    } else {
        elWinSound.play();
        return "You win!";
    }
};