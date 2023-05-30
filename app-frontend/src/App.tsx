import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAppState } from "./store";

const App = () => {
  const { isAuth } = useAppState();
  const { location, push } = useHistory();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isAuth === true) {
        push("/dashboard");
      } else {
        push("/login");
      }
    }
  }, [isAuth, location]);

  if (isAuth) {
    return <Route path={"/dashboard"} exact={true} component={Dashboard} />;
  }

  return (
    <>
      <Route path={"/login"} exact={true} component={Login} />
      <Route path={"/signup"} exact={true} component={SignUp} />
    </>
  );
};

export default App;
