const player1 = {
  name: 'SCORPION',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack: function () {
    console.log(this.name + ', Fight...');
  },
};

const player2 = {
  name: 'SUB-ZERO',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack: function () {
    console.log(this.name + ', Fight...');
  },
};

const createPlayer = (playerClass, player) => {
  const $player = document.createElement('div');
  $player.classList.add(playerClass);

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');
  $player.appendChild($progressbar);

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = player.hp + '%';
  $progressbar.appendChild($life);

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = player.name;
  $progressbar.appendChild($name);

  const $character = document.createElement('div');
  $character.classList.add('character');
  $player.appendChild($character);

  const $img = document.createElement('img');
  $img.src = player.img;
  $character.appendChild($img);

  const $arenas = document.querySelector('.arenas');
  $arenas.appendChild($player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);
