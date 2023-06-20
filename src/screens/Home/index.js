import React, {useEffect, useState} from 'react';
import {ScrollView, VStack, Image} from 'native-base';
import BottomContent from './components/BottomContent';
import {SafeAreaView, Dimensions, Alert} from 'react-native';
import {containerStyles} from '../../styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NotesScreens} from '../../navigation/constants';
import {useNoteContext} from '../../stores/Note';
import {noteStates} from '../../Utils/noteStates';
import {useLoaderWrapContext} from '../../stores/LoaderWrap';
import axios from 'axios';
import {UPDATE_CHECK_ADDRESS} from '../../../Config';
import {getReadableVersion} from 'react-native-device-info';

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {note} = useNoteContext();
  const {setShowLoading} = useLoaderWrapContext();
  const windowHeight = Dimensions.get('window').height;
  const [bottomVStackHeight, setBottomVStackHeight] = useState(null);
  const [updateCheckStatus, setUpdateCheckStatus] = useState({
    text: 'Checking updates...',
    outdated: false,
  });

  useEffect(() => {
    async function checkUpdates() {
      let res;

      try {
        res = await axios.get(
          UPDATE_CHECK_ADDRESS + '?v=' + getReadableVersion(),
          {
            timeout: 5000,
          },
        );
      } catch (e) {
        setUpdateCheckStatus({
          text: 'Failed to check for updates.',
          outdated: true,
        });

        Alert.alert(
          'Offline Cash',
          'WARNING: Failed to check for app updates.',
        );
        return;
      }

      if (res.data.outdated) {
        setUpdateCheckStatus({
          text: 'Update available.',
          outdated: true,
        });

        Alert.alert(
          'Offline Cash',
          'WARNING: Your Offline Cash app is outdated!\n\nNotice from update server:\n' +
            res.data.notice,
        );
      } else {
        setUpdateCheckStatus({
          text: 'Up to date.',
          outdated: false,
        });
      }
    }

    checkUpdates();
  }, []);

  useEffect(() => {
    if (note.nominalValue && note.noteState !== noteStates.error) {
      const screenToNavigate = NotesScreens[String(note.nominalValue / 10e4)];
      navigate(screenToNavigate);
    }
  }, [note, note.noteState, note.nominalValue, navigate]);

  useFocusEffect(
    React.useCallback(() => {
      setShowLoading(false);
    }, [setShowLoading]),
  );

  return (
    <VStack bgColor="white">
      <ScrollView scrollEnabled={false}>
        <Image
          alt={'introduction image'}
          source={require('../../assets/home-screen-jumbo.jpg')}
          h={
            windowHeight - (bottomVStackHeight ? bottomVStackHeight : 341) - 20
          }
          resizeMode={'cover'}
        />
        <SafeAreaView style={{...containerStyles.screenContainer}}>
          <BottomContent
            onLayout={event => {
              if (!bottomVStackHeight) {
                const {height} = event.nativeEvent.layout;
                setBottomVStackHeight(height);
              }
            }}
            appVersion={getReadableVersion()}
            appOutdated={updateCheckStatus.outdated}
            appUpdateText={updateCheckStatus.text}
          />
        </SafeAreaView>
      </ScrollView>
    </VStack>
  );
};

export default HomeScreen;
