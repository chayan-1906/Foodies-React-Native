# 🍕 Foodies - Food Delivery App

[![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.12-000000.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)

> A modern, feature-rich food delivery application built with React Native and Expo, featuring smooth animations, intuitive UI, and production-ready architecture.

## ✨ Features

- 🎨 **Beautiful UI/UX** - Custom animations with Lottie and Reanimated
- 🍔 **Food Ordering** - Browse restaurants, add items to cart, place orders
- 🔐 **Authentication** - Secure user login and registration
- 📱 **Cross-Platform** - iOS and Android support with native performance
- 🌗 **Theme Support** - Light and dark mode compatibility
- 📍 **Location Services** - Real-time location tracking and delivery updates
- 🔄 **State Management** - Redux Toolkit with persistence
- 🎭 **Smooth Animations** - 60fps animations using Reanimated 3
- 📦 **Offline Support** - Redux Persist for offline functionality
- 🎯 **TypeScript** - Full type safety and better developer experience

## 📱 Screenshots

<div>
  <img src="https://github.com/user-attachments/assets/7c8f7888-23b2-4553-9c5d-18bd38b31961" width="200" alt="Splash Screen" />
  <img src="https://github.com/user-attachments/assets/8254578c-eb48-4e42-be01-d0ab6aa032de" width="200" alt="Login Screen" />
  <img src="https://github.com/user-attachments/assets/f58d2004-17e6-4a16-a900-3508a62ddd0d" width="200" alt="Home Screen" />
  <img src="https://github.com/user-attachments/assets/35160987-80d2-422f-9756-66b4c2e25a25" width="200" alt="Restaurant List - I" />
  <img src="https://github.com/user-attachments/assets/ec2bc537-ab74-4733-b78f-e12e28d449fe" width="200" alt="Restaurant List - II" />
  <img src="https://github.com/user-attachments/assets/2673ac83-bcaf-49e6-9395-8503c3740658" width="200" alt="Restaurant Menu" />
  <img src="https://github.com/user-attachments/assets/9f8dc5df-be2f-4294-90b4-1417333144ce" width="200" alt="Repeat Customization" />
  <img src="https://github.com/user-attachments/assets/e7a32f3f-0e45-4957-b553-b3624789e864" width="200" alt="Modify Customization" />
  <img src="https://github.com/user-attachments/assets/202d2d45-e9fa-428e-9e41-072f34340275" width="200" alt="Multi Cart" />
  <img src="https://github.com/user-attachments/assets/64e80c8e-335b-468d-944d-4f3b55d2c15b" width="200" alt="Cart" />
  <img src="https://github.com/user-attachments/assets/90e7f93a-2d46-4c26-a4c9-a4fc7bbab819" width="200" alt="Order Successful" />
</div>

## 🎥 Demo Video

<div align="center">

https://github.com/user-attachments/assets/d534ec86-46b4-4e95-949a-5f1a7dd7e939

*Watch the full app demo showcasing key features*

</div>

## 📱 Download & Try

[![Download APK](https://img.shields.io/badge/Download-APK-brightgreen.svg?style=for-the-badge)](https://github.com/chayan-1906/Foodies-React-Native/releases/download/v1.0.0/foodies-expo.apk)

*Download and install the APK to experience the full app on your Android device*

## 🏗️ Tech Stack

### 📱 Frontend

- ⚛️ **React Native** 0.79.4 - Mobile app framework
- 🚀 **Expo** 53.0.12 - Development platform and tools
- 📘 **TypeScript** 5.8.3 - Type safety and better DX
- 🗺️ **React Navigation** 7.x - Navigation library

### 🔄 State Management

- 🏪 **Redux Toolkit** 2.8.2 - State management
- 💾 **Redux Persist** 6.0.0 - State persistence
- 🔗 **React Redux** 9.2.0 - React bindings for Redux

### 🎨 UI & Styling

- 💅 **React Native Unistyles** 2.43.0 - Styling system
- 🌈 **React Native Linear Gradient** 2.8.3 - Gradient effects
- 🫧 **Expo Blur** 14.1.5 - Blur effects
- 🎯 **React Native Vector Icons** 10.2.0 - Icon library
- 🎬 **Lottie React Native** 7.2.2 - Animations

### 🧭 Navigation & Gestures

- 🗺️ **React Navigation** 7.x - Screen navigation
- 👆 **React Native Gesture Handler** 2.26.0 - Touch gestures
- ✨ **React Native Reanimated** 3.18.0 - Smooth animations

### 🔧 Utilities

- ⚡ **React Native MMKV** 3.3.0 - Fast storage
- 🆔 **UUID** 11.1.0 - Unique identifiers
- 📳 **Expo Haptics** 14.1.4 - Haptic feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (≥18.0.0)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chayan-1906/Foodies-React-Native.git
   cd Foodies-React-Native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (Mac only)
   ```bash
   npm run pod-install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📦 Build for Production

### Android APK

```bash
npm run generate-apk
```

### iOS Build

Use Xcode or EAS Build for iOS production builds.

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
├── features/          # Feature-specific modules
├── navigation/        # Navigation configuration
├── states/           # Redux store and slices
├── types/            # TypeScript type definitions
├── unistyles/        # Styling system configuration
└── utils/            # Utility functions and helpers
```

## 🎯 Key Highlights

- **Production Ready**: Pre-built for iOS and Android with optimized performance
- **Modern Architecture**: Clean code structure with TypeScript and Redux Toolkit
- **Smooth UX**: 60fps animations and gesture handling
- **Scalable**: Modular architecture for easy feature additions
- **Developer Friendly**: ESLint, TypeScript, and hot reload for better DX

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Padmanabha Das**

- GitHub: [@chayan-1906](https://github.com/chayan-1906)
- LinkedIn: [Padmanabha Das](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
- Email: padmanabhadas9647@gmail.com

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️!

## 📱 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/chayan-1906)

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
