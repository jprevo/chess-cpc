import { BLACK, WHITE } from "chess.js";

export class Util {
  public static shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  public static setTurn(fen: string, turn: "b" | "w"): string {
    const parts: string[] = fen.split(" ");
    parts[1] = turn;
    parts[3] = "-"; // en passant flag

    return parts.join(" ");
  }
}
