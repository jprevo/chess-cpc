import { Engine } from "./engine";
import { GameMode } from "./types";

const engine: Engine = new Engine(GameMode.Ai);

document.addEventListener("DOMContentLoaded", () => {
  engine.start("board");

  const party: HTMLElement | null = document.getElementById("party-mode");

  if (party) {
    party.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();

      return engine.playCard("party");
    });
  }
});

/*

sayan.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();

  const pieces = game.board();

  pieces.forEach((line) => {
    if (!line) {
      return;
    }

    line.forEach((piece) => {
      if (!piece) {
        return;
      }

      if (piece.color === "w") {
        if (piece.type === "p") {
          game.remove(piece.square);
          game.put(
            {
              type: "q",
              color: "w",
            },
            piece.square,
          );
        }
      }
    });
  });

  const fen = game.fen();
  game.load(fen);

  board.position(fen, false);
});
 */
