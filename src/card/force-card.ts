import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import { Color, PieceSymbol, Square } from "chess.js";

export abstract class ForceCard extends Card {
  public static readonly id: string = "force";
  protected type: PieceSymbol = "p";
  protected title: string = "Pion";

  get level(): CardLevel {
    return CardLevel.Bad;
  }

  get name(): string {
    return "Restrictions";
  }

  get description(): string {
    return `Pour des raisons de budget, vous ne pouvez bouger que les pièces de type suivant : ${this.title}`;
  }

  get help(): string {
    return `Si impossible, mouvement libre.`;
  }

  async play(engine: Engine): Promise<boolean> {
    const pieces = engine.game.board();
    const color: Color = engine.turn as Color;
    const allowed: Square[] = [];

    pieces.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.color === color) {
          if (piece.type === this.type) {
            const moves = engine.game.moves({
              square: piece.square,
            });

            if (moves.length) {
              allowed.push(piece.square);
            }
          }
        }
      });
    });

    if (!allowed.length) {
      return false;
    }

    engine.setAllowed(allowed);

    return true;
  }
}
