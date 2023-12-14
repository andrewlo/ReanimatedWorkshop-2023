import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated, {withSpring} from 'react-native-reanimated';

type StackParamList = {
  Profiles: undefined;
  Home: {tag: Tag};
  Details: {item: any};
};

const profiles = {
  dog: {
    image: require('../assets/avatars/dog.png'),
    title: 'Maria',
  },
  desert: {
    image: require('../assets/avatars/desert.png'),
    title: 'Alice',
  },
  cat: {
    image: require('../assets/avatars/cat.png'),
    title: 'James',
  },
  mountains: {
    image: require('../assets/avatars/mountains.png'),
    title: 'Jennifer',
  },
  parrot: {
    image: require('../assets/avatars/parrot.png'),
    title: 'Thomas',
  },
  wolf: {
    image: require('../assets/avatars/wolf.png'),
    title: 'Margaret',
  },
} as const;

type Tag = keyof typeof profiles;

const forests = [
  {
    image: require('../assets/nature/forest-2.jpg'),
    title: 'Arne Forest',
    id: 'forest-1',
  },
  {
    image: require('../assets/nature/forest-4.jpg'),
    title: 'Birger Forest',
    id: 'forest-2',
  },
  {
    image: require('../assets/nature/forest-1.jpg'),
    title: 'Bjørn Forest',
    id: 'forest-3',
  },
  {
    image: require('../assets/nature/forest-3.jpg'),
    title: 'Halfdan Forest',
    id: 'forest-4',
  },
  {
    image: require('../assets/nature/forest-5.jpg'),
    title: 'Astrid Forest',
    id: 'forest-5',
  },
] as const;

const lakes = [
  {
    image: require('../assets/nature/lake-1.jpg'),
    title: 'Lake Annabelle',
    id: 'lake-1',
  },
  {
    image: require('../assets/nature/lake-2.jpg'),
    title: 'Lake Charlotte',
    id: 'lake-2',
  },
  {
    image: require('../assets/nature/lake-3.jpg'),
    title: 'Lake Claire',
    id: 'lake-3',
  },
  {
    image: require('../assets/nature/lake-4.jpg'),
    title: 'Lake Josephine',
    id: 'lake-4',
  },
  {
    image: require('../assets/nature/lake-5.jpg'),
    title: 'Lake Sophie',
    id: 'lake-5',
  },
  ...forests,
] as const;

const generateNewList = (data, prefix) =>
  data.map(item => ({
    ...item,
    title: prefix + item.title,
    id: prefix + item.id,
  }));

const generateListOfLists = (size: number, indexOffset = 0) => {
  // console.log('indexOffset', indexOffset);
  return [...new Array(size)].map((_, index) => ({
    id: `${index + indexOffset}`,
    list: generateNewList(lakes, `${index + indexOffset}`),
  }));
};

const FIRST = 20;
const PAGE_SIZE = 10;

export default function HomeScreen({
  route,
  navigation,
}: NativeStackScreenProps<StackParamList, 'Home'>) {
  // const { tag } = route.params;
  const tag = 'dog';

  const [listOfLists, setListOfLists] = useState(() =>
    generateListOfLists(FIRST),
  );

  const fetchMore = () => {
    setListOfLists(prevList => {
      // console.log('fetch more', prevList.length);

      const newList = generateListOfLists(PAGE_SIZE, prevList.length + 1);

      // console.log(JSON.stringify(newList, null, 2));

      return [...prevList, ...newList];
    });
  };

  const renderHorizontalList = ({item, index}) => {
    // console.log('render', item);
    return (
      <View>
        <Text>Section: {item.id}</Text>
        <FlatList
          key={index}
          data={item.list}
          style={homeStyles.margin}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Pressable
                style={homeStyles.marginHorizontal}
                onPress={() => {
                  navigation.navigate('Details', {item});
                }}>
                <Animated.Image
                  sharedTransitionTag={item.id}
                  source={item.image}
                  style={homeStyles.image}
                />
                <Animated.Text style={homeStyles.imageLabel}>
                  {item.title}
                </Animated.Text>
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
    );
  };

  // console.log(JSON.stringify(listOfLists, null, 2));

  return (
    <View style={homeStyles.container}>
      <StatusBar barStyle={'dark-content'} />

      <View style={homeStyles.headerContainer}>
        <Pressable
          style={homeStyles.pressable}
          onPress={() => navigation.goBack()}>
          <Text style={homeStyles.title}>Home</Text>
          <Animated.Image
            source={profiles[tag as Tag].image}
            style={homeStyles.profile}
          />
          <Animated.Text />
        </Pressable>
      </View>
      {/* <Text style={homeStyles.subTitle}>Lakes</Text> */}
      <FlatList
        data={listOfLists}
        renderItem={renderHorizontalList}
        onEndReached={fetchMore}
        keyExtractor={item => item.id}
      />

      {/* <Text style={homeStyles.subTitle}>Forests</Text>
      <FlatList
        data={forests}
        style={homeStyles.margin}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Pressable
              style={homeStyles.marginHorizontal}
              onPress={() => {
                navigation.navigate('Details', {item});
              }}>
              <Animated.Image
                sharedTransitionTag={item.id}
                source={item.image}
                style={homeStyles.image}
              />
              <Animated.Text style={homeStyles.imageLabel}>
                {item.title}
              </Animated.Text>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        horizontal={true}
      /> */}
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: Platform.OS === 'ios' ? 120 : 80,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  profile: {
    height: 45,
    width: 45,
  },
  image: {
    height: 200,
    width: 150,
    marginBottom: 8,
    borderRadius: 10,
  },
  imageLabel: {
    fontSize: 16,
    color: '#1e293b',
  },
  title: {
    fontSize: 40,
    flex: 1,
    color: '#1e293b',
  },
  subTitle: {
    fontSize: 24,
    color: '#334155',
    marginBottom: 15,
    marginLeft: 20,
  },
  margin: {
    marginLeft: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
});
