import C from '../src/constants'
import storeFactory from '../src/store'
import { addColor } from '../src/actions'

describe('addColor', () => {
    let store;

    beforeAll(() => {
        store = storeFactory();
        store.dispatch(addColor('Blue', '#000033'));
    });

    it('Should add a new color', () => {
        expect(store.getState().colors.length).toBe(5)
    });

    it('should add a unique guid id', () => {
        expect(store.getState().colors[0].id.length).toBe(36);
    });
});