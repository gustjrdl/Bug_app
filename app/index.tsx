  import {useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

import Root from './navigation/root';
import { Provider } from 'react-redux';
import store from './store/store';

  export default function App() {

    const isDark  = useColorScheme() === "light";
    return (
      <Provider store={store}> 
        <NavigationContainer independent={true} theme={isDark ? DefaultTheme : DarkTheme}>
              <Root></Root>
        </NavigationContainer>
      </Provider>
    );  
  }
