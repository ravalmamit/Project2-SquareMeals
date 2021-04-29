import React from "react";
import Meal1 from "./Meal1";
import Meal2 from "./Meal2";
import Meal3 from "./Meal3";
import Card from "react-bootstrap/Card";
import { PieChart } from "react-minimal-pie-chart";

function MealCard(props) {
  return (
    <div>
      <h3 className="mealsHeading"> Macronutrient Ratio</h3>
      <Card className="card-horizontal">
        <Meal1 style={{ width: "18rem" }} />
        <Meal2 style={{ width: "18rem" }} />
        {/* <TotalMacros /> */}
        <Meal3 style={{ width: "18rem" }} />
      </Card>
    </div>
  );
}

export default MealCard;
