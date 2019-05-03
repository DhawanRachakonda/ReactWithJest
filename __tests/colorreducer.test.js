import C from '../src/constants';
import { color } from '../src/store/reducers';

describe('Color Reducer', () => {
    const addColorAction = {
        type: C.ADD_COLOR,
        id: 0,
        title: 'Grey',
        color: '#000003',
        timestamp: new Date().toString(),
    }

    const rateColorAction = {
        type: C.RATE_COLOR,
        id: 0,
        rating: 3,
    }
    let state = {...addColorAction};
    it('Test for ADD_COLOR', () => {
        const result = color({},addColorAction);
        state = {...state, ...result};
        expect(result)
            .toEqual({
                id: 0,
                title: 'Grey',
                color: '#000003',
                timestamp: addColorAction.timestamp,
                rating: 0,
            })
    });

    it('Test for RATE_COLOR', () => {
        const result = color(state, rateColorAction);
        expect(result).toEqual({...addColorAction, rating: rateColorAction.rating});
    });
});