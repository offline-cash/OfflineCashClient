import React, {useMemo, useRef, useState} from 'react';
import {VStack, ScrollView, View, Image} from 'native-base';
import {StyleSheet, SafeAreaView, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {containerStyles} from '../../styles';
import ButtonGroup from './components/ButtonGroup/index';
import Main from './Main';
import History from './History';
import WarningBar from './components/WarningBar';
import RotateKeysSheet from './components/RotateKeysSheet';
import WithdrawFundsSheet from './components/WithdrawFundsSheet';
import Header from '../../components/Header';
import {useNoteContext} from '../../stores/Note';
import {noteStates} from '../../Utils/noteStates';
import LoadNoteSheet from './components/LoadNoteSheet';
import {BlurView} from '@react-native-community/blur';
import {isIos} from '../../Utils/helpers';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const IMAGE_SCALE_MAX = 20;
const IMAGE_SCALE_EDGE = -3000;

const IMAGE_ANIMATION_EDGE = -1000;
const MIN_IMAGE_TRANSLATE_Y = -100;

const VIEW_ANIMATION_EDGE = -1000;
const MIN_VIEW_TRANSLATE_Y = -80;
const MAX_VIEW_TRANSLATE_Y = 70;

const BLUR_OPACITY_START_ANIMATION = isIos() ? 0 : 100;
const BLUR_OPACITY_FINISH_ANIMATION = isIos() ? 100 : 200;
const BLUR_OPACITY_ANDROID_EDGE = 1000;
const BLUR_OPACITY_MAX_VALUE = isIos() ? 1 : 0.99;

const AnimatedBlur = isIos()
  ? Animated.createAnimatedComponent(BlurView)
  : Animated.View;

const NoteScreen = ({source, androidHeaderBg}) => {
  const {note} = useNoteContext();
  const {navigate} = useNavigation();
  const [buttonGroupHeight, setButtonGroupHeight] = useState();
  const pan = useRef(new Animated.Value(0)).current;
  const headerRef = useRef();
  const loadNoteSheetRef = useRef();
  const rotateKeySheetRef = useRef();
  const withdrawFundsSheetRef = useRef();
  let shouldHideActions =
    note.state === noteStates.pendingRotate ||
    note.state === noteStates.pendingPersonalize ||
    note.state === noteStates.withdraw ||
    !note.isLoaded;

  if (note.isExpired && note.isPartiallyLoaded) {
    shouldHideActions = false;
  }

  if (note.state === noteStates.pendingRotate && !note.hasPendingInTransfer) {
    shouldHideActions = false;
  }

  if (
    note.state === noteStates.withdraw &&
    note.isPartiallyLoaded &&
    !note.hasPendingOutTransfer
  ) {
    shouldHideActions = false;
  }

  if (note.rotationAborted) {
    shouldHideActions = true;
  }

  const animInterpolateConfigs = useMemo(
    () => ({
      imageTranslateY: {
        inputRange: [IMAGE_ANIMATION_EDGE, 0],
        outputRange: [MIN_IMAGE_TRANSLATE_Y, 0],
        extrapolate: 'clamp',
      },
      imageScale: {
        inputRange: [IMAGE_SCALE_EDGE, 0],
        outputRange: [IMAGE_SCALE_MAX, 1],
        extrapolate: 'clamp',
      },
      viewContainerTranslateY: {
        inputRange: [VIEW_ANIMATION_EDGE, 0],
        outputRange: [MAX_VIEW_TRANSLATE_Y, MIN_VIEW_TRANSLATE_Y],
        extrapolate: 'clamp',
      },
      blurOpacity: {
        inputRange: [
          BLUR_OPACITY_START_ANIMATION,
          BLUR_OPACITY_FINISH_ANIMATION,
          BLUR_OPACITY_ANDROID_EDGE,
        ],
        outputRange: [0, BLUR_OPACITY_MAX_VALUE, BLUR_OPACITY_MAX_VALUE],
      },
    }),
    [],
  );

  if (note.state && note.state === noteStates.error) {
    navigate('Home');
    return <View />;
  }

  return (
    <VStack>
      <Header pan={pan} androidHeaderBg={androidHeaderBg} ref={headerRef} />
      <ScrollView
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: pan}}}], {
          useNativeDriver: false,
        })}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={1}>
        <View>
          <AnimatedBlur
            style={[
              styles.blurView,
              {
                backgroundColor: androidHeaderBg,
                transform: [
                  {
                    translateY: -80,
                  },
                ],
                opacity: pan.interpolate(animInterpolateConfigs.blurOpacity),
              },
            ]}
            blurType="dark"
            blurAmount={100}
            reducedTransparencyFallbackColor="white"
          />
          <AnimatedImage
            alt={'Bitcoin note'}
            source={source}
            h={390}
            w={'100%'}
            justifyContent={'flex-end'}
            p={0}
            resizeMode={'cover'}
            style={{
              transform: [
                {
                  translateY: pan.interpolate(
                    animInterpolateConfigs.imageTranslateY,
                  ),
                },
                {
                  scale: pan.interpolate(animInterpolateConfigs.imageScale),
                },
              ],
            }}
          />
        </View>
        <Animated.View
          style={{
            transform: [
              {
                translateY: pan.interpolate(
                  animInterpolateConfigs.viewContainerTranslateY,
                ),
              },
            ],
          }}>
          <SafeAreaView style={{...containerStyles.screenContainer}}>
            <VStack flex={1} bg={'white'}>
              <WarningBar
                handlePress={() => {
                  headerRef.current?.setHideHeader(true);
                  if (
                    note.rotationAborted ||
                    note.state === noteStates.pendingRotate
                  ) {
                    return rotateKeySheetRef?.current?.snapToIndex(0);
                  }
                  loadNoteSheetRef?.current?.snapToIndex(0);
                }}
              />
              <Main />
              <History buttonGroupHeight={buttonGroupHeight} />
            </VStack>
          </SafeAreaView>
        </Animated.View>
      </ScrollView>

      {!shouldHideActions && (
        <ButtonGroup
          setButtonGroupHeight={setButtonGroupHeight}
          openRotateKeysSheet={() => {
            headerRef.current?.setHideHeader(true);
            rotateKeySheetRef.current?.snapToIndex(0);
          }}
          openWithdrawFundsSheet={() => {
            headerRef.current?.setHideHeader(true);
            withdrawFundsSheetRef.current?.snapToIndex(0);
          }}
        />
      )}
      <LoadNoteSheet
        ref={loadNoteSheetRef}
        onAnimateBack={() => {
          headerRef.current?.setHideHeader(false);
        }}
        onClose={() => {
          loadNoteSheetRef?.current?.close?.();
          headerRef.current?.setHideHeader(false);
        }}
      />
      <RotateKeysSheet
        ref={rotateKeySheetRef}
        onAnimateBack={() => {
          headerRef.current?.setHideHeader(false);
        }}
        onClose={() => {
          rotateKeySheetRef?.current?.close?.();
          headerRef.current?.setHideHeader(false);
        }}
        onError={() => {
          navigate('Home');
        }}
      />
      <WithdrawFundsSheet
        ref={withdrawFundsSheetRef}
        onAnimateBack={() => {
          headerRef.current?.setHideHeader(false);
        }}
        onClose={() => {
          withdrawFundsSheetRef?.current?.close?.();
          headerRef.current?.setHideHeader(false);
        }}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});

export default NoteScreen;
