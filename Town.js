export default class Town {
  #parent;
  #children = new Set();
  mailBox = null;
  element;
  static #objects = new Set();

  constructor(parent) {
    this.#parent = parent;
    this.element = document.createElement("div");
    Town.#objects.add(this);
  }

  render() {
    Town.#objects.delete(this);
    this.element.style.width = this.#parent.width / 2;
    this.element.style.height = this.#parent.height / 2;
    this.#parent.appendChild(this.element);
    let num = Math.random(Town.#objects.size);

    if (Town.#objects.size) {
      Town.#objects.forEach((town) => {
        if (num > 0) {
          this.#children.add(town);
          town.#parent = this;
          num--;
        }
      });

      this.#children.forEach((town) => {
        town.render();
      });
    } else return;
  }
}
