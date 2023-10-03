import { Engine } from "./engine";
import { GameMode } from "./types";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search,
  );

  const mode: GameMode = urlParams.get("mode") as GameMode;

  const engine: Engine = new Engine({
    domId: "board",
    mode: mode,
  });

  window.addEventListener("resize", () => engine.resize());
});
