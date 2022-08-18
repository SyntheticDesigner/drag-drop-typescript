//this is how you import name spaces type script will recognize the "///"
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import "../app.css";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
