import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import Arts from "./contracts/Arts.json";
// let drizzle know what contracts we want
const options = { contracts: [Arts] };
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
// pass in the drizzle instance
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));