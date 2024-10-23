import React, { useState, memo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import eye from '../assets/eye.png';

const InputComponent = memo(({ label, placeholder, value, onChangeText, isPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // To toggle password visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.30)" // Placeholder color
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible} // Toggle visibility based on isPasswordVisible
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
             <Image style={styles.eyeStyles}  source={eye} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20, // Adds some space between inputs if you have multiple
  },
  label: {
    color: '#A8A9AA', // var(--Grey-grey-400, #A8A9AA)
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21, // 150% of 14px
    marginBottom: 8,
  },
  eyeStyles:{
    width: 20,
    height: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2D2E',
    borderRadius: 12,
  },
  input: {
    flex: 1, // Take up all the available space
    height: 40,
    padding: 12,
    color: '#FFFFFF', // Text color inside TextInput
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21, // 150% of 14px
  },
  iconContainer: {
    padding: 12, // Add padding to make the icon clickable
    marginRight: 16, // Margin to the right of the input field
  },
});

export default InputComponent;
