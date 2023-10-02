import { ForceCard } from "../force-card";
import { PieceSymbol } from "chess.js";

export class ForcePawnCard extends ForceCard {
  public static readonly id: string = "force-pawn";
  protected type: PieceSymbol = "p";
  protected title: string = "Pion";
}
