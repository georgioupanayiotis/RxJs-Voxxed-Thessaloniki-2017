import 'rxjs';
import {combineEpics } from 'redux-observable';
import { INCREASE , DECREASE, INCREASE_STORE, DECREASE_STORE, FETCH_USER } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax'
import { user } from './reducer';
import { Observable } from 'rxjs/Observable';

export const increaseNumber = actions$ =>
    actions$
        .do(data => console.log(data))//check the data if comes to the stream
        .ofType(INCREASE)
        .delay(2000)
        .mapTo({ type: INCREASE_STORE});

export const decreaseNumber = actions$ =>
actions$
    .ofType(DECREASE)
    .delay(2000)
    .mapTo({ type: DECREASE_STORE});

export const fetchUser = actions$ =>
    actions$
        .ofType(FETCH_USER)
        .filter(action => action.payload.username.length < 20)
        .do(element => console.log(element))//get everything for the elemement
        .mergeMap(action =>
            ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
                .map(user => fetchUserSuccess(user))
                .takeUntil(actions$.ofType(FETCH_USER))
                //.retry(2) //retrywhen infite check for the connection stream until is back up
                .catch(error => Observable.of(fetchUserFailed()))
        )

export default combineEpics(
    increaseNumber,
    decreaseNumber,
    fetchUser
)