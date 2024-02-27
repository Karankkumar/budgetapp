import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

import "./App.css";
import { useState } from "react";
import Addexpense from "./Components/Addexpense";

export default function App() {
  const [budget, setbudget] = useState("");
  const [remaining, setremaining] = useState("");
  const [spent, setspent] = useState("");
  const [data, setdata] = useState([]);
  const [ExpenseName, setExpenseName] = useState("");
  const [ExpenseCost, setExpenseCost] = useState("");
  const [searchItem, setsearchItem] = useState("");

  const adddata = () => {
    if(ExpenseName !== "" && ExpenseCost !== "" && budget !== ""){
      setdata([...data, { ExpenseName, ExpenseCost }]);
      const newremaining = remaining - parseFloat(ExpenseCost);
      const newspent = spent + parseFloat(ExpenseCost);
      setremaining(newremaining);
      setspent(newspent);
      setExpenseName("");
      setExpenseCost("");
    }
  };

  const deleteItem = (index) => {
    const deletedExpense = parseFloat(data[index].ExpenseCost) ; // Get the cost of the expense to be deleted
    const newremaining = remaining + deletedExpense; // Update remaining by adding back the cost of the deleted expense
    const newspent = spent - deletedExpense; // Update spent by subtracting the cost of the deleted expense
    setremaining(newremaining);
    setspent(newspent);
    let newdata = [...data];
    newdata.splice(index, 1);
    setdata(newdata);
  };

  const handleonchange = (event) => {
    setsearchItem(event.target.value);
  };

  const handlebudgetChange = () => {
    if(budget !== ""){
      const newBudget = parseFloat(budget);
      setbudget(newBudget);
      setremaining(newBudget);
      setspent(parseFloat(0));
      setdata([]);
      setsearchItem("");

    }
    else{
      setdata([]);
      setremaining("");
      setspent("");
    }
  };

  return (
    <div className=" h-screen">
      <div className="text-3xl text-center font-bold p-4 bg-black text-[yellow]">
        The Budget App
      </div>

      <Stack direction="row" spacing={3} className="p-4 justify-evenly my-4 ">
        <span className="flex flex-col ">
          <TextField
            value={budget}
            onChange={(event) => {
              setbudget(event.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            label="Budget"
            color="primary"
          />
          <Button
            className="w-1/2 "
            variant="outlined"
            onClick={handlebudgetChange}
          >
            Set
          </Button>
        </span>
        <TextField
          value={remaining}
          onChange={(event) => {
            setremaining(event.target.value);
          }}
          id="outlined-basic"
          variant="outlined"
          label="Remaining"
          disabled="true"
          color= {parseFloat(remaining) > 0 ? "primary" : "error"}
          className="text-bold"
        />
        <TextField
          value={spent}
          onChange={(event) => {
            setspent(event.target.value);
          }}
          id="outlined-basic"
          variant="outlined"
          label="Spent so far"
          color="primary"
          disabled="true"
        />
      </Stack>

      <h2 className="text-3xl ml-[13%] my-2 font-bold ">Expenses</h2>
      <div className="w-[75%] m-auto">
        <TextField
          value={searchItem}
          onChange={handleonchange}
          id="outlined-basic"
          variant="outlined"
          label="Search Expense here ..."
          fullWidth
          className=""
        />
      </div>
      <div>
        {data
          .filter((item) =>
            item.ExpenseName.toLowerCase().includes(searchItem.toLowerCase())
          )
          .map((element, index) => {
            return (
              <Addexpense
                key={index}
                name={element.ExpenseName}
                cost={element.ExpenseCost}
                index={index}
                deleteItem={deleteItem}
              />
            );
          })}
      </div>

      <h2 className="text-3xl ml-[13%] my-2 font-bold ">Add Expenses</h2>
      <div className="my-4 ml-[13%]">
        <div className="my-4">
          <TextField
            value={ExpenseName}
            onChange={(event) => {
              setExpenseName(event.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            label="Expense Name"
          />
          <TextField
            value={ExpenseCost}
            onChange={(event) => {
              setExpenseCost(event.target.value);
            }}
            id="outlined-basic"
            variant="outlined"
            label="Expense Cost"
          />
        </div>
        <Button onClick={adddata} variant="outlined" className="">
          Add Expense
        </Button>
      </div>
    </div>
  );
}
