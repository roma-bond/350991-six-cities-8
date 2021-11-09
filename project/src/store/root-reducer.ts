import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer/data-reducer';
import { userReducer } from './user-reducer/user-reducer';

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.user]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
