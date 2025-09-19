import { switchZone } from "./switch-zone.js";
import { aiChoose } from "./ai-choose.js";
import { checkWinner } from "./check-winner.js";
import { aiPoints, channel, elAi, elClickSound, elHands, elModeChangerButton, elModeWrapper, elPlayer, elRefreshGame, elStatus, yourPoints } from "./html-elements.js";
import { mode, modeChanger } from "./mode.js";
import { refreshGame } from "./refresh-game.js";

let isRemote = false;

function showResult(playerSrc, aiSrc, winner) {
    switchZone(true);
    elPlayer.src = playerSrc;
    setTimeout(() => {
        elAi.src = aiSrc;
        elStatus.innerText = winner;

        if (winner === "You win!") {
            yourPoints.textContent = Number(yourPoints.textContent) + 1;
        } else if (winner === "You lose") {
            aiPoints.textContent = Number(aiPoints.textContent) + 1;
        }
    }, 1000)
}

elHands.forEach((hand) => {
    hand.addEventListener("click", (evt) => {
        elClickSound.play();
        if (!isRemote) {
            const player = evt.target.alt;
            const playerSrc = evt.target.src;
            const ai = aiChoose(mode);
            const aiSrc = `/images/${ai}.svg`;
            const winner = checkWinner(ai, player);
            channel.postMessage({
                type: "result",
                playerSrc,
                aiSrc,
                winner
            });
            showResult(playerSrc, aiSrc, winner);
        }
    });
});

elModeChangerButton.addEventListener("click", () => {
    if (mode === "EASY") {
        modeChanger("HARD");
        elModeWrapper.classList.add("hardMode");
        channel.postMessage("hard");
    } else {
        modeChanger("EASY");
        elModeWrapper.classList.remove("hardMode");
        channel.postMessage("easy");
    }
});

elRefreshGame.addEventListener("click", () => {
    refreshGame();
    channel.postMessage("refresh");
});

channel.addEventListener("message", (evt) => {
    if (evt.data.type === "result") {
        isRemote = true;
        const { playerSrc, aiSrc, winner } = evt.data;
        showResult(playerSrc, aiSrc, winner);
        isRemote = false;
    } else if (evt.data === "hard") {
        modeChanger("HARD");
        elModeWrapper.classList.add("hardMode");
    } else if (evt.data === "easy") {
        modeChanger("EASY");
        elModeWrapper.classList.remove("hardMode");
    } else if (evt.data === "refresh") {
        refreshGame();
    }
});