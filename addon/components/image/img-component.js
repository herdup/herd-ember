import Ember from 'ember';
import ImageLoaderMixin from 'herd-ember/mixins/image/image-loader-mixin';
import HasLoadActions from 'herd-ember/mixins/has-load-actions';


const {
  on,
  computed,
  Component
} = Ember;

/**
  `img-component` renders a stateful `<img>` element whose loading and
  error states can be observed, and whose class names are updated accordingly.

  Instances of `img-component` can be created using the `stateful-img` Handlebars helper.
  ```handlebars
  {{stateful-img src="img/image1.jpg" alt="Image" width=100 height=100}}
  ```

  @class ImgComponent
  @extends Ember.Component
  @uses ImageLoaderMixin
**/
export default Component.extend(ImageLoaderMixin, HasLoadActions, {
  tagName: 'img',
  attributeBindings: ['alt', 'width', 'height'],
});
