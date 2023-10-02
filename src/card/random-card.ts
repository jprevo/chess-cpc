import { Card } from "./card";
import { Engine } from "../engine";
import { CardLevel } from "../types";
import {
  Color,
  Square,
  Piece,
  WHITE,
  BLACK,
  Chess,
  PieceSymbol,
} from "chess.js";
import { Util } from "../util";

export class RandomCard extends Card {
  public static readonly id: string = "random";

  get level(): CardLevel {
    return CardLevel.Chaos;
  }

  get name(): string {
    return "GROS BORDEL";
  }

  get description(): string {
    return "C'est soir de bouclage et le chaos règne à la rédac. Toutes les pièces de même couleur se mélangent.";
  }

  async play(engine: Engine): Promise<boolean> {
    const game: Chess = engine.game;
    const board = game.board();
    const wPieces: { square: Square; type: PieceSymbol; color: Color }[] = [];
    const bPieces: { square: Square; type: PieceSymbol; color: Color }[] = [];
    const turn: "b" | "w" = engine.turn;

    board.forEach((line) => {
      if (!line) {
        return;
      }

      line.forEach((piece) => {
        if (!piece) {
          return;
        }

        if (piece.color === WHITE) {
          wPieces.push(piece);
        } else {
          bPieces.push(piece);
        }
      });
    });

    const wRandom: Piece[] = [...wPieces];
    const bRandom: Piece[] = [...bPieces];

    Util.shuffle(wRandom);
    Util.shuffle(bRandom);

    game.clear();

    for (let i in wRandom) {
      game.put(
        {
          type: wRandom[i].type,
          color: WHITE,
        },
        wPieces[i].square,
      );
    }

    for (let i in bRandom) {
      game.put(
        {
          type: bRandom[i].type,
          color: BLACK,
        },
        bPieces[i].square,
      );
    }

    let fen: string = game.fen();
    fen = Util.setTurn(fen, turn);

    engine.setPosition(fen);

    return true;
  }
}
