import { CardFace } from "./types";
import { Engine } from "./engine";
import { Card } from "./card/card";

export class CardDeck {
  public constructor(
    protected deckId: string,
    protected engine: Engine,
  ) {
    const stack: HTMLElement | null = document.getElementById(deckId);

    if (!stack) {
      return;
    }

    for (let i = 0; i < 100; i++) {
      const index = Math.floor(Math.random() * Object.keys(CardFace).length);
      const face: CardFace = Object.values(CardFace)[index];

      engine.faces.push(face);
    }

    for (let i = engine.faces.length - 1; i >= 0; i--) {
      const card: HTMLDivElement = document.createElement("div");
      card.classList.add("card");
      card.id = `card-${i.toString(10)}`;
      card.dataset.position = i.toString(10);

      const content: HTMLDivElement = document.createElement("div");
      content.classList.add("card-content");

      const front: HTMLDivElement = document.createElement("div");
      front.classList.add("front");

      const face: CardFace = engine.faces[i];
      const img = new Image();
      img.src = `img/redaction/${face}.jpg`;

      front.append(img);

      const back: HTMLDivElement = document.createElement("div");
      back.classList.add("back");

      content.append(front, back);
      card.append(content);
      stack.append(card);
    }
  }

  protected createCardBack(element: HTMLElement, card: Card) {
    const back: HTMLElement | null = element.querySelector(".back");

    if (!back) {
      return;
    }

    const title: HTMLElement = document.createElement("h3");
    title.textContent = card.name;

    const description: HTMLElement = document.createElement("p");
    description.textContent = card.description;

    back.append(title, description);

    if (card.help !== null) {
      const help: HTMLElement = document.createElement("small");
      help.textContent = card.help;

      back.append(help);
    }
  }

  async draw(card: Card): Promise<void> {
    const position = this.engine.playedCards.length;
    const element: HTMLElement | null = document.getElementById(
      `card-${position.toString()}`,
    );

    if (!element) {
      return;
    }

    this.createCardBack(element, card);

    return new Promise((resolve) => {
      let isCleared: boolean = false;

      const clear = () => {
        if (isCleared) {
          return;
        }

        isCleared = true;
        element.classList.add("removed");

        return this.engine.playCard(card).then(() => {
          return resolve();
        });
      };

      document.addEventListener("click", clear, {
        once: true,
      });

      element.classList.add("drawing");

      setTimeout(() => {
        element.classList.add("flip");
      }, 800);

      setTimeout(() => {
        clear();
      }, 12000);
    });
  }
}
