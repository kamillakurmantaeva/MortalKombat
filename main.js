const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack: function () {
    console.log(this.name + ', Fight...');
  },
};

const player2 = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack: function () {
    console.log(this.name + ', Fight...');
  },
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createPlayer = (playerObj) => {
  const $player = createElement('div', 'player' + playerObj.player);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $life.style.width = playerObj.hp + '%';
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($img);

  return $player;
};

const playerWon = (name) => {
  const $wonTitle = createElement('div', 'wonTitle');
  $wonTitle.innerText = name + ' won';
  return $wonTitle;
};

const changeHp = (playerObj) => {
  const $playerLife = document.querySelector(
    '.player' + playerObj.player + ' .life'
  );
  playerObj.hp -= Math.ceil(Math.random() * 20);
  $playerLife.style.width = playerObj.hp + '%';

  if (playerObj.hp <= 0) {
    $playerLife.style.width = '0%';
    $randomButton.disabled = true;
    return true;
  }
};

$randomButton.addEventListener('click', function () {
  if (changeHp(player1)) {
    $arenas.appendChild(playerWon(player2.name));
  }
  if (changeHp(player2)) {
    $arenas.appendChild(playerWon(player1.name));
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
