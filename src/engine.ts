import {
  BoardConfig,
  CardFace,
  ChessBoardInstance,
  defaultEngineConfig,
  EngineConfig,
  EngineState,
  GameMode,
  PieceTheme,
} from "./types";
import { BLACK, Chess, QUEEN, Square, WHITE } from "chess.js";
import { Cards } from "./cards";
import { Card } from "./card/card";
import { CardDeck } from "./card-deck";
import { Util } from "./util";

export class Engine {
  protected _config: EngineConfig;
  protected _board: ChessBoardInstance;
  protected _fish: Worker | null = null;
  protected _game: Chess;
  protected _mode: GameMode;
  protected _state: EngineState = EngineState.Draw;

  deck: CardDeck;
  faces: CardFace[] = [];
  playedCards: Card[] = [];

  pieceTheme: PieceTheme = PieceTheme.Wikipedia;
  allowed: Square[] = [];

  public constructor(config: EngineConfig) {
    const engineConfig: EngineConfig = {
      ...{},
      ...defaultEngineConfig,
      ...config,
    };

    this._config = engineConfig;
    this._mode = engineConfig.mode as GameMode;

    this._game = new Chess();

    if (this.mode === GameMode.Ai) {
      this.initFish();
    }

    const boardConfig: BoardConfig = {
      draggable: true,
      position: this.game.fen(),
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this),
      pieceTheme: this.getThemeForPiece.bind(this),
    };

    this._board = window.Chessboard(engineConfig.domId, boardConfig);

    this.deck = new CardDeck(engineConfig.deckId as string, this);
    this.deck.build(50);

    setTimeout(() => {
      return this.next();
    }, 500);
  }

  async next(): Promise<boolean> {
    if (this.game.isGameOver()) {
      this.afterNext();

      return false;
    }

    if (this.mode === GameMode.Ai) {
      if (this.game.turn() === BLACK && this._state === EngineState.Play) {
        this.playAi();
        this._state = EngineState.Draw;
        this.afterNext();

        return true;
      }
    }

    if (this._state === EngineState.Draw) {
      await this.drawCard();
      this.afterNext();
      this._state = EngineState.Play;

      return this.next();
    }

    return false;
  }

  async drawCard(): Promise<void> {
    const id: string | null = this.deck.getCardId(this.playedCards.length);

    if (!id) {
      return;
    }

    const card: Card = new Cards[id]();

    return this.deck.draw(card);
  }

  async playCard(card: Card): Promise<boolean> {
    this.playedCards.push(card);

    return card.play(this);
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
    if (this.allowed) {
      return this.playRandomAi();
    }

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
    let moves = this.game.moves();

    if (this.allowed) {
      Util.shuffle(this.allowed);

      moves = this.game.moves({
        square: this.allowed[0],
      });
    }

    if (!moves.length) {
      alert("Impossible de trouver le coup suivant.");
      return;
    }

    const move = moves[Math.floor(Math.random() * moves.length)];
    this.game.move(move);

    this.onMovePlayed();
  }

  protected onDragStart(source?: string, piece?: string) {
    if (this.game.isGameOver()) return false;

    if (this._state !== EngineState.Play) {
      return false;
    }

    if (this.turn === BLACK && this.mode === GameMode.Ai) {
      return false;
    }

    if (!piece) {
      return false;
    }

    if (
      (this.turn === WHITE && piece.search(/^b/) !== -1) ||
      (this.turn === BLACK && piece.search(/^w/) !== -1)
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

    if (this.allowed.length > 0) {
      if (!this.allowed.includes(source as Square)) {
        return "snapback";
      }
    }

    try {
      this.game.move({
        from: source,
        to: target,
        promotion: QUEEN,
      });
    } catch (e) {
      console.log(`Invalid move ${source} -> ${target}`);

      return "snapback";
    }
  }

  getThemeForPiece(piece?: string): string {
    return `img/chesspieces/${this.pieceTheme}/${piece}.png`;
  }

  setPieceTheme(theme: PieceTheme) {
    this.pieceTheme = theme;
    this.board.resize();
  }

  setPosition(fen: string) {
    this.game.load(fen);
    this.board.position(fen, false);
  }

  setAllowed(allowed: Square[]) {
    this.allowed = allowed;
  }

  protected onSnapEnd(): void {
    this.onMovePlayed();
  }

  protected onMovePlayed(): void {
    if (!this.board) {
      return;
    }

    this.allowed = [];
    this.board.position(this.game.fen());
    this._state = EngineState.Draw;
    this.next();
  }

  get turn(): "b" | "w" {
    return this.game.turn();
  }

  get game(): Chess {
    return this._game;
  }

  get board(): ChessBoardInstance {
    return this._board;
  }

  get fish(): Worker | null {
    return this._fish;
  }

  get mode(): GameMode {
    return this._mode;
  }

  get boardElement(): HTMLElement | null {
    return document.getElementById("board");
  }
}
