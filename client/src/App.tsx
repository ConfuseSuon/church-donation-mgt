import { Fragment } from "react/jsx-runtime";

import Routing from "./routes";
import { useValidityCheckQuery } from "./services/auth";

const App = () => {
  useValidityCheckQuery();
  return (
    <Fragment>
      <Routing />
    </Fragment>
  );
};

export default App;
