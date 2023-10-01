import React from "react";
import {
    StyleSheet, TextInput, TouchableOpacity, View, Text
}
    from 'react-native';

export default class BMIcalculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: '',
            weight: '',
            measurementSystem: 'si', // Default to standard system
            bmi: null,
            bmiCategories: '',
        };
    }

    clearForm = () => {
        this.setState({
            height: '',
            weight: '',
            bmi: null,
            bmiCategories: '',
        });
    };
    calculateBMI = () => {
        const { height, weight, measurementSystem } = this.state;

        if (height && weight) {
            let bmi;

            if (measurementSystem == 'si') {
                //SI measurement system (kg, cm)
                bmi = (weight / (height / 100) ** 2);
            } else {
                //Imperial measurement system (lb, in)
                bmi = (weight / (height ** 2)) * 703;
            }
            const bmiCategories = this.getBMICategories(bmi);
            this.setState({ bmi, bmiCategories });
        }
    };

    getBMICategories = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 24.9) return 'Normal Weight';
        if (bmi < 29.9) return 'Overweight';
        return 'Obese';
    };

    // Function to switch between measurement systems
    toggleMeasurementSystem = () => {
        this.setState((prevState) => ({
            measurementSystem: prevState.measurementSystem === 'si' ? 'imperial' : 'si',
            height: '', // When switching, clear height input
            weight: '', // When switching, clear weight input
            bmi: null, // When switching, clear result of BMI
            bmiCategories: '', // When switching, clear BMI categories
        }));
    };

    render() {
        const { height, weight, measurementSystem, bmi, bmiCategories } = this.state;
        return (
            <View style={styles.bmicalculator}>
                <Text style={styles.title}>BMI Calculator</Text>

                <TouchableOpacity
                    style={styles.toogleButton}
                    onPress={this.toggleMeasurementSystem}
                >
                    <Text style={styles.toogleButtonText}>Switch to {measurementSystem === 'si' ? 'Imperial' : 'SI'} System</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Your Height({measurementSystem === 'si' ? 'centimeters' : 'inches'})</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={`Input Your Height in ${measurementSystem === 'si' ? 'centimeters' : 'inches'}`}
                    value={height}
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ height: text })}
                />

                <Text style={styles.label}>Your Weight({measurementSystem === 'si' ? 'kilograms' : 'pounds'})</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={`Input Your Weight in ${measurementSystem === 'si' ? 'kilograms' : 'pounds'}`}
                    value={weight}
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ weight: text })}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#6f48b3' }]}
                        onPress={this.calculateBMI}>
                        <Text style={styles.btntext}>Compute BMI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#df5e8d' }]}
                        onPress={this.clearForm}>
                        <Text style={styles.btntext}>Clear</Text>
                    </TouchableOpacity>
                </View>

                {bmi !== null && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.result}>BMI: 
                            <Text style={styles.resultText}> {bmi.toFixed(2)}</Text>
                        </Text>
                        <Text style={styles.result}>BMI Category: 
                            <Text style={styles.resultText}> {bmiCategories}</Text>
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bmicalculator: {
        flex: 1,
        padding: 40,
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#6f48b3',
        paddingBottom: 8,
        marginBottom: 36,
        fontWeight: 'bold',
    },
    toogleButton: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#747c94',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 44,
    },
    toogleButtonText: {
        color: 'white',
    },
    label: {
        fontSize: 16,
        color: '#6f48b3',
        marginBottom: 8,
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        color: '#df5e8d',
        marginBottom: 16,
        paddingStart: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        height: 40,
        width: 132,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 8,
        marginTop: 28,
    },
    btntext: {
        fontSize: 16,
        color: 'white',
    },
    resultContainer: {
        marginTop: 40,
    },
    result: {
        fontSize: 20,
        color: '#6f48b3',      
    },
    resultText: {
        color: '#df5e8d',
    }
});