import { mount } from 'enzyme';
import Expandable from '../src/components/HOC/Expandable';

describe('Testing Expandable Higher-Order Component', () => {
    let EnhancedMockComponent;
    let wrapperComponent;
    let props;
    const MockComponent = ({expandCollapse, collapsed}) =>
        <div onClick={expandCollapse}>
            {(collapsed) ? 'collapsed' : 'expanded'}
        </div>

    beforeAll(() => {
        EnhancedMockComponent = Expandable(MockComponent);
        wrapperComponent = mount(<EnhancedMockComponent foo='foo' gnar='gnar'/>);
        props = wrapperComponent.find(MockComponent).props();
    });

    it('Collapsed should be false on first render', () => {
        expect(props.collapsed).toBe(false);
    });

    it("passes the expandCollapse function to composed component", () => {
        expect(typeof props.expandCollapse)
            .toBe("function")
    });
 
    it("passes additional foo prop to composed component", () =>
        expect(props.foo)
            .toBe("foo")
    )
    it("passes additional gnar prop to composed component", () =>
        expect(props.gnar)
            .toBe("gnar")
    )
    it("toggles the collapsed state", () => {
        const instance = wrapperComponent.instance();
        instance.expandCollapse()
        expect(instance.state.collapsed).toBe(true)
    })
       

});