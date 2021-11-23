import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer/data-reducer';
import { userReducer } from './user-reducer/user-reducer';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.User]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
