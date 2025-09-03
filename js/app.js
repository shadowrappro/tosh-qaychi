import { switchZone } from "./switch-zone.js";
import { aiChoose } from "./ai-choose.js";
import { checkWinner } from "./check-winner.js";
import { aiPoints, elAi, elClickSound, elHands, elPlayer, elRefreshGame, elStatus, yourPoints } from "./html-elements.js";
import { mode } from "./mode.js";
import { refreshGame } from "./refresh-game.js";

elHands.forEach((hand) => {
    hand.addEventListener("click", (evt) => {
        elClickSound.play()
        setTimeout(() => {
            const player = evt.target.alt;
            const playerSrc = evt.target.src
            switchZone(true)
            elPlayer.src = playerSrc;

            setTimeout(() => {
                const ai = aiChoose(mode)
                elAi.src = `/images/${ai}.svg`
                const winner = checkWinner(ai,player)
                elStatus.innerText = winner
                if (winner === 'You win!') {
                    const newPlayerPoint = Number(yourPoints.textContent);
                    yourPoints.textContent = newPlayerPoint + 1
                } else if(winner === 'You lose') {
                    const newAiPoint = Number(aiPoints.textContent);
                    aiPoints.textContent = newAiPoint + 1
                }
            }, 1000)
        }, 1000)
    })
})

elRefreshGame.addEventListener("click", refreshGame)