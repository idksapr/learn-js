import RangePickerComponent from "./RangePickerComponent.js";

describe("RangePicker", () => {
  let rangePicker;

  beforeEach(() => {
    rangePicker = new RangePickerComponent();
    document.body.append(rangePicker.make());
  });

  afterEach(() => {
    rangePicker.clear();
  });

  it("Initially shows only input", () => {
    expect(document.querySelector('.rangepicker__input')).toBeInstanceOf(HTMLElement);
    expect(document.querySelector('.rangepicker__selector').innerHTML).toEqual("");
  });

  it("Opens on click", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).not.toEqual(0);
  });

  it("Closes on second click", function() {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).toEqual(0);
  });


  // ...
});
