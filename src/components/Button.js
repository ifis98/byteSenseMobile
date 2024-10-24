import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ButtonComponent = ({ title, onPress }) => {
  const { primary, text } = useTheme(); // Get theme color
  const styles = useButtonStyles(primary, text); // Generate dynamic styles with a custom hook

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Custom hook for dynamic button styles
const useButtonStyles = (primary, text) => {
  return StyleSheet.create({
    button: {
      height: 48,
      paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      borderRadius: 8,
      backgroundColor: primary,
      alignSelf: 'stretch', // Makes the button stretch to fill the parent width
    },
    buttonText: {
      color: text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};

export default ButtonComponent;
