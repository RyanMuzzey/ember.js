import { assert, deprecate } from '@ember/debug';

export interface ILocation {
  implementation: string;
  cancelRouterSetup?: boolean;
  getURL(): string;
  setURL(url: string): void;
  replaceURL?(url: string): void;
  onUpdateURL(callback: UpdateCallback): void;
  formatURL(url: string): string;
  detect?(): void;
  initState?(): void;
  destroy(): void;
}

export type UpdateCallback = (url: string) => void;
/**
@module @ember/routing/location
*/

/**
  Location returns an instance of the correct implementation of
  the `location` API.

  ## Implementations

  You can pass an implementation name (`hash`, `history`, `none`, `auto`) to force a
  particular implementation to be used in your application.

  See [HashLocation](/ember/release/classes/HashLocation).
  See [HistoryLocation](/ember/release/classes/HistoryLocation).
  See [NoneLocation](/ember/release/classes/NoneLocation).
  See [AutoLocation](/ember/release/classes/AutoLocation).

  ## Location API

  Each location implementation must provide the following methods:

  * implementation: returns the string name used to reference the implementation.
  * getURL: returns the current URL.
  * setURL(path): sets the current URL.
  * replaceURL(path): replace the current URL (optional).
  * onUpdateURL(callback): triggers the callback when the URL changes.
  * formatURL(url): formats `url` to be placed into `href` attribute.
  * detect() (optional): instructs the location to do any feature detection
      necessary. If the location needs to redirect to a different URL, it
      can cancel routing by setting the `cancelRouterSetup` property on itself
      to `false`.

  Calling setURL or replaceURL will not trigger onUpdateURL callbacks.

  ## Custom implementation

  Ember scans `app/locations/*` for extending the Location API.

  Example:

  ```javascript
  import HistoryLocation from '@ember/routing/history-location';

  export default class MyHistory {
    implementation = 'my-custom-history';

    constructor() {
      this._history = HistoryLocation.create(...arguments);
    }

    create() {
      return new this(...arguments);
    }

    pushState(path) {
       this._history.pushState(path);
    }
  }
  ```

  @class Location
  @private
*/
export default {
  /**
   This is deprecated in favor of using the container to lookup the location
   implementation as desired.

   For example:

   ```javascript
   // Given a location registered as follows:
   container.register('location:history-test', HistoryTestLocation);

   // You could create a new instance via:
   container.lookup('location:history-test');
   ```

    @method create
    @param {Object} options
    @return {Object} an instance of an implementation of the `location` API
    @deprecated Use the container to lookup the location implementation that you
    need.
    @private
  */
  create(options?: { implementation: string }): ILocation {
    let implementation = options?.implementation;
    assert("Location.create: you must specify a 'implementation' option", implementation);

    let implementationClass = this.implementations[implementation];

    assert(`Location.create: ${implementation} is not a valid implementation`, implementationClass);

    deprecate(
      "Calling `create` on Location class is deprecated. Instead, use `container.lookup('location:my-location')` to lookup the location you need.",
      false,
      {
        id: 'deprecate-auto-location',
        until: '5.0.0',
        url: 'https://emberjs.com/deprecations/v4.x#toc_deprecate-auto-location',
        for: 'ember-source',
        since: {
          available: '4.1.0',
          enabled: '4.1.0',
        },
      }
    );

    return implementationClass.create(...arguments);
  },

  implementations: {} as Record<string, { create: (...args: any[]) => ILocation }>,
};
