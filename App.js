/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class App extends Component {

  state = {
    currentPage: 0,
    dataSource: ds.cloneWithRows([
      '商品1',
      '商品2',
      '商品3',
      '商品4',
      '商品5',
      '商品6',
      '商品7',
      '商品8',
      '商品9',
      '商品10',
    ]),
    advertisements: [
      {
        title: '广告1',
        backgroundColor: 'gray',
      },
      {
        title: '广告2',
        backgroundColor: 'orange',
      },
      {
        title: '广告3',
        backgroundColor: 'yellow',
      },
    ],
    searchText: '',
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  startTimer() {
    this.inverval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({currentPage: nextPage});
      const offSetX = nextPage * Dimensions.get('window').width;
      this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animate: true});
    }, 2000);
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
        <TouchableHighlight
            onPress={() => Alert.alert('shang pin', null, null)}
        >
          <View style={styles.row}>
            <Text>{rowData}</Text>
          </View>
        </TouchableHighlight>
    )
  }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor={'blue'}
              networkActivityIndicatorVisible={true}
          />
          <View style={styles.searchbar}>
            <TextInput
                style={styles.input}
                placeholder='搜索商品'
                onChangeText={(text) => {
                  this.setState({searchText:text})
                }}
            ></TextInput>
            <Button
                style={styles.button}
                title='搜索'
                onPress={() => Alert.alert('搜索内容'+this.state.searchText, null, null)}
            ></Button>
          </View>
          <View style={styles.advertisement}>
            <ScrollView
                ref='scrollView'
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
            >
              {
                this.state.advertisements.map((advertisement, index) => {
                  return (
                      <TouchableHighlight
                          key={index}
                          onPress={() => Alert.alert('guang gao', null, null)}
                      >
                        <Text style={[styles.advertisementContent, {
                          backgroundColor: advertisement.backgroundColor,
                        }]}>
                          {advertisement.title}
                        </Text>
                      </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>
          <View style={styles.products}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchbar: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    height: 40,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    flex: 1,
  },
  advertisement: {
    height: 180,
  },
  products: {
    flex: 1,
    backgroundColor: 'green',
  },
  row: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180,
  },
});
