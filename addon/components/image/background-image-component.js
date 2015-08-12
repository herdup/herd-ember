import Ember from 'ember';
import ImageLoaderMixin from 'herd-ember/mixins/image/image-loader-mixin';

/**
  Loads a stateful image for its css background-image.
  Class names are updated according to the image state.

  @class BackgroundImageComponent
  @extends Ember.Component
  @uses ImageLoaderMixin
**/
var BackgroundImageComponent = Ember.Component.extend( ImageLoaderMixin, {
  attributeBindings: ['style'],
  classNames: ['background-image'],
  applyStyle: Ember.on('willLoad', function(url) {
    if(url) {
      var backgroundImageStyle = 'background-image:url("' + url + '")';
      this.set('style', backgroundImageStyle.htmlSafe());
    }
  }),
  

  // TODO: Make this a mixin
  didLoadAction: 'didLoad',
  becameErrorAction: 'becameError',
  sendLoadAction: Ember.on('didLoad', function() {
    this.sendAction('didLoadAction', arguments);
  }),
  sendErrorAction: Ember.on('becameError', function() {
    this.sendAction('becameErrorAction', arguments);
  })
});

export default BackgroundImageComponent;
