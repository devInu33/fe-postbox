export class Mailbox {
  size;
  el = document.createElement("div");
  constructor(size) {
    this.size = size;
  }

  render(town) {
    this.el.style.width = `${town.width / 2}px`;
    this.el.style.height = `${town.height / 2}px`;
    town.element.appendChild(this.el);
  }
}
