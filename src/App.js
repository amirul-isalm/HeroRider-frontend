import "./App.css";
import NavBar from "./Pages/NavBar/NavBar";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AuthProvider from "./Pages/Context/AuthProvider";
import WhichTypeJoin from "./Pages/HomePage/WhichTypeJoin";
import NotFoundCompo from "./Pages/NotFound/NotFoundCompo";
import RiderJoinPage from "./Pages/LoginPage/RiderJoinPage";
import RiderProfile from "./Pages/ProfileComponent/RiderProfile";
import LearnerJoinPage from "./Pages/LoginPage/LearnerJoinPage";
import LearnerProfile from "./Pages/ProfileComponent/LearnerProfile";
import PaymentGateWaye from "./Pages/ProfileComponent/PaymentGatwaye/PaymentGateWaye";
import PrivetRoute from "./Pages/PrivetRouteAndAdminRoute/PrivetRoute";
import useAuth from "./Pages/Context/useAuth";
import DashBord from "./Pages/DashBord/DashBord";

function App() {


  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/joinType">
              <WhichTypeJoin />
            </Route>
            <Route path="/dashbord">
<DashBord/>

            </Route>
            <PrivetRoute
              exact path="/riderprofile">
              <RiderProfile />
            </PrivetRoute>
            <Route path="/riderjoin">
              <RiderJoinPage />
            </Route>
            <Route path="/learnerjoin">
              <LearnerJoinPage />
            </Route>
            <PrivetRoute path="/learnerprofile">
              <LearnerProfile />
            </PrivetRoute>
            <PrivetRoute path="/payment/:id">
              <PaymentGateWaye />
            </PrivetRoute>

            <Route path="*">
              <NotFoundCompo />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
