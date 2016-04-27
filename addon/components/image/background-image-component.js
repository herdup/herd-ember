import Ember from 'ember';
import ImageLoaderMixin from 'herd-ember/mixins/image/image-loader-mixin';
import BindsStyle from 'herd-ember/mixins/binds-style';
import HasLoadActions from 'herd-ember/mixins/has-load-actions';

const {
  get,
  set,
  on,
  Component
} = Ember;

/**
  Loads a stateful image for its css background-image.
  Class names are updated according to the image state.

  @class BackgroundImageComponent
  @extends Ember.Component
  @uses ImageLoaderMixin
**/
export default Component.extend(ImageLoaderMixin, BindsStyle, HasLoadActions, {
  classNames: ['background-image'],

  applyStyle: on('willLoad', function(url) {
    set(this, 'style', `background-image:url(${url})`);
  })
});
