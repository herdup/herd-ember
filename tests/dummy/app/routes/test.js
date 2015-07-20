import Ember from 'ember';

const {
  Route
} = Ember;

let payload = {
  data: {
    id: 1,
    type: 'post',
    attributes: {
      name: 'Ember is gr8 by _hhff'
    },
    relationships: {
      assets: {
        data: [
          {
            id: 1,
            type: 'herd_asset'
          }
        ]
      }
    }
  },
  included: [
    {
      id: 1,
      type: 'herd_asset',
      attributes: {
        assetable_id: 1,
        assetable_type: "Post",
        content_type: "image/jpeg",
        created_at: "2015-07-17T10:21:05.337Z",
        file_name: "tomster.jpg",
        file_size: 45164,
        height: 200,
        position: null,
        transform_name: null,
        updated_at: "2015-07-17T10:21:05.337Z",
        url: "http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200",
        width: 200
      }
    }
  ]
};

export default Route.extend({
  model() {
    return this.store.push(payload);
  }
});
