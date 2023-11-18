import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './model/schema';
import migrations from './model/migrations';
import Category from './model/Category';
import Exercise from './model/Exercise';
import Workout from './model/Workout';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'profit',
  onSetUpError: error => {
    console.error('Failed to load database', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Category, Exercise, Workout],
});
