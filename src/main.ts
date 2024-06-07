import "/src/styles/reset.css";
import "/src/styles/style.scss";
import "/src/styles/gameContext.scss";

let gameRepository: GameRepository;

window.addEventListener("load", function () {
    console.log("Hello World!");
    init();
});

function init() {
    const map = new GameMap(10, 10);
    const mapElement = document.getElementById("map");
    if (mapElement) {
        generateMap(map, document.getElementById("map")!);
    }
    gameRepository = new GameRepository(0, map);
}