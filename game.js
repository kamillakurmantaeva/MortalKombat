import Player from './player.js';
import generateLogs from './logs.js';
import {
  createPlayer,
  createReloadButton,
  playerWins,
} from './createElement.js';
import { enemyAttack, playerAttack } from './attack.js';
import getRandom from './utils.js';

class Game {
  constructor() {
    this.$arenas = document.querySelector('.arenas');
    this.$formFight = document.querySelector('.control');
    this.$fightButton = document.querySelector('.button');
  }

  start = async () => {
    this.$arenas.classList.add(`arena${getRandom(5)}`);

    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = await fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
    ).then((res) => res.json());

    const player1 = new Player({ ...p1, player: 1 });
    const player2 = new Player({ ...p2, player: 2 });

    this.$arenas.appendChild(createPlayer(player1));
    this.$arenas.appendChild(createPlayer(player2));

    generateLogs('start', player1, player2);

    const damagePlayer = (player1, defence, player2, hit, value) => {
      if (hit !== defence) {
        player1.changeHP(value);
        player1.renderHP();
        generateLogs('hit', player2, player1, value);
      }
      if (hit === defence) {
        generateLogs('defence', player2, player1);
      }
    };

    const determineWinner = () => {
      if (player1.hp === 0 || player2.hp === 0) {
        this.$fightButton.disabled = true;
        this.$arenas.appendChild(createReloadButton());
      }
      if (player1.hp === 0 && player1.hp < player2.hp) {
        generateLogs('end', player2, player1);
        this.$arenas.appendChild(playerWins(player2.name));
      } else if (player2.hp === 0 && player2.hp < player1.hp) {
        generateLogs('end', player1, player2);
        this.$arenas.appendChild(playerWins(player1.name));
      } else if (player1.hp === 0 && player2.hp === 0) {
        generateLogs('draw');
        this.$arenas.appendChild(playerWins());
      }
    };

    this.$formFight.addEventListener('submit', function (e) {
      e.preventDefault();
      const enemy = enemyAttack();
      const player = playerAttack();
      damagePlayer(player1, player.defence, player2, enemy.hit, enemy.value);
      damagePlayer(player2, enemy.defence, player1, player.hit, player.value);
      determineWinner();
    });
  };
}

export default Game;
