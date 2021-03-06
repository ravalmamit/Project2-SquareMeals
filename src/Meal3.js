import React, { useState, useEffect, useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import App from "./App";

function Meal3(props) {
  const [foodProtein, setFoodProtein] = useState([0.0]);
  const [foodEnergy, setFoodEnergy] = useState([0.0]);
  const [foodCarb, setFoodCarb] = useState([0.0]);
  const [foodFat, setFoodFat] = useState([0.0]);
  const [food, setFood] = useState("");
  const [food2, setFood2] = useState("");
  const [macrosP, setMacrosP] = useState("");
  const [macrosE, setMacrosE] = useState("");
  const [macrosC, setMacrosC] = useState("");
  const [macrosF, setMacrosF] = useState("");
  let proteinTotal, energyTotal, carbTotal, fatTotal;

  function getMacros() {
    const key = "bMSaP0axexn3bqcdaBe96ybvtw2lDwu6hqEfgksd";
    const query = food;
    const dataType = `Foundation`;
    const apiURL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${food}&dataType=${dataType}&pageNumber=1&pageSize=5`;
    setFood2(food);
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setFoodProtein(
          data.foods[0].foodNutrients.filter(
            (item) => item.nutrientName === "Protein"
          )
        );
        setFoodEnergy(
          data.foods[0].foodNutrients.filter(
            (item) => item.nutrientNumber === "208"
          )
        );
        setFoodCarb(
          data.foods[0].foodNutrients.filter(
            (item) => item.nutrientNumber === "205"
          )
        );
        setFoodFat(
          data.foods[0].foodNutrients.filter(
            (item) => item.nutrientNumber === "204"
          )
        );
        setFood("");
      })

      .catch(() => {
        console.log("error");
      });
  }

  function addMacros() {
    let space = " ";
    if (foodProtein[0] !== undefined)
      setMacrosP(macrosP.concat(foodProtein[0].value, space));
    if (foodEnergy[0] !== undefined)
      setMacrosE(macrosE.concat(foodEnergy[0].value, space));
    if (foodCarb[0] !== undefined)
      setMacrosC(macrosC.concat(foodCarb[0].value, space));
    if (foodFat[0] !== undefined)
      setMacrosF(macrosF.concat(foodFat[0].value, space));
    // setMacros(macros.Protein);
  }

  function handleChange(e) {
    setFood(e.target.value);
  }

  function totalProteinMeal() {
    let proteinValues = macrosP.split(" ");
    let sum = 0;

    for (let i = 0; i < proteinValues.length - 1; i++) {
      sum = sum + parseInt(proteinValues[i]);
    }
    proteinTotal = sum;
    return proteinTotal;
  }

  function totalEnergyMeal() {
    let energyValues = macrosE.split(" ");
    let sum = 0;

    for (let i = 0; i < energyValues.length - 1; i++) {
      sum = sum + parseInt(energyValues[i]);
    }
    energyTotal = sum;
    return energyTotal;
  }

  function totalCarbMeal() {
    let carbValues = macrosC.split(" ");
    let sum = 0;

    for (let i = 0; i < carbValues.length - 1; i++) {
      sum = sum + parseInt(carbValues[i]);
    }
    carbTotal = sum;
    return carbTotal;
  }

  function totalFatMeal() {
    let fatValues = macrosF.split(" ");
    let sum = 0;

    for (let i = 0; i < fatValues.length - 1; i++) {
      sum = sum + parseInt(fatValues[i]);
    }
    fatTotal = sum;
    return fatTotal;
  }

  return (
    <div>
      <div className="piechart">
        {totalCarbMeal() || totalFatMeal() || totalProteinMeal() ? (
          <PieChart
            data={[
              {
                title: "Protein",
                value: totalProteinMeal(),
                color: `dodgerblue`,
              },
              { title: "Carbs", value: totalCarbMeal(), color: `red` },
              { title: "Fats", value: totalFatMeal(), color: `orange` },
            ]}
            label={({ dataEntry }) =>
              `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
            }
          />
        ) : (
          <PieChart
            data={[
              {
                title: "Macros",
                value: 100,
                color: `gray`,
              },
            ]}
            label={({ dataEntry }) =>
              `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
            }
          />
        )}
      </div>
      <section>
        Food:
        <input
          placeholder="food"
          type="text"
          name="foodname"
          onChange={handleChange}
          value={food}
        />
      </section>
      <button className="button" onClick={getMacros}>
        Search
      </button>
      {/* <p> */}
      <div>
        The macros for <span className="span">{food2}</span>:
      </div>
      <div className="calories">
        Calories: {foodEnergy[0] === undefined ? "" : foodEnergy[0].value}
      </div>
      <div className="protein">
        Protein: {foodProtein[0] === undefined ? "" : foodProtein[0].value}
      </div>
      <div className="carbs">
        Carbs: {foodCarb[0] === undefined ? "" : foodCarb[0].value}
      </div>
      <div className="fats">
        Fats: {foodFat[0] === undefined ? "" : foodFat[0].value}
      </div>

      <button className="button" onClick={addMacros}>
        +Meal3
      </button>

      <div>
        <div>Total Macros for Meal3:</div>
        <div className="calories">Calories:{totalEnergyMeal()} </div>
        <div className="protein">Protein: {totalProteinMeal()} </div>
        <div className="carbs">Carbs: {totalCarbMeal()}</div>
        <div className="fats">Fats:{totalFatMeal()} </div>
      </div>
      <main></main>
    </div>
  );
}

export default Meal3;
