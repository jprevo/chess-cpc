import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForceKnightCard extends ForceCard {
  public static readonly id: string = "force-knight";
  protected type: PieceSymbol = "n";
  protected title: string = "Cavalier";
}
