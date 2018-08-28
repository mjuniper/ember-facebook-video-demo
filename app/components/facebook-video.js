import { reads } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({

  classNames: [ 'fb-video' ],

  attributeBindings: [ 'data-href', 'data-width', 'data-allowfullscreen' ],

  allowFullscreen: true,
  'data-allowfullscreen': reads('allowFullscreen'),

  width: 'auto',
  'data-width': reads('width'),

  'data-href': reads('url'),

  init() {
    this._super(...arguments);
    this.loadScript();
  },

  loadScript: function() {
    // NOTE: apparently this will work even if this script lands after the element is rendered
    const tagName = 'script';
    const id = 'facebook-jssdk';
    let js;
    const fjs = document.getElementsByTagName(tagName)[0];
    if (document.getElementById(id)) { return; }

    // NOTE: the instructions (linked above) say you need to add this element but it does not seem to be necessary
    // i think if it is not there the script adds it
    const rootEl = document.createElement('div');
    rootEl.id = 'fb-root';
    document.body.append(rootEl);

    js = document.createElement(tagName);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1";
    fjs.parentNode.insertBefore(js, fjs);
  }

});
