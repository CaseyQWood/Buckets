import React, {useState} from 'react'
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

export default function SharedTemplate(props) {
  const [show, setShow] = useState(true)
  const history = useHistory();

  const save = (messageData) => {
    const url = 'http://localhost:3002/api/messages/save'
    const userId = sessionStorage.token

    // if this is broken try returning the axios request
    axios.put(url, {...messageData, ownerId: userId})
    setShow(false)
    setTimeout(() => {history.push('/budget') }, 50)
    
  }

  const details = props.message
  


  return (
    <li className='message__card'>
    <Card >
      <CardContent>
          <DraftsIcon />
        <Typography variant="body2" component="p">
          {details.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' onClick={() => save(props)} color='default'>Accept</Button>
        <Button size="small">delete</Button>
      </CardActions>
    </Card>
    </li>
    // <>
    //   {show ? 
    //     <>
    //       <ListItem button >
    //         <ListItemIcon>
    //           <DraftsIcon />
    //           </ListItemIcon>
    //         <ListItemText className='font' primary={details.message} />
    //         <Button size="small" variant='contained' onClick={() => save(props)} color='default'>Accept</Button>
    //       </ListItem>
    //       <Divider/>
    //     </>
    //     : <div></div>
    //   }
    // </>
    
    // <>
    // {show ? <li>{details.message} <button onClick={() => save(props)}>Accept</button></li> : <div></div>}
    // </>
  )
}