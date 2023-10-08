import Reactotron, { trackGlobalErrors } from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({ name: "MERN" }) // we can use plugins here -- more on this later
  .use(trackGlobalErrors({ offline: false }))
  .use(reactotronRedux())
  .connect(); // let's connect!

//to show console in reactotron
const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: "CONSOLE",
    value: args,
    preview: args.length > 0 && typeof args[0] === "string" ? args[0] : null,
  });
};

export default reactotron;
