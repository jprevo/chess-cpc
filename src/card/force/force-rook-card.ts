import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForceRookCard extends ForceCard {
  public static readonly id: string = "force-rook";
  protected type: PieceSymbol = "r";
  protected title: string = "Tour";
}
