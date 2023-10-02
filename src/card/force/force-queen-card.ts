import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForceQueenCard extends ForceCard {
  public static readonly id: string = "force-queen";
  protected type: PieceSymbol = "q";
  protected title: string = "Dame";
}
