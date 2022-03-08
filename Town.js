export default class Town {
  parent;
  children = new Set();
  mailBox = null;
  width;
  height;
  static #objects = new Set();

  constructor(parent) {
    this.parent = parent;
    this.width = "512px";
    this.height = "80vw";
    Town.#objects.add(this);
  }

  render() {
    Town.#objects.delete(this);
    let num = Math.random(Town.#objects.size);
    Town.#objects.forEach((town) => {
      if (num > 0) {
        this.children.add(town);
        num--;
      }
    });

    this.children.forEach((town) => {
      town.render();
    });
  }
}
