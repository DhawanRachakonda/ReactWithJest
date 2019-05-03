import {PureComponent} from 'react';

const Expandable = Component => {
    return class EnhancedComponent extends PureComponent {
        constructor(props) {
            super();
            this.state = {
                collapsed: false, 
            }
        }
        expandCollapse() {
            this.setState(state => {
                return {
                    collapsed: !state.collapsed,
                };
            });
        }
        render() {
            return(
                <Component collapsed={this.state.collapsed} expandCollapse={this.expandCollapse} {...this.props} />
            );
        }
    }
}

export default Expandable;