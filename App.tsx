import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SharedTransitionExample from './src/SharedElementTransition';
import LayoutAnimationListExample from './src/LayoutAnimationList';
import AnimatableTextExample from './src/AnimatableText';
import ColorInterpolationExample from './src/ColorInterpolation';
import CustomAnimationExample from './src/CustomAnimation';
import GestureHandlerWithSkiaExample from './src/GestureHandlerWithSkia';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <SharedTransitionExample />
        {/* <SafeAreaView style={styles.container}>
          <Text>Advanced Reanimated Workshops for Shopify</Text>
          {/* <LayoutAnimationListExample /> */}
          {/* <AnimatableTextExample /> */}
          {/* <ColorInterpolationExample /> */}
          {/* <CustomAnimationExample /> */}
          {/* <GestureHandlerWithSkiaExample /> */}
        {/* </SafeAreaView> */} 
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default App;
