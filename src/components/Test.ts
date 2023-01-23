export default class Test {
  resultView: HTMLDivElement;

  constructor() {
    const resultViewEl = document.querySelector('#search-result') as HTMLDivElement;
    this.resultView = resultViewEl;
    this.render('tet');
  }

  render(arg: string) {
    this.resultView.innerHTML = `<div>${arg}<div>`;
  }
}
