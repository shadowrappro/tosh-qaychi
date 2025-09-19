import { switchZone } from "./switch-zone.js";
import { aiChoose } from "./ai-choose.js";
import { checkWinner } from "./check-winner.js";
import { aiPoints, channel, elAi, elClickSound, elHands, elModeChangerButton, elModeWrapper, elPlayer, elRefreshGame, elStatus, yourPoints } from "./html-elements.js";
import { mode, modeChanger } from "./mode.js";
import { refreshGame } from "./refresh-game.js";

let isRemote = false;

elHands.forEach((hand, index) => {
    hand.addEventListener("click", (evt) => {
        if (!isRemote) {
            channel.postMessage( {type: "handClick", handIndex: index} )
        }

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

elModeChangerButton.addEventListener("click", () => {
    if(mode === "EASY"){
        modeChanger("HARD")
        elModeWrapper.classList.add("hardMode")
        channel.postMessage("hard")
    } else {
        modeChanger("EASY")
        elModeWrapper.classList.remove("hardMode")
        channel.postMessage("easy")
    }
})

elRefreshGame.addEventListener("click", () => {
    refreshGame()
    channel.postMessage("refresh")
})

channel.addEventListener("message", (evt) => {
    if (evt.data === "hard") {
        modeChanger("HARD")
        elModeWrapper.classList.add("hardMode")
    } else if (evt.data === "easy") {
        modeChanger("EASY")
        elModeWrapper.classList.remove("hardMode")
    } else if (evt.data === "refresh") {
        refreshGame()
    }

    isRemote = true;

    const {type, handIndex} = evt.data

    if (type === "handClick") {
        elHands[handIndex].click()
    }

    isRemote = false;
})