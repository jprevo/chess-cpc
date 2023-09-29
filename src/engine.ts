import { BoardConfig, ChessBoardInstance, GameMode } from "./types";
import { BLACK, WHITE, Chess } from "chess.js";
import { Card } from "./card/card";
import { Cards } from "./cards";

export class Engine {
  protected _board: ChessBoardInstance | null = null;
  protected _fish: Worker | null = null;
  protected _game: Chess;

  public constructor(protected mode: GameMode = GameMode.Ai) {
    if (this.mode === GameMode.Ai) {
      this.initFish();
    }

    this._game = new Chess();
  }

  async playCard(id: string): Promise<void> {
    const card: Card | null = Cards[id];

    if (!card) {
      return;
    }

    return card.play(this);
  }

  next(): void {
    if (this.game.isGameOver()) {
      return this.afterNext();
    }

    if (this.mode === GameMode.Ai) {
      if (this.game.turn() === BLACK) {
        this.playAi();

        return this.afterNext();
      }
    }

    this.afterNext();
  }

  protected afterNext(): void {
    this.updateStatus();
  }

  updateStatus(): void {
    const statusElt: HTMLElement | null = document.getElementById("status");
    let text = "";

    let moveColor = "Blanc";

    if (this.game.turn() === BLACK) {
      moveColor = "Noir";
    }

    if (this.game.isCheckmate()) {
      text = `Partie terminée, ${moveColor} est mat.`;
    } else if (this.game.isDraw()) {
      text = "Partie terminée, match nul.";
    } else {
      text = `À ${moveColor} de jouer`;

      if (this.game.isCheck()) {
        text += `, ${moveColor} est en échec.`;
      }
    }

    if (statusElt) {
      statusElt.textContent = text;
    }
  }

  protected initFish(): void {
    this._fish = new Worker("js/stockfish.js");

    const fish: Worker | null = this.fish;

    if (!fish) {
      return;
    }

    fish.postMessage("uci");

    fish.addEventListener("message", (e: MessageEvent) => {
      const message: string = e.data;

      if (message && message.startsWith("bestmove")) {
        const parts: string[] = message.split(" ");

        if (parts.length < 2) {
          return this.playRandomAi();
        }

        this.game.move(parts[1]);
        this.onMovePlayed();
      }
    });
  }

  protected playAi(): void {
    if (!this.fish) {
      return this.playRandomAi();
    }

    this.fish.postMessage(`position fen ${this.game.fen()}`);

    setTimeout(() => {
      if (!this.fish) {
        this.playRandomAi();
        return;
      }

      this.fish.postMessage("go depth 5");
    }, 250);
  }

  protected playRandomAi(): void {
    const moves = this.game.moves();

    if (!moves.length) {
      alert("Impossible de trouver le coup suivant.");
      return;
    }

    const move = moves[Math.floor(Math.random() * moves.length)];
    this.game.move(move);

    onMoveMade();
  }

  protected onDragStart(source?: string, piece?: string) {
    if (this.game.isGameOver()) return false;

    if (this.game.turn() === BLACK && this.mode === GameMode.Ai) {
      return false;
    }

    if (!piece) {
      return false;
    }

    if (
      (this.game.turn() === WHITE && piece.search(/^b/) !== -1) ||
      (this.game.turn() === BLACK && piece.search(/^w/) !== -1)
    ) {
      return false;
    }
  }

  protected onDrop(source?: string, target?: string): string | void {
    if (source === target) {
      return "snapback";
    }

    if (!source || !target) {
      return "snapback";
    }

    try {
      this.game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    } catch (e) {
      console.log(`Invalid move ${source} -> ${target}`);

      return "snapback";
    }
  }

  protected onSnapEnd(): void {
    this.onMovePlayed();
  }

  protected onMovePlayed(): void {
    if (!this.board) {
      return;
    }

    this.board.position(this.game.fen());
    this.next();
  }

  get game(): Chess {
    return this._game;
  }

  get board(): ChessBoardInstance | null {
    return this._board;
  }

  get fish(): Worker | null {
    return this._fish;
  }

  public start(domId: string): void {
    const config: BoardConfig = {
      draggable: true,
      position: this.game.fen(),
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this),
    };

    this._board = window.Chessboard(domId, config);
  }
}
