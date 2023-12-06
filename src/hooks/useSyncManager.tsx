import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import RNFS from 'react-native-blob-util';
import {database} from '../database/init';
import {CategoryRecord} from '../database/model/Category';
import {sanitizedRaw} from '@nozbe/watermelondb/RawRecord';
import {ExerciseRecord} from '../database/model/Exercise';
import {WorkoutRecord} from '../database/model/Workout';

const useSyncManager = () => {
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [isImportLoading, setIsImportLoading] = useState(false);

  const createJSONBackupData = async () => {
    const jsonData: any = {};

    const categoriesCollection = database.get<CategoryRecord>('categories');
    const categories = await categoriesCollection.query().fetch();
    let categoriesArray: {id: string; name: string}[] = [];
    categoriesArray = categories.map(category => {
      return {id: category.id, name: category.name};
    });
    jsonData.categories = categoriesArray;

    const exerciseCollection = database.get<ExerciseRecord>('exercises');
    const exercises = await exerciseCollection.query().fetch();
    let exercisesArray: {id: string; name: string}[] = [];
    exercisesArray = exercises.map(exercise => {
      return {
        id: exercise.id,
        name: exercise.name,
        category_id: (exercise.category as unknown as {id: string}).id || '',
      };
    });
    jsonData.exercises = exercisesArray;

    const workoutCollection = database.get<WorkoutRecord>('workouts');
    const workout = await workoutCollection.query().fetch();
    let workoutsArray: {id: string; date: string}[] = [];
    workoutsArray = workout.map(workoutItem => {
      return {
        id: workoutItem.id,
        date: workoutItem.date,
        exercise_id: (workoutItem.exercise as unknown as {id: string}).id || '',
        records: workoutItem.records,
        info: workoutItem.info,
      };
    });
    jsonData.workouts = workoutsArray;

    return jsonData;
  };

  const insertDataFromBackupFile = async (jsonResponse: any) => {
    const categoriesCollection = database.get<CategoryRecord>('categories');
    await database.write(async () => {
      await categoriesCollection.query().destroyAllPermanently();
      const categoriesData = jsonResponse.categories;
      categoriesData.forEach((categoryItem: any) => {
        categoriesCollection.create(category => {
          category._raw = sanitizedRaw(
            categoryItem,
            categoriesCollection.schema,
          );
        });
      });
    });

    const exercisesCollection = database.get<ExerciseRecord>('exercises');
    await database.write(async () => {
      await exercisesCollection.query().destroyAllPermanently();
      const exerciseData = jsonResponse.exercises;
      exerciseData.forEach((exerciseItem: any) => {
        exercisesCollection.create(exercise => {
          exercise._raw = sanitizedRaw(
            exerciseItem,
            exercisesCollection.schema,
          );
        });
      });
    });

    const workoutsCollection = database.get<WorkoutRecord>('workouts');
    await database.write(async () => {
      await workoutsCollection.query().destroyAllPermanently();
      const workoutData = jsonResponse.workouts;
      workoutData.forEach((workoutItem: any) => {
        workoutsCollection.create(workout => {
          workout._raw = sanitizedRaw(
            {
              id: workoutItem.id,
              date: workoutItem.date,
              exercise_id: workoutItem.exercise_id,
              info: workoutItem.info,
              // records: [{reps: '8', weight: '10'}],
            },
            workoutsCollection.schema,
          );
          workout.records = workoutItem.records;
        });
      });
    });
  };

  const searchFolder = async (
    accessToken: string,
    apiUrl: string,
    folderName: string,
  ) => {
    const folderResult = await axios.get(
      `${apiUrl}?q=name='${encodeURIComponent(
        folderName,
      )}' and trashed=false and mimeType='application/vnd.google-apps.folder'`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return folderResult;
  };

  const createBackupFolder = async (
    accessToken: string,
    apiUrl: string,
    folderName: string,
  ) => {
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
    return res;
  };

  const createNewBackupFile = async (fileName: string, folderId: string) => {
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
    return res;
  };

  const patchExistingFile = async (fileId: string) => {
    const data = await createJSONBackupData();
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const base64Data = RNFS.base64.encode(data);
    const tmpFilePath = `${RNFS.fs.dirs.CacheDir}/profit.json`;
    await RNFS.fs.writeFile(tmpFilePath, base64Data, 'base64');
    const patchRes = await axios.patch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'text/plain',
        },
      },
    );
    return patchRes;
  };

  const searchBackupFile = async (
    apiUrl: string,
    folderId: string,
    fileNameToCheck: string,
  ) => {
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: `'${folderId}' in parents and name='${fileNameToCheck}' and trashed=false`,
      },
    });
    return response;
  };
  const uploadBackupFile = async (apiUrl: string, folderId: string) => {
    const fileName = 'profit.json';

    let fileId;
    const fileSearchResult = await searchBackupFile(apiUrl, folderId, fileName);
    const fileAlreadyExists = !!fileSearchResult.data.files.length;
    if (fileAlreadyExists) {
      fileId = fileSearchResult.data.files[0].id;
    }
    if (!fileAlreadyExists) {
      const fileCreationResponse = await createNewBackupFile(
        fileName,
        folderId,
      );
      fileId = fileCreationResponse.data.id;
    }
    const patchResponse = await patchExistingFile(fileId);
    return patchResponse;
  };

  const exportData = async () => {
    setIsExportLoading(true);
    const apiUrl = 'https://www.googleapis.com/drive/v3/files';
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const folderName = 'profit-backup';
    let folderCreationData;
    let folderData = await searchFolder(accessToken, apiUrl, folderName);
    const doesFolderExist = !!folderData.data.files.length;
    if (!doesFolderExist) {
      folderCreationData = await createBackupFolder(
        accessToken,
        apiUrl,
        folderName,
      );
    }
    const folderId = doesFolderExist
      ? folderData.data.files[0].id
      : folderCreationData?.data.id;
    await uploadBackupFile(apiUrl, folderId);
    setIsExportLoading(false);
  };

  const importData = async () => {
    setIsImportLoading(true);
    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    const folderName = 'profit-backup';
    const fileName = 'profit.json';
    try {
      const folderResponse = await axios.get(
        'https://www.googleapis.com/drive/v3/files',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
          },
        },
      );

      const folderId = folderResponse.data.files[0]?.id;

      if (!folderId) {
        console.log(`Folder '${folderName}' not found.`);
        return;
      }

      const fileResponse = await axios.get(
        'https://www.googleapis.com/drive/v3/files',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
          },
        },
      );

      const fileId = fileResponse.data.files[0]?.id;

      if (!fileId) {
        console.log(
          `File '${fileName}' not found in the folder '${folderName}'.`,
        );
        return;
      }

      const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
      RNFS.fetch('GET', downloadUrl, {
        Authorization: `Bearer ${accessToken}`,
      })
        .then(res => {
          let status = res.info().status;
          if (status === 200) {
            // the conversion is done in native code
            let jsonResponse = res.json();
            insertDataFromBackupFile(jsonResponse);
          } else {
            // handle other status codes
            console.log(res, 'something else happened');
          }
        })
        .catch((err: any) => {
          console.log('error occured', err.message);
        });
      console.log(`File '${fileName}' downloaded successfully.`);
    } catch (error: any) {
      console.error('Error downloading file:', error.message);
    } finally {
      setIsImportLoading(false);
    }
  };

  return {isExportLoading, exportData, isImportLoading, importData};
};

export default useSyncManager;
