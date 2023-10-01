import React from 'react';
import { StyleSheet, View } from 'react-native';

//Import the 'BMIcalculator' component from './app/components/BMIcalculator'
import BMIcalculator from './app/components/BMICalculator.js'
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* Render the 'BMIcalculator' component */}
                <BMIcalculator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
