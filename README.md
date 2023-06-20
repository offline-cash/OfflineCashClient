# Offline Cash

Client application for scanning and verifying Offline Cash notes.

## Debugging on Android
1. Run the following command:
   ```
   yarn install
   ```
2. Modify `android/app/src/main/res/xml/network_security_config.xml` in order to allow cleartext traffic (required only for debugging):
   ```
   <base-config cleartextTrafficPermitted="true">
   ```
3. Attach the physical Android device in debug mode.
4. Run the following command:
   ```
   npx react-native run-android
   ```

## Debugging on iOS
1. Run the following commands:
   ```
   yarn install
   cd ios && pod install
   ```
2. Open the `ios/CryptoCashClient.xcworkspace` in XCode.
3. Attach the physical iPhone device and click [Run] button.
