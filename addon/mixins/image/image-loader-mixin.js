import Ember from 'ember';
import ImageStateMixin from './image-state-mixin';
import { task } from 'ember-concurrency';

const {
  run,
  Mixin,
  Evented
} = Ember;

/**
  @private
  Smallest possible image data uri. 1x1 px transparent gif.
  Used to cancel a image request in progress.
  */
const blankImg = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

/**
  Mixin to load images and handle state changes from
  native javascript image events.

  @class ImageLoaderMixin
  @uses Ember.Evented
  @uses ImageStateMixin
**/
export default Mixin.create(Evented, ImageStateMixin, {
  /**
    JavaScript Image Object used to do the loading.

    @property imageLoader
    @type Image
    @default Image
  */
  imageLoader: Ember.computed(function() { return new Image(); }),

  /**
    Loads the image src using native javascript Image object
    @method loadImage
  */
  loadImage: task(function * () {
    let url = this.get('url');
    if (url) {
      let img = this.get('imageLoader');
      this.trigger('willLoad', url);
      this.setProperties({ isLoading: true, isError: false });

      try {
        let promise = Ember.RSVP.Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        img.src = url;
        let e = yield promise;
        run(() => {
          this.setProperties({ isLoading: false, isError: false });
          this.trigger('didLoad', img, e);
        });
      } catch(e) {
        run(() => {
          this.setProperties({ isLoading: false, isError: true });
          this.trigger('becameError', img, e);
        });
      }
    }
  }).drop(),

  /**
   * Clears an image to a blank state.
   * Useful for canceling, or when swapping urls
    Notes:
    - Removing img from the DOM does not cancel an img http request.
    - Setting img src to null has unexpected results cross-browser.
   */
  clearImage: task(function * () {
    let img = this.get('imageLoader');
    img.onload = img.onerror = null;
    img.src = blankImg;
    this.setProperties({ isLoading: false, isError: false });
    yield Ember.RSVP.resolve();
  }).keepLatest(),

  /**
    Loads the image when the view is initially inserted
    @method loadImageOnInsert
  */
  loadImageOnInsert: Ember.on('didInsertElement', function() {
    run.scheduleOnce('afterRender', this, () => {
      this.get('loadImage').perform();
    });
  }),

  /**
    Load an image whenever the url is changed.
    @method loadImageOnUrlSet
  */
  loadImageOnUrlSet: Ember.observer('url', function() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      this.get('clearImage').perform();
      this.get('loadImage').perform();
    });
  })
});

