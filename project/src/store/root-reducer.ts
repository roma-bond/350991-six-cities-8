import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer/data-reducer';
import { userReducer } from './user-reducer/user-reducer';
import { filterReducer } from './filter-reducer/filter-reducer';

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.user]: userReducer,
  [NameSpace.filter]: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
