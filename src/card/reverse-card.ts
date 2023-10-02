import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { QUEEN } from "chess.js";

export class ReverseCard extends Card {
  public static readonly id: string = "reverse";

  get level(): CardLevel {
    return CardLevel.Chaos;
  }

  get name(): string {
    return "Revirement de situation";
  }

  get description(): string {
    return "Vous avez réussi à convertir la reine adverse à votre cause. Mais l'adversaire à fait pareil ! Inversion des couleurs des reines.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.type === QUEEN) {
          engine.game.remove(piece.square);
          engine.game.put(
            {
              type: piece.type,
              color: piece.color === "b" ? "w" : "b",
            },
            piece.square,
          );
        }
      });
    });

    engine.setPosition(engine.game.fen());

    return true;
  }
}
