

import {all} from 'redux-saga/effects';

import authSagas from './Auth';
import ProfileSagas from './Profile';
export default function* rootSaga(getState) {
  yield all([
    
    authSagas(),
    ProfileSagas(),
  ]);
}

