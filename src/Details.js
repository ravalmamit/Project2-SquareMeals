import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { PieChart, Pie } from "react-minimal-pie-chart";
import imgUrl from "./images/mcdonalds.png";
import imgUrl2 from "./images/chipotle.gif";
import imgUrl3 from "./images/pizza.jpeg";
import imgUrl4 from "./images/wendy.png";
import imgUrl5 from "./images/chickfil.png";
import imgUrl6 from "./images/taco.jpg";

import App from "./App";

function Details(props) {
  // let imgUrl = `./images/image2.jpeg`;

  const [foodProtein, setFoodProtein] = useState([0.0]);
  const [foodEnergy, setFoodEnergy] = useState([0.0]);
  const [foodCarb, setFoodCarb] = useState([0.0]);
  const [foodFat, setFoodFat] = useState([0.0]);
  const [food, setFood] = useState("");
  const [macrosP, setMacrosP] = useState("");
  const [macrosE, setMacrosE] = useState("");
  const [macrosC, setMacrosC] = useState("");
  const [macrosF, setMacrosF] = useState("");
  let proteinTotal, energyTotal, carbTotal, fatTotal;

  function getMacros() {
    const key = "bMSaP0axexn3bqcdaBe96ybvtw2lDwu6hqEfgksd";
    const query = food;
    const dataType = `SR Legacy`;
    const apiURL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${food}&dataType=${dataType}&pageNumber=1&pageSize=5`;
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
      })

      .catch(() => {
        console.log("error");
      });
  }

  function addMacros() {
    // macros.Protein += foodProtein[0].value;
    let space = " ";

    setMacrosP(macrosP.concat(foodProtein[0].value, space));
    setMacrosE(macrosE.concat(foodEnergy[0].value, space));
    setMacrosC(macrosC.concat(foodCarb[0].value, space));
    setMacrosF(macrosF.concat(foodFat[0].value, space));
    // setMacros(macros.Protein);
  }

  function handleChange(e) {
    setFood(e.target.value);
    console.log(food);
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
    <div
      style={{
        backgroundImage: `url(${imgUrl}),url(${imgUrl2}), url(${imgUrl3}), url(${imgUrl4}), url(${imgUrl5}), url(${imgUrl6})`,
        backgroundSize:
          "50px 80px, 120px 80px, 110px 80px, 90px 80px, 110px 100px, 80px 80px",
        backgroundPosition:
          "top left, top right, bottom left, bottom right, center left, center right",

        backgroundRepeat: "no-repeat",
        width: "80%",
      }}
    >
      <h3 className="mealsHeading"> Macronutrient Ratio</h3>
      <div>
        <div className="piechartDetails">
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
          />
        </section>
        <button onClick={getMacros}>Search</button>
        {/* <p> */}
        <div>
          The macros for <span className="span"> {food} </span>:
        </div>
        <div className="calories">Calories: {foodEnergy[0].value}</div>
        <div className="protein">Protein: {foodProtein[0].value}</div>
        <div className="carbs"> Carbs: {foodCarb[0].value}</div>
        <div className="fats">Fats: {foodFat[0].value}</div>
        {/* </p> */}
        <button className="button" onClick={addMacros}>
          +Meal
        </button>
        {/* <p></p> */}

        {/* <button onClick={totalProteinMeal1}>Total Macros</button> */}
        {/* <p> */}
        <div>Total Macros for Fast Food:</div>
        <div className="calories">Calories:{totalEnergyMeal()} </div>
        <div className="protein">Protein: {totalProteinMeal()} </div>
        <div className="carbs">Carbs: {totalCarbMeal()}</div>
        <div className="fats">Fats:{totalFatMeal()} </div>
        {/* </p> */}

        {/* <Link to={`/details/${food}`}>Learn more about: {food} </Link> */}
        <main></main>
      </div>
    </div>
  );
}

export default Details;
