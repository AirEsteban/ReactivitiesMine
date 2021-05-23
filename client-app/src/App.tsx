import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
//import '../semantic/dist/semantic.css'
import { Header, Icon, List } from 'semantic-ui-react';
/*;
import { ducks } from './demo';
import DuckItem from './DuckItem'
  {ducks.map(duck => (
      <DuckItem duck = {duck} key={duck.name} />
  ))}
*/
function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data)
    })
  }, [])
  return (
    <div>
      <Header as='h2' textAlign='center'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
        <List>
        {
          activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
            
          ))
        }
        </List>
    </div>
  );
}

export default App;
