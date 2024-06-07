import "/src/styles/reset.css";
import "/src/styles/style.scss";

let gameRepository: GameRepository;

window.addEventListener("load", function () {
    console.log("Hello World!");
    init();
});

function init() {
    const map = new GameMap(10, 10);
    gameRepository = new GameRepository(0, map);
}