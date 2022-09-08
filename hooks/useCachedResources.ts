import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
          'shizuru': require('../assets/fonts/Shizuru-Regular.ttf'),
          'rubik': require('../assets/fonts/Rubik-Regular.ttf'),
          'quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
          'quicksand-bold': require('../assets/fonts/Quicksand-Bold.ttf'),
          'champagne-limousines': require('../assets/fonts/Champagne-Limousines.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
