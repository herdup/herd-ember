import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('herd-file-field', 'Integration | Component | herd file field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{herd-file-field}}`);
  assert.equal(this.$().find('input[type="file"]').length, 1);
});
