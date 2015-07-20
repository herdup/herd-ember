import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('herd-uploader', 'Integration | Component | herd uploader', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  
  this.render(hbs`
    {{#herd-uploader}}
      template block text
    {{/herd-uploader}}
  `);

  assert.equal(this.$().find('li').text().trim(), 'No assets are present for this object.');
});
