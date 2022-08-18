//this is how you import name spaces type script will recognize the "///"
/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
