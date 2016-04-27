import Ember from 'ember';
import pixel from '../lib/pixel';
import BindsStyle from 'herd-ember/mixins/binds-style';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend(BindsStyle, {
  tagName: 'img',
  attributeBindings: ['src'],
  classNames: ['herd-pixel'],
  src: pixel,
  
  fullWidth: false,

  style: computed('fullWidth', function() {
    let style = "";
    if (get(this, 'fullWidth')) { style += "width:100%;"; }
    return style;
  })
});
