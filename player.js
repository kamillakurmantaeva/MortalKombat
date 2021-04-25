class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.selector = `player${this.player}`;
  }

  attack = () => {
    console.log(this.name + ', Fight...');
  };

  changeHP = (num) => {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.${this.selector} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = this.hp + '%';
  };
}

export default Player;
