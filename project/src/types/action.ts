export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  UpdateOffers = 'UPDATE_OFFERS',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type UpdateOffersAction = {
  type: ActionType.UpdateOffers;
};

export type Actions = ChangeCityAction | UpdateOffersAction;
