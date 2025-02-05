
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions, including "Creating a new application" step, before proceeding.

## Step 1: Install Node.js and Yarn

Make sure to install Node.js using **nvm**:

```bash
# Install Node.js version 18.x using nvm
nvm install 18
nvm use 18
```

Ensure you're using the correct versions:
```bash
node -v     # should be 18.x or higher
npm -v      # should be 10.x or higher
yarn -v     # should be 3.x or higher
```

## Step 2: Install Dependencies

Install the required dependencies using Yarn:

```bash
yarn install
```

> If you're using npm instead of Yarn, run `npm install`.

## Step 3: Start Metro Bundler

To start **Metro**, the JavaScript _bundler_ that ships _with_ React Native, run the following command:

```bash
npx react-native start --reset-cache
```

Let **Metro** run in its _own_ terminal.

## Step 4: Running the App

### For Android

Open another terminal window, and run:

```bash
npx react-native run-android
```

Make sure you have an Android emulator running or a device connected.

### For iOS

Open another terminal window, and run:

```bash
npx react-native run-ios
```

This will open the iOS simulator or run the app on a connected iOS device.

## Step 5: CocoaPods (iOS)

For iOS, ensure that CocoaPods are installed. Run the following commands:

```bash
cd ios
pod install
cd ..
```

## Step 6: Local Storage Setup

If your app uses AsyncStorage for local storage, ensure that the following key-value is saved in your local storage before proceeding:

```bash
# Save user token (for example)
await AsyncStorage.setItem('userToken', 'your-token');
```

## Step 7: Testing the App

To test the app on both Android and iOS, follow these steps:

1. Run Metro: `npx react-native start --reset-cache`
2. Open another terminal window.
   - For iOS: Press `i` to run on the iOS simulator.
   - For Android: Press `a` to run on the Android emulator.

## Congratulations! 🎉

You've successfully set up and run your React Native app on both Android and iOS!

## Troubleshooting

If you run into any issues, try the following:
- Clear Yarn cache: `yarn cache clean`
- Reinstall dependencies: `yarn install`
- Clear npm cache (if using npm): `npm cache clean --force`
- Reset Metro cache: `npx react-native start --reset-cache`

For more help, see the official [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## Useful Resources

To learn more about React Native, take a look at these resources:
- [React Native Website](https://reactnative.dev)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [React Native Basics](https://reactnative.dev/docs/getting-started)
- [Official Blog](https://reactnative.dev/blog)
- [React Native GitHub](https://github.com/facebook/react-native)

## Suggested Videos and Blogs

If you encounter errors, here are some useful links:

- [React Native Crash Course (YouTube)](https://www.youtube.com/watch?v=0-S5a0eXPoc)
- [React Native Setup Tutorial (Blog)](https://www.freecodecamp.org/news/react-native-tutorial/)


nstall Java SDK (version 11+). Set the Java SDK path in .bash_profile, .zshrc, or your preferred shell configuration file:
bash
Copy code
export JAVA_HOME=/path/to/your/jdk
export PATH=$JAVA_HOME/bin:$PATH
Install Android SDK and NDK. Make sure the Android SDK path is set in the .local.properties file:
Create or edit the file android/local.properties and add the following lines:
properties
Copy code
sdk.dir=/Users/your-username/Library/Android/sdk
ndk.dir=/Users/your-username/Library/Android/sdk/ndk/23.1.7779620
cmake.dir=/Users/your-username/Library/Android/sdk/cmake/3.22.1
Install CocoaPods for iOS dependencies:
bash
Copy code
sudo gem install cocoapods
cd ios/
pod install
cd ../