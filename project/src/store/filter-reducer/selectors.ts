import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { sortOffersBy } from '../../const';

export const getActiveCity = (state: State): string => state[NameSpace.filter].city;
export const getActiveSorting = (state: State): sortOffersBy => state[NameSpace.filter].sortBy;
