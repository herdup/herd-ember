# Herd Ember
[![Build Status](https://travis-ci.org/herdup/herd-ember.svg)](https://travis-ci.org/herdup/herd-ember)

Herd Ember provides an Ember Data model & adapter infrastructure, to an Ember Application, for
easy integration with the Herd Gem.

It also provides an uploader component that can be used to post Assets to your Herd backend.

TODO:
- Drag and drop rearranging for Asset Position (in Uploader)

## Getting Started

```
ember install herd-ember
```

Now, in an assetable model, you can do:

```js
// app/models/post.js

import DS from 'ember-data';
import Assetable from 'herd-ember/mixins/assetable';

export default DS.Model.extend(Assetable, {
  name: DS.attr('string')
});
```

Now, provided your server is setup to pass down assets as sideloaded data to your Post model,
you'll be able to access the Herd assets like so:

```js
post.get('assets');
```

## Using the Uploader

You can place the uploader on a page like so:

```
// Assuming your model has Assetable mixed in...

{{herd-uploader assetable=model}}
```

## Customization

Herd Ember is easily customizable for a variety of use cases.

#### Overriding the defaults:

```
// In app/config/environment.js

ENV['herd'] = {
  host: null,
  namespace: null,
  adapter: 'JSONAPIAdapter'
}
```

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
