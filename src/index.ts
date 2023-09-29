import { Engine } from "./engine";
import { GameMode } from "./types";

const engine: Engine = new Engine(GameMode.Ai);

document.addEventListener("DOMContentLoaded", () => {
  engine.start("board");
});
