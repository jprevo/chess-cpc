let board = null;
let nextText = "";
let mode = "ai"; // ai | vs
let stockfish;

const game = new Chess();
const status = document.getElementById("status");
const whatsnext = document.getElementById("whatsnext");
const sayan = document.getElementById("sayan-mode");
const party = document.getElementById("party-mode");

party.addEventListener("click", () => {
  document.getElementById("board").classList.toggle("party");
});

sayan.addEventListener("click", () => {
  const pieces = game.board();

  pieces.forEach((line) => {
    if (!line) {
      return;
    }

    line.forEach((piece) => {
      if (!piece) {
        return;
      }

      if (piece.color === "w") {
        if (piece.type === "p") {
          game.remove(piece.square);
          game.put(
            {
              type: "q",
              color: "w",
            },
            piece.square,
          );
        }
      }
    });
  });

  board.position(game.fen());
});

if (mode === "ai") {
  stockfish = new Worker("js/stockfish.js");
  stockfish.postMessage("uci");

  stockfish.addEventListener("message", function (e) {
    const msg = e.data;

    if (msg.startsWith("bestmove")) {
      const parts = msg.split(" ");
      game.move(parts[1]);
      onMoveMade();
    }
  });
}

const next = () => {
  if (game.isGameOver()) {
    nextText = "Partie terminée.";
    return afterNext();
  }

  if (mode === "ai") {
    if (game.turn() === "w") {
      nextText = "À vous de jouer !";
    }
    if (game.turn() === "b") {
      nextText = "L'IA est en train de jouer...";
      playAi();

      return afterNext();
    }
  }

  afterNext();
};

const afterNext = () => {
  updateStatus();
};

const playRandomAi = () => {
  const moves = game.moves();

  if (!moves.length) {
    return;
  }

  const move = moves[Math.floor(Math.random() * moves.length)];
  game.move(move);

  onMoveMade();
};

const playAi = () => {
  stockfish.postMessage("position fen " + game.fen());
  setTimeout(() => {
    stockfish.postMessage("go depth 5");
  }, 250);
};

const onDragStart = (source, piece, position, orientation) => {
  if (game.isGameOver()) return false;

  if (game.turn() === "b" && mode === "ai") {
    return false;
  }

  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
    return false;
  }
};

const onDrop = (source, target) => {
  if (source === target) {
    return "snapback";
  }

  try {
    game.move({
      from: source,
      to: target,
      promotion: "q",
    });
  } catch (e) {
    console.log(`Invalid move ${source} -> ${target}`);

    return "snapback";
  }
};

const onSnapEnd = () => {
  onMoveMade();
};

const onMoveMade = () => {
  board.position(game.fen());
  next();
};

const updateStatus = () => {
  let text = "";

  let moveColor = "Blanc";

  if (game.turn() === "b") {
    moveColor = "Noir";
  }

  if (game.isCheckmate()) {
    text = `Partie terminée, ${moveColor} est mat.`;
  } else if (game.isDraw()) {
    text = "Partie terminée, match nul.";
  } else {
    text = `À ${moveColor} de jouer`;

    if (game.isCheck()) {
      text += `, ${moveColor} est en échec.`;
    }
  }

  whatsnext.textContent = nextText;
  status.textContent = text;
};

const config = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};
board = Chessboard("board", config);

afterNext();
