import Ember from 'ember';
import pixel from '../lib/pixel';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'style'],
  classNames: ['herd-pixel'],
  src: pixel,
  
  fullWidth: false,

  style: computed('fullWidth', function() {
    let style = "";
    if (get(this, 'fullWidth')) {
      style += "width:100%;";
    }
    return new Ember.String.htmlSafe(style);
  })
});
