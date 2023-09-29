import { CardsIndex } from "./types";
import { PartyCard } from "./card/party-card";

export const Cards: CardsIndex = {
  [PartyCard.id]: new PartyCard(),
};
