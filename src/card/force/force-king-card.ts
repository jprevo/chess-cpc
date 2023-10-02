import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForceKingCard extends ForceCard {
  public static readonly id: string = "force-king";
  protected type: PieceSymbol = "k";
  protected title: string = "Roi";
}
