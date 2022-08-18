import Component from "../components/base-component.js";
import * as validation from "../util/validation.js";
import { projectState } from "../state/project-state.js";
import { autobind } from "../decorators/autobind.js";

//Project Input Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void /*tuple type*/ {
    //Possibly void because if validation fails we do not return anything and alert the user
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    //validate

    const titleValidatable: validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: validation.Validatable = {
      value: +enteredPeople,
      required: true,
      minLength: 5,
    };

    if (
      !validation.validate(titleValidatable) ||
      !validation.validate(descriptionValidatable) ||
      !validation.validate(peopleValidatable)
    ) {
      alert("Invalid input");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]; //+enteredPeople converts string to number
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.peopleInputElement.value = "";
    this.descriptionInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  //replaced with autobind
  //   private configure() {
  //     this.element.addEventListener("submit", this.submitHandler.bind(this));
  //   }
}
