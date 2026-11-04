import { Linter } from "./linter";
import {
  lowercase,
  parentheses,
  removeExtraSpaces, requiredSpace,
  trim,
} from "./rules";

const liveLinter = new Linter([
  lowercase,
]);


const finalLinter = new Linter([
  trim,
  removeExtraSpaces,
  lowercase,
  parentheses,
  requiredSpace
]);


type TextField = HTMLInputElement | HTMLTextAreaElement;

const selector = "#tags, .awesomplete > input:nth-child(1)";

function isTagsField(target: EventTarget | null): target is TextField {
  return (
    (target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement) &&
    target.matches(selector)
  );
}


document.addEventListener("input", (event) => {
  const field = event.target;

  if (!isTagsField(field)) return;

  const start = field.selectionStart;
  const end = field.selectionEnd;
  const formatted = liveLinter.format(field.value);

  if (formatted !== field.value) {
    field.value = formatted;

    if (start !== null && end !== null) {
      field.setSelectionRange(start, end);
    }
  }
});

document.addEventListener("focusout", (event) => {
  const field = event.target;

  if (!isTagsField(field)) return;

  field.value = finalLinter.format(field.value);
});

document.addEventListener(
  "submit",
  (event) => {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) return;

    const field = form.querySelector("#tags");

    if (isTagsField(field)) {
      field.value = finalLinter.format(field.value);
    }
  },
  true
);

