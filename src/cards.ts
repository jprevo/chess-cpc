import { CardsIndex } from "./types";
import { PartyCard } from "./card/party-card";
import { QueensCard } from "./card/queens-card";

export const Cards: CardsIndex = {
  [PartyCard.id]: PartyCard,
  [QueensCard.id]: QueensCard,
};
