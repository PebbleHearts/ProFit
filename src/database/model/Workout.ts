import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {text, relation, json, field} from '@nozbe/watermelondb/decorators';
import {ExerciseRecord} from './Exercise';

export interface WorkoutRecord extends Model {
  date: string;
  exercise: Promise<ExerciseRecord>;
  records: string;
  info: string;
  order: number;
}

const sanitizeRecords = (jsonString: JSON) => jsonString;
export default class Workout extends Model implements WorkoutRecord {
  static table = 'workouts';
  static associations: Associations = {
    exercises: {
      type: 'belongs_to',
      key: 'exercise_id',
    },
  };

  @text('date') date!: string;
  @relation('exercises', 'exercise_id') exercise!: any;
  @json('records', sanitizeRecords) records!: any;
  @text('info') info!: string;
  @field('order') order!: number;
}
