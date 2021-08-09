import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import axios from 'axios';



const filterActiveBudget = (listOfBudgets, id) => {
  console.log('this is id',id)
  console.log('this is list', listOfBudgets)
  let container = ''

  listOfBudgets.forEach(x => x.id === id ? container = x.name: console.log('false') )
  return container
}



export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  

  const budgetNames = (listOfBudgets) => {
    let container = []
    listOfBudgets.forEach(budget => {
      budget.active ? container.unshift(budget.name) : container.push(budget.name)
    })
    return container
  }

  console.log('*********', budgetNames(props.budgetList))
  // const [array, setArray] = useState(budgetNames())



  const handleClick = () => {
  };

  const handleMenuItemClick = (event, index) => {
    console.log('this is event !!!',event)
    props.setSelectedIndex(index)
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    console.log('----------', budgetNames(props.budgetList)[props.selectedIndex])

    axios.put(`http://localhost:3002/api/budgets/save/1`, {budgetData: props.budgetList[props.selectedIndex], currentBudgetId: props.currentBudgetId})
    .then((res) => {
      console.log('WHAT THE SHIT IS THIS',props.state)
      
      res.data.forEach((x) => {if(x.active === true) {props.setState(prev => ({...prev, budget_id: x.id})   )}})

      console.log('WHAT THE SHIT IS THIS AFTER',props.state)
      window.location.reload()
    })
  }, [props.selectedIndex])


  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{budgetNames(props.budgetList)[props.selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {budgetNames(props.budgetList).map((option, index) => (

                      <MenuItem
                        key={index}
                        disabled={index === 0}
                        selected={index === props.selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {console.log('WHAT IS IT PRECIOUS',option)}
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}