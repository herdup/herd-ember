import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('herd-file-field', 'Integration | Component | herd file field', {
  unit: true
});

test('it throws if files are present but assetable is not', function(assert) {
  let component = this.subject();

  assert.throws(function() {
    component.filesDidChange({ isFile: true });
  }, Error, "Should raise error");
});
