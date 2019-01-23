import {login, loginApi} from './GetSingleUser.actions';
import {GET_SINGLE_USER_IN_PROGRESS} from './GetSingleUser.actionTypes'


test('Test api call for getSingleUser', () => {
    return loginApi(1).then(data => {
        expect(data.data).toEqual({id: '1', name: 'Wessel'});
    });
});

test('Test action getSingleUser', () => {
    const dispatch = jest.fn();
    const expected = {
        type: GET_SINGLE_USER_IN_PROGRESS,
    };

    expect.assertions(2);
    const loginCall = login(1);
    expect(typeof(loginCall)).toEqual('function');

    login(1)(dispatch);
    expect(dispatch).toBeCalledWith(expected);
});
