import React, {
  useImperativeHandle,
  useMemo,
  forwardRef,
  useState,
  useRef,
} from 'react';
import {Animated, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {Box, HStack, Pressable, Text} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import {isAndroid, isIos} from '../../Utils/helpers';
import CloseIconX from '../CloseIconX';
import {useNavigation} from '@react-navigation/native';

const AnimatedStack = isAndroid()
  ? Animated.View
  : Animated.createAnimatedComponent(BlurView);
const AnimText = Animated.createAnimatedComponent(Text);

const BLUR_OPACITY_START_ANIMATION = 235;
const BLUR_OPACITY_FINISH_ANIMATION = 260;
const BLUR_OPACITY_HALF_ANIMATION = 240;

const BLUR_OPACITY_HALF_VALUE = isAndroid() ? 0.99 : 0.5;
const BLUR_OPACITY_MAX_VALUE = isAndroid() ? 0.99 : 1;

const BLUR_OPACITY_ANDROID_EDGE = 1000;

const TEXT_OPACITY_START_ANIMATION = isAndroid() ? 140 : 30;
const TEXT_OPACITY_FINISH_ANIMATION = isAndroid() ? 300 : 100;

const TEXT_OPACITY_MAX_VALUE = 1;

const Header = ({pan, androidHeaderBg, display}, ref) => {
  const {navigate} = useNavigation();
  const [hideHeader, setHideHeader] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        setHideHeader,
      };
    },
    [setHideHeader],
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const animConfigs = useMemo(
    () => ({
      blurOpacity: {
        inputRange: [
          0,
          BLUR_OPACITY_START_ANIMATION,
          BLUR_OPACITY_HALF_ANIMATION,
          BLUR_OPACITY_FINISH_ANIMATION,
          BLUR_OPACITY_ANDROID_EDGE,
        ],
        outputRange: [
          0,
          0,
          BLUR_OPACITY_HALF_VALUE,
          BLUR_OPACITY_MAX_VALUE,
          BLUR_OPACITY_MAX_VALUE,
        ],
      },
      textOpacity: {
        inputRange: [
          0,
          TEXT_OPACITY_START_ANIMATION,
          TEXT_OPACITY_FINISH_ANIMATION,
        ],
        outputRange: [0, 0, TEXT_OPACITY_MAX_VALUE],
      },
    }),
    [],
  );

  if (hideHeader) {
    fadeAnim.setValue(0);
    return null;
  }

  fadeIn();

  return (
    <>
      <AnimatedStack
        blurType="dark"
        blurAmount={100}
        reducedTransparencyFallbackColor="white"
        style={[
          styles.blurView,
          {
            backgroundColor: androidHeaderBg,
            opacity: pan.interpolate(animConfigs.blurOpacity),
          },
          styles.headerContainer,
        ]}
      />
      <Box
        position={'absolute'}
        top={isIos() && Dimensions.get('screen').height > 800 ? -10 : 8}
        left={0}
        right={0}
        zIndex={1000}>
        <SafeAreaView>
          <HStack
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}>
            <AnimText
              style={{
                opacity: pan.interpolate(animConfigs.textOpacity),
              }}
              color={'white'}>
              Note Details
            </AnimText>
          </HStack>
        </SafeAreaView>
      </Box>
      <Pressable
        onPress={() => {
          navigate('Home');
        }}
        position={'absolute'}
        top={'50px'}
        right={'16px'}
        zIndex={1000}>
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
            },
          ]}>
          <CloseIconX />
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    height: 73,
  },
  headerContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});

export default forwardRef(Header);
