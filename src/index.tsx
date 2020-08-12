import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  /* useEffect(() => {
    async function clearStorage(): Promise<void> {
      await AsyncStorage.removeItem('@GoMarketplace.products');
    }

    clearStorage();
  }, []); */

  return (
    <View style={{ backgroundColor: '#312e38', flex: 1 }}>
      <AppContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <Routes />
      </AppContainer>
    </View>
  );
};

export default App;
