import React, {FC, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import PageLayout from '../../Layout/PageLayout';
import {
  UploadOutlined,
  DownloadOutlined,
  LogoutOutlined,
} from '../../assets/svg';
import CustomButton from '../../components/custom-button/CustomButton';

import {SettingsProps} from './types';
import styles from './styles';
import {Image} from 'react-native';

const Settings: FC<SettingsProps> = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const handleGetAuthStatus = async () => {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isGoogleSignedIn);
    if (isGoogleSignedIn) {
      const userInfo = await GoogleSignin.getCurrentUser();
      setUserData(userInfo);
    }
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    handleGetAuthStatus();
  };

  const googleSignOut = async () => {
    await GoogleSignin.signOut();
    handleGetAuthStatus();
  };

  useEffect(() => {
    handleGetAuthStatus();
  }, []);

  return (
    <PageLayout>
      <ScrollView contentContainerStyle={styles.flatListContentContainerStyle}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.contentInnerContainer,
              isSignedIn && styles.loggedInContentInnerContainer,
            ]}>
            {!isSignedIn ? (
              <>
                <Text style={styles.info}>
                  Sign in to google to sync data to drive
                </Text>
                <CustomButton label="SignIn" onPress={googleLogin} />
              </>
            ) : (
              <View style={styles.loggedInContent}>
                <View style={styles.imageAndNameContainer}>
                  <View style={styles.imageContainer}>
                    {userData?.user?.photo && (
                      <Image
                        source={{uri: userData?.user?.photo}}
                        style={styles.image}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.email}>{userData?.user?.email}</Text>
                    <Text style={styles.userName}>{userData?.user?.name}</Text>
                  </View>
                </View>
                <View style={styles.cardsContainer}>
                  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                    <UploadOutlined width={20} height={20} />
                    <View>
                      <Text style={styles.cardText}>Export</Text>
                      <Text style={styles.cardInfoText}>
                        Save the local data to google drive
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                    <DownloadOutlined width={20} height={20} />
                    <View>
                      <Text style={styles.cardText}>Import</Text>
                      <Text style={styles.cardInfoText}>
                        Save the local data to google drive
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <CustomButton
                  label="Log Out"
                  onPress={googleSignOut}
                  containerStyle={styles.logoutButtonStyle}
                  labelStyle={styles.logoutButtonLabelStyle}
                  Icon={LogoutOutlined}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default Settings;
