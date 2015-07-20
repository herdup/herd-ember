import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  run
} = Ember;

moduleForModel('herd-asset', 'Unit | Model | herd asset', {
  needs: ['adapter:herd-asset']
});

test('it exists', function(assert) {
  let herdAsset = this.subject();
  assert.ok(!!herdAsset);
});

test('it correctly returns an absolute URL', function(assert) {
  let herdAsset = this.subject();

  let relative = '/post/title-1/image.jpg';
  let absolute = '//cdn.cool.sweet/post/title-1/image.jpg';
  
  run(() => {
    herdAsset.set('url', relative);
    assert.equal(herdAsset.get('absoluteUrl'), 'http://localhost:3000/post/title-1/image.jpg');

    herdAsset.set('url', absolute);
    assert.equal(herdAsset.get('absoluteUrl'), absolute);
  });
});
