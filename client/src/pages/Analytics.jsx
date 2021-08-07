import "date-fns";
import React, { useContext } from "react";
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
  const currentDate = Date.now();
  const [selectedFromDate, setSelectedFromDate] = React.useState(
    new Date(currentDate)
  );
  const [selectedToDate, setSelectedToDate] = React.useState(
    new Date(currentDate)
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
      const month = date.toLocaleString('default', { month: 'long' });
      labels.push(month + ": " + budget[i].name);
    }
    return labels;
  };

  // set up expense data in specific time range
  const budgetExpense = (budget) => {
    let expenseData = [];
    if (budget === undefined) return expenseData;
    for (let i = 0; i < budget.length; i++) {
      let intForMoney = Number(budget[i].total_expense.replace(/[^0-9.-]+/g,""));
      expenseData.push(intForMoney)
    }
    return expenseData;
  };

  // set up spending limit data in specific time range
  const budgetSpendingLimit = (budget) => {
    let spendingLimitData = [];
    if (budget === undefined) return spendingLimitData;
    for (let i = 0; i < budget.length; i++) {
      let intForMoney = Number(budget[i].spending_limit.replace(/[^0-9.-]+/g,""));
      spendingLimitData.push(intForMoney)
    }
    return spendingLimitData;
  };

  // use retrived data from database to feed pie chart
  const goalData = (goals) => {
    let goalsData = [];

    if (goals === undefined) return goalsData;
    for (let i = 0; i < goals.length; i++) {
      let intForMoney = Number(goals[i].amount_to_goal.replace(/[^0-9.-]+/g,""));
      goalsData.push(intForMoney)
    }

    return goalsData;
  };

 // set up labels for piechat
 const goalLabel = (goals) => {
    let goalLabel = [];
    if (goals === undefined) return goalLabel;
    for (let i = 0; i < goals.length; i++) {
      goalLabel.push(goals[i].name);
    }
    return goalLabel;
 }

  // use retrived data from database to feed bar chart
  const data = {
    labels: budgetLabels(budget),
    datasets: [
      {
        label: "Total_expense",
        data: budgetExpense(budget),
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      },
      {
        label: "Spending_limit",
        data: budgetSpendingLimit(budget),
        backgroundColor: 'rgba(255, 205, 86, 0.2)'
      }
    ]
  };

  // option setup for barchart
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expenses vs Spending Limit',
      }
    }
  };

  // use retrived data from database to feed pie chart
  const pieData = {
    labels: goalLabel(goals),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F',
        '#35014F',
        ],
        data:  goalData(goals)
      }
    ]
  }

  return (
    <>
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
      <BarChart barData={data} options={options}/>
      <PieChart pieData={pieData}/>
    </>
  );
}
