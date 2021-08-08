import "date-fns";
import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { analyiticsContext } from "../providers/AnalyticsProvider";
import ProgressBar from "../components/progressBar";
import NavBar from "../components/NavBar.jsx";

const useStyles = makeStyles((theme) => ({
  timePicker: {
    backgroundcolor: "gold",
    color: "gold",
    marginTop: "150px"
  }
}));

export default function Analytics() {
  // date set
  const classes = useStyles();
  const toDefaultDate = Date.now();
  const fromDaultDate = new Date(toDefaultDate);
  fromDaultDate.setMonth(fromDaultDate.getMonth() - 1);

  const [selectedFromDate, setSelectedFromDate] = React.useState(
    new Date(fromDaultDate)
  );
  const [selectedToDate, setSelectedToDate] = React.useState(
    new Date(toDefaultDate)
  );

  // context import functions and state from useContext hook
  const { from, to, searchDate, budget, goals } = useContext(analyiticsContext);

  // set new selected from date
  const handleDateFromChange = (date) => {
    setSelectedFromDate(date);
    from(date);
  };

  // set new selected in date
  const handleDateToChange = (date) => {
    setSelectedToDate(date);
    to(date);
  };

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // set up labels for bar chart based on retrived data from database
  const budgetLabels = (budget) => {
    let labels = [];
    if (budget === undefined) return labels;
    for (let i = 0; i < budget.length; i++) {
      const date = new Date(formatDate(budget[i].start_date));
      const month = date.toLocaleString("default", { month: "long" });
      labels.push(month + ": " + budget[i].name);
    }
    return labels;
  };

  // set up expense data in specific time range
  const budgetExpense = (budget) => {
    let expenseData = [];
    if (budget === undefined) return expenseData;
    for (let i = 0; i < budget.length; i++) {
      let intForMoney = Number(
        budget[i].total_expense.replace(/[^0-9.-]+/g, "")
      );
      expenseData.push(intForMoney);
    }
    return expenseData;
  };

  // set up spending limit data in specific time range
  const budgetSpendingLimit = (budget) => {
    let spendingLimitData = [];
    if (budget === undefined) return spendingLimitData;
    for (let i = 0; i < budget.length; i++) {
      let intForMoney = Number(
        budget[i].spending_limit.replace(/[^0-9.-]+/g, "")
      );
      spendingLimitData.push(intForMoney);
    }
    return spendingLimitData;
  };

  // use retrived goal data from database to feed pie chart
  const goalData = (goals) => {
    let goalsData = [];

    if (goals === undefined) return goalsData;
    for (let i = 0; i < goals.length; i++) {
      let intForMoney = Number(
        goals[i].amount_to_goal.replace(/[^0-9.-]+/g, "")
      );
      goalsData.push(intForMoney);
    }

    return goalsData;
  };

  //  use retrived added to goal data from database to feed pie chart 
  const addedToGoalData = (goals) => {
    let addedToGoalData = [];

    if (goals === undefined) return addedToGoalData;
    for (let i = 0; i < goals.length; i++) {
      let intForMoney = Number(goals[i].amount_added.replace(/[^0-9.-]+/g, ""));
      addedToGoalData.push(intForMoney);
    }

    return addedToGoalData;
  };

  // console.log("addedToGoal", addedToGoalData(goals));
  // console.log("goalData", goalData(goals));

  // set up labels for piechat
  const goalLabel = (goals) => {
    let goalLabel = [];
    if (goals === undefined) return goalLabel;
    for (let i = 0; i < goals.length; i++) {
      goalLabel.push(goals[i].name);
    }
    return goalLabel;
  };

  // percent calculate for progress
  const percentCalculator = (num, den) => {
    const number1 = num ? Number(num.replace(/[^0-9.-]+/g, "")) : 0.0;
    const number2 = den ? Number(den.replace(/[^0-9.-]+/g, "")) : 0.0;

    return ((number1 / number2) * 100).toFixed(2);
  };

  // generate a progress bar for each goal
  const goalArr = goals || [];
  const goalProgress = goalArr.map((goal, index) => {
      const currentValue = percentCalculator(goal.amount_added, goal.amount_to_goal);
      return (
        <ProgressBar
          key={index}
          currentValue={currentValue}
          name={goal.name}
          spendLimit={goal.amount_to_goal}
        />
      );
  })
  
  // use retrived data from database to feed bar chart
  const data = {
    labels: budgetLabels(budget),
    datasets: [
      {
        label: "Total_expense",
        data: budgetExpense(budget),
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      },
      {
        label: "Spending_limit",
        data: budgetSpendingLimit(budget),
        backgroundColor: "rgba(255, 205, 86, 0.2)"
      }
    ]
  };

  // option setup for barchart
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 4
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right"
      },
      title: {
        display: true
      }
    }
  };

  useEffect(() => {
    searchDate(formatDate(selectedFromDate), formatDate(selectedToDate));
  }, []);

  // use retrived data from database to feed pie chart
  const pieGoalData = {
    labels: goalLabel(goals),
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#6800B4"
        ],
        hoverBackgroundColor: [
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
          "#35014F"
        ],
        data: goalData(goals)
      }
    ]
  };

  const pieAddedAmountData = {
    labels: goalLabel(goals),
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#6800B4"
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
          "#35014F"
        ],
        data: addedToGoalData(goals)
      }
    ]
  };

  return (
    <>
      <NavBar />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          justifyContent="space-around"
          className={classes.timePicker}
        >
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="From"
            value={selectedFromDate}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="To"
            value={selectedToDate}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <button
          onClick={() =>
            searchDate(formatDate(selectedFromDate), formatDate(selectedToDate))
          }
        >
          Search
        </button>
      </MuiPickersUtilsProvider>
      <div className="barchart">
        <h3>Expenses vs Spending Limit</h3>
        <BarChart barData={data} options={options} />
      </div>

      <div className="piechart-goal">
        <h3>Goals</h3>
        <PieChart pieData={pieGoalData} />
      </div>

      <div className="piechart-added-amount">
        <h3>Added amount to goals</h3>
        <PieChart pieData={pieAddedAmountData} />
      </div>
        {goalProgress}
    </>
  );
}
