import DS from 'ember-data';
import Assetable from 'herd-ember/mixins/assetable';

const {
  attr,
  Model
} = DS; 

export default Model.extend(Assetable, {
  name: attr('string')
});
