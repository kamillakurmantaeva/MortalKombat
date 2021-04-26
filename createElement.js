const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

export const createPlayer = ({ player, hp, name, img }) => {
  const $player = createElement('div', `player${player}`);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $life.style.width = hp + '%';
  $name.innerText = name;
  $img.src = img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($img);

  return $player;
};

export const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $button.addEventListener('click', function () {
    window.location.reload();
  });
  $reloadWrap.appendChild($button);
  return $reloadWrap;
};

export const playerWins = (name) => {
  const $winsTitle = createElement('div', 'winsTitle');
  if (name) {
    $winsTitle.innerText = name + ' wins';
  } else {
    $winsTitle.innerText = 'draw';
  }
  return $winsTitle;
};
