import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForceBishopCard extends ForceCard {
  public static readonly id: string = "force-bishop";
  protected type: PieceSymbol = "b";
  protected title: string = "Fou";
}
