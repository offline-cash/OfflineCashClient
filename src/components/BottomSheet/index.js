import React, {forwardRef} from 'react';
import GBottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Dimensions, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {isIos} from '../../Utils/helpers';
import Header from './Header';

const BottomSheet = ({headerIcon, title, children, onAnimate}, ref) => {
  return (
    <GBottomSheet
      containerHeight={Dimensions.get('window').height}
      onAnimate={(fromIndex, toIndex) => {
        onAnimate && onAnimate(fromIndex, toIndex);
      }}
      index={-1}
      handleIndicatorStyle={styles.indicator}
      overflow="visible"
      snapPoints={['95%']}
      enablePanDownToClose={true}
      ref={ref}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={isIos() ? 'padding' : 'height'}
        keyboardVerticalOffset={60}>
        <BottomSheetScrollView style={styles.scrollContainer}>
          <Header
            onClose={() => ref.current?.close()}
            headerIcon={headerIcon}
            title={title}
          />
          {children}
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </GBottomSheet>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'white',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    overflow: 'visible',
  },
  scrollContainer: {
    marginHorizontal: 8,
    marginBottom: 20,
    overflow: 'visible',
  },
});
export default forwardRef(BottomSheet);
