import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Active from './Active';
import History from './History';

const Tab = createMaterialTopTabNavigator();

function BookingListTab() {
    return (
      <Tab.Navigator screenOptions={{tabBarIndicatorStyle:{backgroundColor:'#C81D35'}}}>
        <Tab.Screen name="Active" component={Active}/>
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    );
  }

  export default BookingListTab;