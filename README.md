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

# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
    "react-native/scripts/react_native_pods.rb",
    {paths: [process.argv[1]]},
  )', __dir__]).strip

platform :ios, min_ios_version_supported
prepare_react_native_project!

linkage = ENV['USE_FRAMEWORKS']
if linkage != nil
  Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
  use_frameworks! :linkage => linkage.to_sym
end

target 'foodies' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  post_install do |installer|
    # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # :ccache_enabled => true
    )

    # Mark build dir as deletable by Xcode build system
    build_dir = File.join(__dir__, 'ios', 'build')
    if Dir.exist?(build_dir)
      system("xattr -w com.apple.xcode.CreatedByBuildSystem true #{build_dir}")
    end
  end
end
