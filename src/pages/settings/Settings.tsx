import React, {FC} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import {
  UploadOutlined,
  DownloadOutlined,
  LogoutOutlined,
  GoogleIcon,
} from '../../assets/svg';
import CustomButton from '../../components/custom-button/CustomButton';

import {SettingsProps} from './types';
import styles from './styles';
import {Image} from 'react-native';
import {useUser} from '../../context/ UserContext';
import useSyncManager from '../../hooks/useSyncManager';
import colors from '../../constants/colors';

const Settings: FC<SettingsProps> = () => {
  const {user, isSignedIn, signIn, signOut} = useUser();
  const {isExportLoading, isImportLoading, exportData, importData} =
    useSyncManager();

  return (
    <PageLayout hideAccountIcon>
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
                <CustomButton
                  label="Sign in with Google"
                  onPress={signIn}
                  containerStyle={styles.signInButtonContainerStyle}
                  Icon={GoogleIcon}
                />
              </>
            ) : (
              <View style={styles.loggedInContent}>
                <View style={styles.imageAndNameContainer}>
                  <View style={styles.imageContainer}>
                    {user?.photo && (
                      <Image source={{uri: user?.photo}} style={styles.image} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.email}>{user?.email}</Text>
                    <Text style={styles.userName}>{user?.name}</Text>
                  </View>
                </View>
                <View style={styles.cardsContainer}>
                  <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.8}
                    disabled={isExportLoading}
                    onPress={exportData}>
                    <UploadOutlined width={20} height={20} />
                    <View>
                      <Text style={styles.cardText}>Export</Text>
                      <Text style={styles.cardInfoText}>
                        Save the local data to google drive
                      </Text>
                    </View>
                    {isExportLoading && (
                      <ActivityIndicator color={colors.primary} size="large" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.8}
                    disabled={isImportLoading}
                    onPress={importData}>
                    <DownloadOutlined width={20} height={20} />
                    <View>
                      <Text style={styles.cardText}>Import</Text>
                      <Text style={styles.cardInfoText}>
                        Save the local data to google drive
                      </Text>
                    </View>
                    {isImportLoading && (
                      <ActivityIndicator color={colors.primary} size="large" />
                    )}
                  </TouchableOpacity>
                </View>
                <CustomButton
                  label="Log Out"
                  onPress={signOut}
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
