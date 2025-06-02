import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For handling navigation
import profileLogo from '../assets/profileNew.png'; // Profile image
import backArrow from '../assets/backArrow.png'; // Back arrow image

const { width } = Dimensions.get('window'); // Get screen width

const Header = ({
  title = 'Sleep Report',
  showBackArrow = true,
  rightText,
  onRightPress,
}) => {
  const navigation = useNavigation(); // For handling navigation

  return (
    <View style={styles.headerContainer}>
      {/* Back Arrow */}
      {showBackArrow ? (
        <TouchableOpacity onPress={() => navigation.goBack('')} style={styles.backArrowContainer}>
          <Image source={backArrow} style={styles.backArrow} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backArrowContainer} />  // Empty view for spacing
      )}

      {/* Title, centered */}
      <Text style={styles.title}>{title}</Text>

      {/* Right side */}
      {rightText ? (
        <TouchableOpacity onPress={onRightPress} style={styles.profileContainer}>
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.profileContainer}>
          <Image source={profileLogo} style={styles.profileImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60, // Set a fixed height for the header
    paddingHorizontal: 16,
    marginBottom:0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between arrow, title, and profile
    marginTop:50,
  },
  backArrowContainer: {
    width: 40, // Ensure the back arrow has enough space
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: "500",
    fontFamily:"Ubuntu",
    flex: 1,  // Make sure the title takes available space
  },
  profileContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 20, // Circular profile image
  },
  rightText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 16,
  },
});

export default Header;
