export default class Test {
  constructor() {
    const resultViewEl = document.querySelector("#search-result");

    this.render("test");
  }
  render(arg: string) {
    this.resultViewEl.innerHTML = arg;
  }
}
