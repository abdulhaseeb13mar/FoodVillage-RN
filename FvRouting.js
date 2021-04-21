import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './FvFrequentUsage/FvRefNavigation';
import FvHome from './FvMainScreens/FvHome';
import FvSP from './FvMainScreens/FvSP';
// import FvCart from './FvMainScreens/FvCart';
import FvFav from './FvMainScreens/FvFav';
import FvContact from './FvMainScreens/FvContact';
import FvConfirmOrder from './FvMainScreens/FvConfirmOrder';
import FvSearch from './FvMainScreens/FvSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="FvHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="FvHome" component={FvHome} />
        <Stack.Screen name="FvSP" component={FvSP} />
        <Stack.Screen name="FvFav" component={FvFav} />
        {/* <Stack.Screen name="FvCart" component={FvCart} /> */}
        <Stack.Screen name="FvContact" component={FvContact} />
        <Stack.Screen name="FvConfirmOrder" component={FvConfirmOrder} />
        <Stack.Screen name="FvSearch" component={FvSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
