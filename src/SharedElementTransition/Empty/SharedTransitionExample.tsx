import React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import ProfilesScreen, { Tag } from './ProfilesScreen';

type StackParamList = {
  Profiles: undefined;
  Home: { tag: Tag };
  Details: { item: any };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function SharedTransitionExample() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Profiles"
        component={ProfilesScreen}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          animation: 'fade',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
