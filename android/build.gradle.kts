plugins {
    base

    id("com.android.application") version "7.2.1" apply false
    id("org.jetbrains.kotlin.android") version "1.7.10" apply false
    id("com.facebook.react") version "0.72.0" apply false
}

rootProject.ext {
    set("buildToolsVersion", "31.0.0")
    set("minSdkVersion", 21)
    set("compileSdkVersion", 31)
    set("targetSdkVersion", 31)
    set("FLIPPER_VERSION", "0.125.0")
    if (System.getProperty("os.arch") == "aarch64") {
        // For M1 Users we need to use the NDK 24 which added support for aarch64
        set("ndkVersion", "24.0.8215888")
    } else {
        // Otherwise we default to the side-by-side NDK version from AGP.
        set("ndkVersion", "21.4.7075529")
    }
}

allprojects {
    repositories {
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url = uri("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url = uri("$rootDir/../node_modules/jsc-android/dist")
        }
        mavenCentral {
            content {
                excludeGroup("com.facebook.react")
            }
        }
        google()
        maven { url = uri("https://www.jitpack.io") }
    }
}
