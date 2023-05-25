import {createClient} from '@supabase/supabase-js';
import ENV from '../constants/env';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
