import {all} from 'redux-saga/effects';
import mailSagas from './Mail';
import toDoSagas from './Todo';
import contactSagas from './Contact';
import chatSagas from './Chat';
import authSagas from './Auth';
import ProfileSagas from './Profile';

export default function* rootSaga(getState) {
  yield all([
    mailSagas(),
    toDoSagas(),
    contactSagas(),
    chatSagas(),
    authSagas(),
    ProfileSagas(),
  ]);
}
