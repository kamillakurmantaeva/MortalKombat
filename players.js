export const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

export const player2 = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['aa', 'bb', 'cc'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

function attack() {
  console.log(this.name + ', Fight...');
}

function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  const $playerLife = document.querySelector(
    '.player' + this.player + ' .life'
  );
  return $playerLife;
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}
