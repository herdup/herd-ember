# Herd Ember
[![Build Status](https://travis-ci.org/herdup/herd-ember.svg)](https://travis-ci.org/herdup/herd-ember)

Herd Ember provides an Ember Data model & adapter infrastructure, to an Ember Application, for
easy integration with the Herd Gem.

It also provides an uploader component that can be used to post Assets to your Herd backend.

TODO:
- Drag and drop rearranging for Asset Position (in Uploader)

## Getting Started

You'll need Ember Concurrency first!

```
ember install ember-concurrency
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

Now, provided your server is setup to pass down assets (and missing assets) as sideloaded data to your Post model,
you'll be able to access the Herd assets like so:

```js
post.get('assets');
```

## Displaying Herd Assets

Currently, Herd Ember only supports Assets with `assetClass === 'image'`.  We plan to support more Asset Types soon!

```
{{post.name}}
{{herd-asset assetable=post}}
```

### Asset Class `image`

A big thankyou to [Bustle Labs](http://www.bustle.com/labs) for their excellent `ember-cli-image` library.  When they cut a release to NPM, we'll
switch to using it directly.

These class names will be updated throughout the lifecycle of the Image asset:

- `herd-asset`
- `image`
- `loading`
- `error`

You can optionally pass the below options to the `herd-asset` component:

- `alt:string`: Alt text for the Image
- `width:integer`: A pixel width for the Image
- `height:integer`: A pixel height for the Image
- `backgroundImage:boolean`: When true, will render the image as a background image
- `imageContainer:boolean`: When true, will render the image in a container

**Note**: When using `backgroundImage` or `imageContainer`, you can also pass a block to the helper, like so:

```
{{#herd-asset assetable=post backgroundImage=true}}
  <h1>{{post.name}}</h1>
{{/herd-asset}}
```

## Using the Uploader

You can place the uploader on a page like so:

```
{{herd-uploader assetable=post}}
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
