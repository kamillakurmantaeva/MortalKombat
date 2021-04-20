const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');

const HIT = { head: 30, body: 25, foot: 20 };
const ATTACK = ['head', 'body', 'foot'];
const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

const player1 = {
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

const player2 = {
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

const playerWins = (name) => {
  const $winsTitle = createElement('div', 'winsTitle');
  if (name) {
    $winsTitle.innerText = name + ' wins';
  } else {
    $winsTitle.innerText = 'draw';
  }
  return $winsTitle;
};

function getRandom(num) {
  return Math.ceil(Math.random() * num);
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

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $button.addEventListener('click', function () {
    window.location.reload();
  });
  $reloadWrap.appendChild($button);
  return $reloadWrap;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return { value: getRandom(HIT[hit]), hit, defence };
}

function playerAttack() {
  const attack = {};
  for (const item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return attack;
}

function damagePlayer(player1, defence, player2, hit, value) {
  if (hit !== defence) {
    player1.changeHP(value);
    player1.renderHP();
    generateLogs('hit', player2, player1, value);
  }
  if (hit === defence) {
    generateLogs('defence', player2, player1);
  }
}

function determineWinner() {
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
}

function generateLogs(type, player1, player2, value = 0) {
  const date = new Date();

  switch (type) {
    case 'start':
      return $chat.insertAdjacentHTML(
        'afterbegin',
        logs.start
          .replace(
            '[time]',
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          )
          .replace('[player1]', player1.name)
          .replace('[player2]', player2.name)
      );

    case 'hit':
    case 'defence':
      const text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      const el = `<p>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${text} ${-value} [${
        player2.hp
      }/100]</p>`;
      return $chat.insertAdjacentHTML('afterbegin', el);

    case 'end':
      return $chat.insertAdjacentHTML(
        'afterbegin',
        logs.end[getRandom(logs.end.length) - 1]
          .replace('[playerWins]', player1.name)
          .replace('[playerLose]', player2.name)
      );

    case 'draw':
      return $chat.insertAdjacentHTML('afterbegin', logs.draw);

    default:
      break;
  }
}

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();
  damagePlayer(player1, player.defence, player2, enemy.hit, enemy.value);
  damagePlayer(player2, enemy.defence, player1, player.hit, player.value);
  determineWinner();
});
