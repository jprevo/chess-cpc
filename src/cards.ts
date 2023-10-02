import { CardsIndex } from "./types";
import { PartyCard } from "./card/party-card";
import { QueensCard } from "./card/queens-card";
import { KnightCard } from "./card/knight-card";
import { ReverseCard } from "./card/reverse-card";
import { AckbooCard } from "./card/ackboo-card";
import { ColoredCard } from "./card/colored-card";
import { VomitCard } from "./card/vomit-card";
import { AngleCard } from "./card/angle-card";
import { LossCard } from "./card/loss-card";
import { ForcePawnCard } from "./card/force/force-pawn-card";
import { ForceBishopCard } from "./card/force/force-bishop-card";
import { ForceKnightCard } from "./card/force/force-knight-card";
import { ForceRookCard } from "./card/force/force-rook-card";
import { ForceQueenCard } from "./card/force/force-queen-card";
import { ForceKingCard } from "./card/force/force-king-card";
import { PassCard } from "./card/pass-card";

export const Cards: CardsIndex = {
  /*[PartyCard.id]: PartyCard,
  [QueensCard.id]: QueensCard,
  [KnightCard.id]: KnightCard,
  [ReverseCard.id]: ReverseCard,
  [AckbooCard.id]: AckbooCard,
  [ColoredCard.id]: ColoredCard,
  [VomitCard.id]: VomitCard,
  [AngleCard.id]: AngleCard,
  [LossCard.id]: LossCard,
  [ForcePawnCard.id]: ForcePawnCard,
  [ForceKnightCard.id]: ForceKnightCard,
  [ForceBishopCard.id]: ForceBishopCard,
  [ForceRookCard.id]: ForceRookCard,
  [ForceQueenCard.id]: ForceQueenCard,
  [ForceKingCard.id]: ForceKingCard,*/
  [PassCard.id]: PassCard,
  [ForcePawnCard.id]: ForcePawnCard,
  [ForceKnightCard.id]: ForceKnightCard,
};
