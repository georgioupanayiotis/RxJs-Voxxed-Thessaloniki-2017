import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED} from './constants';
import epics from './epics';
import {fetchUSer } from './actions';
import XMLHTTPRequest from 'xhr2';
global.XMLHTTPRequest = XMLHttpRequest;

const epicMiddleware = createEpicMiddleware(epics);
const nockStore = configureMockStore([createEpicMiddleware]);

describe('fetchUser', () => {
    let store;

    beforeEach(()=>{
        store = mockStore();
    })

    afterEach(()=>{
        nock.clearAll();
        epicMiddleware.replaceEpic(epics);
    })

    it('returns user from github', done => {
        const payload = {username: 'user' };

        nock('api uel')
            .get('/users/user')
            .reply(200, payload);

        const expectedActions = [
            {type: FETCH_USER, payload},
            {type: FETCH_USER_SUCCESS, "payload": {"user": {"username": "user"}},
        ]

        store.subscribe(()=>{
            const actions = store.getActions();
            if (actions.legth === expectedActions.length) {
                expect(actions).toEqual(expectedActions);
            }
        })

    })

})