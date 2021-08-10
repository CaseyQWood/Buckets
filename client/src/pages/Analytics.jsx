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
import useVisiblity from "../hooks/useVisiblity";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";
import "../styles/Analytics.scss";

const useStyles = makeStyles((theme) => ({
  timePicker: {
    backgroundcolor: "gold",
    color: "gold",
    marginTop: "50px"
  }
}));

export default function Analytics() {
  // date set
  const classes = useStyles();
  const toDefaultDate = Date.now();
  const fromDaultDate = new Date(toDefaultDate);
  fromDaultDate.setMonth(fromDaultDate.getMonth() - 1);

  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);

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
    let labelsObjArr = [];
    if (budget === undefined) return labels;
    for (let i = 0; i < budget.length; i++) {
      let labelsObj = {};
      const date = new Date(formatDate(budget[i].start_date));
      const month = date.toLocaleString("default", { month: "long" });
      labelsObj.month = month;
      labelsObj.cat = budget[i].name;
      labelsObjArr.push(labelsObj);
      labels.push([month + ":" + budget[i].name]);
    }
    return labelsObjArr;
  };

  // set up month arr
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // sort data based on month
  const sorter = (a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  };

  const sorttedBudgetLable = budgetLabels(budget).sort(sorter);

  const sorttedBudgetLableArr = (obj) => {
    const arr = []
    for(const ele of obj) {
      arr.push(ele.month +":"+ ele.cat);
    }
    return arr;
  }
  
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

  // use retrived data from database to feed bar chart
  const data = {
    labels: sorttedBudgetLableArr(sorttedBudgetLable),
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        data: addedToGoalData(goals)
      }
    ]
  };

  return (
    <>
      <div className="analtyics-emperor">
        <div>
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
              <button
                className="search-button"
                onClick={() =>
                  searchDate(
                    formatDate(selectedFromDate),
                    formatDate(selectedToDate)
                  )
                }
              >
                SEARCH
              </button>
            </Grid>
          </MuiPickersUtilsProvider>
          <div className="chart-container">
            <div className="barchart">
              <p className="chart-title">Expenses vs Spending Limit</p>
              <div style={{ width: "650px", height: "660px" }}>
                <BarChart barData={data} options={options} />
              </div>
            </div>
            <div className="piechart-container">
              <div className="piechart-goal" style={{ width: "320px" }}>
                <p className="chart-title">Goals</p>
                <PieChart pieData={pieGoalData} />
              </div>

              <div className="piechart-added" style={{ width: "320px" }}>
                <p className="chart-title">Added amount to goals</p>

                <PieChart pieData={pieAddedAmountData} />
                <ChatButton onClick={toggleVisibility} />
                {ChatComponent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
