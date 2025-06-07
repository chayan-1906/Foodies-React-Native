# 🍔 Foodies – React Native Food Delivery App

### A full-featured React Native food delivery app built by following a YouTube tutorial. This project demonstrates modern mobile development practices with a clean UI and smooth UX.

## 🚀 Features

🔐 Authentication flow

🧭 Animated tab navigation

🛠️ State management with Redux Toolkit

🍽️ Dynamic restaurant listings

⚙️ Customizable business logic

🛒 Multi-cart support using HOC

💳 Seamless checkout process

``
cd ios
pod deintegrate
pod install --repo-update
cd ..
``

``
npx react-native clean
cd ios && xcodebuild clean && cd ..
npm run ios
``

npm start

### Issues
1. Scroll up Delivery Screen, the banner (lottie portion) should go away, and header (searchbar) should be at the top. Check desired behaviour at 02:08:46
2. When you scroll up, the marginTop at of Recommended/Collection should persist
3. On scrolling up, the bottom tabbar should go away
