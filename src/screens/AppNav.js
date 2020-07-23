import { createStackNavigator } from 'react-navigation-stack';
import LogIn from './LogIn';
import SignUp from './SignUp';
import studyScreen from './studyScreen';
import Home from '../components/Home';
import Account from './Account';
import Info from './Info'


const AppNavigator = createStackNavigator({
  LogIn: { screen: LogIn },
  SignUp: { screen: SignUp},
  studyScreen: { screen: studyScreen},
  Account: {screen: Account},  
  Info: {screen: Info},
  Home: {screen: Home},
});

export default AppNavigator;