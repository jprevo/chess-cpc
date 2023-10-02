import { CardsIndex } from "./types";
import { PartyCard } from "./card/party-card";
import { QueensCard } from "./card/queens-card";
import { KnightCard } from "./card/knight-card";
import { ReverseCard } from "./card/reverse-card";
import { AckbooCard } from "./card/ackboo-card";
import { ColoredCard } from "./card/colored-card";
import { VomitCard } from "./card/vomit-card";

export const Cards: CardsIndex = {
  [PartyCard.id]: PartyCard,
  [QueensCard.id]: QueensCard,
  [KnightCard.id]: KnightCard,
  [ReverseCard.id]: ReverseCard,
  [AckbooCard.id]: AckbooCard,
  [ColoredCard.id]: ColoredCard,
  [VomitCard.id]: VomitCard,
};
