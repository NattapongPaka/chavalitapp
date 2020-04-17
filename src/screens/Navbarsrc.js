
import { createBottomTabNavigator, createAppContainer ,createStackNavigator} from 'react-navigation';
import Navbar_Home from './Navbar_Home';
import Navbar_Brand from './Navbar_Brand';
import Navbar_Orther from './Navbar_Orther';
import Navbar_Doctor from './Navbar_Doctor';
import Navbar_Point from './Navbar_Point';
import Loginsrc from './Loginsrc';

// const PointNav = createStackNavigator({
//   Navbar_Point : Navbar_Point,
//   Login : Loginsrc

// })

var  ProductNavigator = createBottomTabNavigator({
  Home: {screen: Navbar_Home},
  Point: {screen:Navbar_Point},
  Brand: {screen: Navbar_Brand},
  Optometrist: {screen:Navbar_Doctor},
  Menu:{screen:Navbar_Orther}
},


{
  tabBarPosition:'bottom',
  fontFamily:'Prompt-Light',
  fontSize: 18,
  tabBarOptions: {
    activeTintColor: "#58D7B5", 
        inactiveTintColor: "grey", 
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#fff",
    style: {
      backgroundColor: '#f06823',
      fontFamily:'Prompt-Light',
      fontSize: 18,
    }
  },



  
});


ProductNavigator.navigationOptions = {
  
 }

export default createAppContainer(ProductNavigator);
