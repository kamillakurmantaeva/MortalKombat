import { player1, player2 } from './players.js';
import { generateLogs } from './logs.js';
import {
  createPlayer,
  createReloadButton,
  playerWins,
} from './createElement.js';
import { enemyAttack, playerAttack } from './attack.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.button');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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
    $fightButton.disabled = true;
    $arenas.appendChild(createReloadButton());
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    generateLogs('end', player2, player1);
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    generateLogs('end', player1, player2);
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    generateLogs('draw');
    $arenas.appendChild(playerWins());
  }
};

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();
  damagePlayer(player1, player.defence, player2, enemy.hit, enemy.value);
  damagePlayer(player2, enemy.defence, player1, player.hit, player.value);
  determineWinner();
});
