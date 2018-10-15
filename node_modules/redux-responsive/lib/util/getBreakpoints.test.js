// third party imports
import { createStore, combineReducers } from 'redux';
import { combineReducers as immutableCombine } from 'redux-immutablejs';
// local imports
import getBreakpoints from './getBreakpoints';
import createReducer, { defaultBreakpoints } from './createReducer';

var reducer = createReducer();

describe('Breakpoint discovery', function () {
    it('Can find reducer at root', function () {
        // create a redux store with the reducer at the root
        var store = createStore(combineReducers({
            browser: reducer
        }));

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints);
    });

    it('Can find immutable js reducers', function () {
        // create a redux store with the reducer at the root
        var store = createStore(immutableCombine({
            browser: reducer
        }));

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints);
    });

    it('Complains if it cannot find a reducer at root', function () {
        // create a store without the reducer at reducer
        var store = createStore(combineReducers({
            hello: function hello() {
                return true;
            }
        }));

        // make sure this throws an error
        expect(function () {
            return getBreakpoints(store);
        }).toThrowError(Error);
    });
});