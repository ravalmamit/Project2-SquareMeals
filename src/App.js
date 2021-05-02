import logo from "./logo.svg";
import Meal1 from "./Meal1";
import Meal2 from "./Meal2";
import Meal3 from "./Meal3";
import Home from "./Home";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import { Route, Link } from "react-router-dom";
import Details from "./Details";
import MealCard from "./MealCard";

function App() {
  return (
    <div>
      <Header />

      <div className="App">
        <Route exact path="/details/" component={Details} />
        <Route exact path="/" component={Home} />
        <Route exact path="/meal/" component={MealCard} />
      </div>
    </div>
  );
}

export default App;
