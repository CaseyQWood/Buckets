import React, {useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import EditCategory from '../components/EditCategory';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import InfoIcon from '@material-ui/icons/Info';
import { List } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


import '../styles/progressBar.scss'

export default function BudgetCategory(props) {
  const {name, currentValue, spend_limit, onDelete, onEdit, category_id} = props;
  const [show, setShow] = useState(false)
  const value = currentValue === undefined ? 0 : currentValue;

  let backgroundColor;

  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };
  
  const fillerStylesBudget = {
    height: '100%',
    width: `${value}%`,
    maxWidth: '100%', 
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }

  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function CircularStatic(props) {
    const [progress, setProgress] = React.useState(10);
    
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress(props.value);
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return <CircularProgressWithLabel size={100} thickness={7} color={props.value >= 100 ? 'secondary' : 'primary'} value={progress} />;
  }

  // make it so at 75 goes yellow 100 red 
  // when over 100% try and indicate its more then one rotation 


  
  return(
   
  
      <Card style={props.activeCategory === props.category_id ? {width: "calc((100% / 2) - 1em)", display: 'flex', height: '15em'} : {width: "calc((100% / 4) - 1em)", height: '15em'}} >

        <CardContent style={{width: '-webkit-fill-available'}}>
          
          <div className='card__title'>
            <h3>
              {name}
            </h3>
            <span onClick={() => props.expand(props.category_id)}>
              <InfoIcon/>
            </span>
            
          </div>
          <div className='dial__graph' onClick={() => {setShow(true)}}>
            <CircularStatic value={value}/>
          </div>
          <Typography  color="textSecondary" gutterBottom>
            Total amount:{spend_limit}
          </Typography>
          <div className="category-icons">
            <EditCategory onEdit={onEdit} categoryId={category_id}/>
            <DeleteIcon onClick={onDelete}/>
          </div>
        </CardContent>
        
    
       
          <Paper style={{maxHeight: "15em", overflow: 'auto', width: '-webkit-fill-available'}}>
            <List>
            {props.getExpensesByCategory(props.expenses, props.category_id)}
            </List>
           
          </Paper>
          
          {/* {show ? props.getExpensesByCategory(props.expenses, props.category_id) : <div></div>} */}
       

      </Card>
    
    
    



    // <div className="budget-div">
    //   <h2>{name}</h2>
    //   <div className="progress-bar-budget">
    //     <div className="category-progress-bar">
    //       <div className="progress-container">
    //         <div className="progress-filler" style={fillerStylesBudget}>
    //           <div className="progress-label">{`${value}%`}</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="max-value-budget">
    //     <h2>{spend_limit}</h2>
    //   </div>
    //   <div className="category-icons">
    //     <EditIcon />
    //     <DeleteIcon onClick={onDelete}/>
    //   </div>
    // </div>
  )
}