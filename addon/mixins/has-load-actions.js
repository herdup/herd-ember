import Ember from 'ember';

const {
  on,
  Mixin
} = Ember;

/**
  @class HasLoadActions 
  @module herd-ember/mixins/has-load-actions
  @extends Ember.Mixin
*/
export default Mixin.create({
  didLoadAction: 'didLoad',
  becameErrorAction: 'becameError',

  sendLoadAction: on('didLoad', function() {
    this.sendAction('didLoadAction', arguments);
  }),

  sendErrorAction: on('becameError', function() {
    this.sendAction('becameErrorAction', arguments);
  })
});
