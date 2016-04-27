import Ember from 'ember';

const {
  get,
  computed,
  Mixin,
  Handlebars: { SafeString }
} = Ember;

/**
  @class BindsStyle
  @module herd-ember/mixins/binds-style
  @extends Ember.Mixin
*/
export default Mixin.create({
  attributeBindings: ['safeStyle:style'],
  safeStyle: computed('style', function() { 
    return new SafeString(get(this, 'style'));
  })
});
