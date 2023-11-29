import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import RNFS from 'react-native-blob-util';

import Colors from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../constants/colors';

type PageLayoutProps = {
  children: JSX.Element;
  title?: string;
};

const PageLayout = ({children, title}: PageLayoutProps) => {
  const insets = useSafeAreaInsets();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    handleGetAuthStatus();
    return userInfo;
  };

  const googleSignout = async () => {
    await GoogleSignin.signOut();
    handleGetAuthStatus();
  };

  const uploadFile = async () => {
    const folderId = '1hxo9kBO4oAs7sN1Px1yPn5yuLKLXNP1C';

    const fileName = 'profit.db';

    const localFilePath = RNFS.fs.dirs.MainBundleDir + '/profit.db';
    const fileContent = await RNFS.fs.readFile(localFilePath, 'base64');
    const apiUrl = 'https://www.googleapis.com/drive/v3/files';
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const res = await axios.post(
      apiUrl,
      {
        name: fileName,
        parents: [folderId], // Specify the ID of the destination folder
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const uploadRes = await axios.patch(
      `https://www.googleapis.com/upload/drive/v3/files/${res.data.id}`,
      fileContent,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'text/plain',
        },
      },
    );
  };

  const createFolder = async () => {
    const folderName = 'profit-backup';
    const apiUrl = 'https://www.googleapis.com/drive/v3/files';
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const res = await axios.post(
      apiUrl,
      {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const listFiles = async () => {
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const folderName = 'profit-backup';
    const folderResult = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
        folderName,
      )}' and mimeType='application/vnd.google-apps.folder'`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const folderId = folderResult.data.files[0].id;
    const query = "name='profit.db'";
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query,
    )} and '${folderId}' in parents`;
    const res = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const handleGetAuthStatus = async () => {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isGoogleSignedIn);
  };
  useEffect(() => {
    handleGetAuthStatus();
  }, []);
  return (
    <View
      style={[
        styles.layoutContainer,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={styles.titleContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {children}
    </View>
  );
};

const styles = ScaledSheet.create({
  layoutContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    height: '45@vs',
    backgroundColor: colors.primary,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@s',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '900',
    color: '#f7faf8',
  },
});

export default PageLayout;
