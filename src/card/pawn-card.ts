import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, PAWN, Square } from "chess.js";
import { Util } from "../util";

export class PawnCard extends Card {
  public static readonly id: string = "pawn";

  get level(): CardLevel {
    return CardLevel.Good;
  }

  get name(): string {
    return "Ivan a recruté un·e stagiaire";
  }

  get description(): string {
    return "Vous gagnez un pion positionné aléatoirement, prêt à se sacrifier pour la gloire de la rédac.";
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const occupied: string[] = [];

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        occupied.push(piece.square);
      });
    });

    const letters: string[] = "abcdefgh".split("");
    const numbers: string[] = "765432".split(""); // remove first lines
    let n: number = 0;

    while (n++ < 500) {
      Util.shuffle(letters);
      Util.shuffle(numbers);

      let square: Square = (letters[0] + numbers[0]) as Square;

      if (occupied.includes(square)) {
        continue;
      }

      engine.game.put(
        {
          type: PAWN,
          color: engine.turn as Color,
        },
        square,
      );

      break;
    }

    engine.setPosition(engine.game.fen());

    return true;
  }
}
