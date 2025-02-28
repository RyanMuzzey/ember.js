import type Owner from '@ember/owner';
import type { SafeString } from '@ember/template/-private/handlebars';
import Ember from 'ember';
import { expectTypeOf } from 'expect-type';

const top = (<T>(x?: T): T => x!)();
type Top = typeof top;
declare function expectTypeNativeArrayTop(x: Ember.NativeArray<Top>): void;
// A
expectTypeNativeArrayTop(Ember.A());
expectTypeOf(Ember.A([1, 2])).toEqualTypeOf<Ember.NativeArray<number>>();
// addListener
Ember.addListener({ a: 'foo' }, 'event', {}, () => {});
Ember.addListener({ a: 'foo' }, 'event', {}, 'a');
// @ts-expect-error
Ember.addListener({ a: 'foo' }, 'event', {}, 'b');
Ember.addListener({ a: 'foo' }, 'event', null, () => {});
// addObserver
Ember.addObserver({ a: 'foo' }, 'a', null, () => {});
Ember.addObserver({ a: 'foo' }, 'a', {}, () => {});
// assert
Ember.assert('2+2 should always be 4', 2 + 2 === 4);
// assign
const o1 = Ember.assign({ a: 1 }, { b: 2 });
expectTypeOf(o1.a).toBeNumber();
expectTypeOf(o1.b).toBeNumber();
// @ts-expect-error
o1.c;
// Ember.bind // @ts-expect-error
// cacheFor
expectTypeOf(Ember.cacheFor({ a: 123 }, 'a')).toEqualTypeOf<number | undefined>();
// @ts-expect-error
Ember.cacheFor({ a: 123 }, 'x');
// compare
expectTypeOf(Ember.compare('31', '114')).toEqualTypeOf<number>();
// debug
Ember.debug('some info for developers');
// deprecate
Ember.deprecate("you shouldn't use this anymore", 3 === 3, {
  id: 'no-longer-allowed',
  until: '99.0.0',
  for: 'Ember',
  since: { available: '4.0.0', enabled: '4.1.1' },
});
// get
expectTypeOf(Ember.get({ z: 23 }, 'z')).toEqualTypeOf<number>();
expectTypeOf(Ember.get({ z: 23 }, 'zz')).toEqualTypeOf<unknown>();
// getEngineParent
expectTypeOf(
  Ember.getEngineParent(new Ember.EngineInstance())
).toEqualTypeOf<Ember.EngineInstance>();
// getOwner
expectTypeOf(Ember.getOwner(new Ember.Component())).toEqualTypeOf<Owner | undefined>();
// getProperties
expectTypeOf(Ember.getProperties({ z: 23 }, 'z').z).toEqualTypeOf<number>();
expectTypeOf(Ember.getProperties({ z: 23 }, 'z', 'z').z).toEqualTypeOf<number>();
// @ts-expect-error
Ember.getProperties({ z: 23 }, 'z', 'a').z;
expectTypeOf(Ember.getProperties({ z: 23 }, ['z', 'z']).z).toEqualTypeOf<number>();
// @ts-expect-error
Ember.getProperties({ z: 23 }, ['z', 'a']).z;

// guidFor
expectTypeOf(Ember.guidFor({})).toEqualTypeOf<string>();
expectTypeOf(Ember.guidFor('')).toEqualTypeOf<string>();
// isArray
expectTypeOf(Ember.isArray('')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isArray([])).toEqualTypeOf<boolean>();
// isBlank
expectTypeOf(Ember.isBlank('')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isBlank([])).toEqualTypeOf<boolean>();
// isEmpty
expectTypeOf(Ember.isEmpty('')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isEmpty([])).toEqualTypeOf<boolean>();
// isEqual
expectTypeOf(Ember.isEqual('', 'foo')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isEqual([], '')).toEqualTypeOf<boolean>();
// isNone
expectTypeOf(Ember.isNone('')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isNone([])).toEqualTypeOf<boolean>();
// isPresent
expectTypeOf(Ember.isPresent('')).toEqualTypeOf<boolean>();
expectTypeOf(Ember.isPresent([])).toEqualTypeOf<boolean>();
// observer
class O2 extends Ember.Object {
  name = 'foo';
  age = 3;

  nameWatcher = Ember.observer('name', () => {});
  nameWatcher2 = Ember.observer('name', 'fullName', () => {});
}
const o2 = O2.create({
  name: 'foo',
  age: 3,
});
// on
class O3 extends Ember.Object {
  name = 'foo';
  nameWatcher = Ember.on('init', () => {});
  nameWatcher2 = Ember.on('destroy', () => {});
}
const o3 = O3.create();
// removeListener
Ember.removeListener(O2, 'create', null, () => {});
Ember.removeListener(O2, 'create', null, 'create');
// @ts-expect-error
Ember.removeListener({}, 'create', null, 'blah');
// removeObserver
Ember.removeObserver(O2, 'create', () => {});
// @ts-expect-error
Ember.removeObserver({}, 'create', () => {});
// runInDebug
Ember.runInDebug(() => {});
// sendEvent
expectTypeOf(Ember.sendEvent(o2, 'clicked', [1, 2])).toBeBoolean();
// set
expectTypeOf(Ember.set(O2.create(), 'name', 'bar')).toEqualTypeOf<string>();
expectTypeOf(Ember.set(O2.create(), 'age', 4)).toEqualTypeOf<number>();
// @ts-expect-error
Ember.set(O2.create(), 'nam', 'bar');
// setOwner
declare let app: Ember.ApplicationInstance;
Ember.setOwner(O2.create(), app);
// setProperties
expectTypeOf(Ember.setProperties(O2.create(), { name: 'bar' }).name).toEqualTypeOf<string>();
// trySet
expectTypeOf(Ember.trySet(O2, 'nam', '')).toBeUnknown();
// typeOf
expectTypeOf(Ember.typeOf('')).toEqualTypeOf<'string'>();
// @ts-ignore -- this *should* work but the namespace version is not carrying
// it through correctly. However, people can *and should* simply use the
// module import instead!
expectTypeOf(Ember.typeOf(Ember.A())).toEqualTypeOf<'array'>();
// warn
// @ts-expect-error
Ember.warn('be caseful!');
Ember.warn('be caseful!', { id: 'some-warning' });
// VERSION
expectTypeOf(Ember.VERSION).toEqualTypeOf<string>();

// onerror

Ember.onerror = (err: Error) => console.error(err);
// @ts-expect-error
Ember.onerror = (num: number, err: Error) => console.error(err);
Ember.onerror = undefined;

// Classes
// TODO ContainerProxyMixin
// Ember
// Ember.Application
expectTypeOf(new Ember.Application()).toEqualTypeOf<Ember.Application>();
expectTypeOf(Ember.Application.create()).toEqualTypeOf<Ember.Application>();
// Ember.ApplicationInstance
expectTypeOf(new Ember.ApplicationInstance()).toEqualTypeOf<Ember.ApplicationInstance>();
expectTypeOf(Ember.ApplicationInstance.create()).toEqualTypeOf<Ember.ApplicationInstance>();
// Ember.Array
const a1: Ember.NativeArray<string> = Ember.A([]);
// @ts-expect-error
const a2: Ember.Array<string> = {};
// Ember.ArrayProxy
expectTypeOf(new Ember.ArrayProxy<number>([3, 3, 2])).toEqualTypeOf<Ember.ArrayProxy<number>>();
// Ember.Component
const C1 = Ember.Component.extend({ classNames: ['foo'] });
class C2 extends Ember.Component {
  classNames = ['foo'];
}
const c1 = new C1();
const c2 = new C2();
C1.create();
C2.create();
c1.didInsertElement();
c2.didInsertElement();

class Foo {
  foo = '';

  @Ember.computed('foo')
  get wat(): string {
    return this.foo;
  }

  set wat(newValue: string) {
    this.foo = newValue;
  }
}

// Ember.ContainerDebugAdapter
expectTypeOf(new Ember.ContainerDebugAdapter()).toEqualTypeOf<Ember.ContainerDebugAdapter>();
// Ember.Controller
expectTypeOf(new Ember.Controller()).toEqualTypeOf<Ember.Controller>();
// Ember.CoreObject
expectTypeOf(new Ember.CoreObject()).toEqualTypeOf<Ember.CoreObject>();
// Ember.DataAdapter
expectTypeOf(new Ember.DataAdapter()).toEqualTypeOf<Ember.DataAdapter>();
// Ember.Debug
Ember.Debug.registerDeprecationHandler(() => {});
Ember.Debug.registerWarnHandler(() => {});
// Ember.Engine
const e1 = new Ember.Engine();
e1.register('data:foo', {}, { instantiate: false });
// Ember.EngineInstance
const ei1 = new Ember.EngineInstance();
ei1.lookup('data:foo');
// Ember.Error
new Ember.Error('Halp!');
// Ember.Evented
interface OE1 extends Ember.Evented {}
class OE1 extends Ember.Object.extend(Ember.Evented) {}
const oe1 = OE1.create();
oe1.trigger('foo');
oe1.on('bar', () => {});
oe1.on('bar', { foo() {} }, () => {});
// Ember.HashLocation
const hl = new Ember.HashLocation();
expectTypeOf(hl).toEqualTypeOf<Ember.HashLocation>();
// Ember.Helper
class H1 extends Ember.Helper {
  compute() {
    this.recompute();
    return '';
  }
}
// Ember.HistoryLocation
const hil = Ember.HistoryLocation.create();
expectTypeOf(hil).toEqualTypeOf<Ember.HistoryLocation>();
// Ember.Mixin
interface UsesMixin {
  foo: string;
}
class UsesMixin extends Ember.Object {
  baz() {
    expectTypeOf(this.foo).toBeString();
  }
}
// Ember.MutableArray
const ma1: Ember.NativeArray<string> = Ember.A(['money', 'in', 'the', 'bananna', 'stand']);
expectTypeOf(ma1.addObject('!')).toMatchTypeOf(ma1);
// TODO: Ideally we'd mark the value as being invalid
ma1.filterBy('');
expectTypeOf(ma1.firstObject).toEqualTypeOf<string | undefined>();
expectTypeOf(ma1.lastObject).toEqualTypeOf<string | undefined>();
const ma2: Ember.NativeArray<{ name: string }> = Ember.A([
  { name: 'chris' },
  { name: 'dan' },
  { name: 'james' },
]);
expectTypeOf(ma2.filterBy('name', 'chris')).toEqualTypeOf<Ember.NativeArray<{ name: string }>>();
// Ember.MutableEnumerable
const me1 = Ember.A(['foo', undefined, null]);
expectTypeOf(me1.compact()).toEqualTypeOf<Ember.NativeArray<string>>();
// Ember.Namespace
const myNs = Ember.Namespace.extend({});
// Ember.NativeArray
const na: Ember.NativeArray<number> = Ember.A([2, 3, 4]);
expectTypeOf(na).toEqualTypeOf<Ember.NativeArray<number>>();
expectTypeOf(na.clear()).toEqualTypeOf<Ember.NativeArray<number>>();
// Ember.NoneLocation
expectTypeOf(new Ember.NoneLocation()).toEqualTypeOf<Ember.NoneLocation>();
// Ember.Object
new Ember.Object();
// Ember.ObjectProxy
expectTypeOf(new Ember.ObjectProxy()).toEqualTypeOf<Ember.ObjectProxy>();
// Ember.Observable
Ember.Object.extend(Ember.Observable, {});
// Ember.PromiseProxyMixin
interface PPM<T> extends Ember.PromiseProxyMixin<T> {}
class PPM<T> extends Ember.Object.extend(Ember.PromiseProxyMixin) {
  foo() {
    expectTypeOf(this.reason).toEqualTypeOf<unknown>();
    expectTypeOf(this.isPending).toEqualTypeOf<boolean>();
  }
}
// Ember.Route
new Ember.Route();
// Ember.Router
new Ember.Router();
// Ember.Service
new Ember.Service();
// Ember.Test
Ember.Test;
// Ember.Test.Adapter
new Ember.Test.Adapter();
// Ember.Test.QUnitAdapter
new Ember.Test.QUnitAdapter();
// Ember.Helper
// helper
Ember.Helper.helper(([a, b]: [number, number]) => a + b);
// Ember.String
Ember.String;
// htmlSafe
expectTypeOf(Ember.String.htmlSafe('foo')).toEqualTypeOf<SafeString>();
// isHTMLSafe
expectTypeOf(Ember.String.isHTMLSafe('foo')).toEqualTypeOf<boolean>();
// Ember.Test
expectTypeOf(Ember.Test.checkWaiters()).toEqualTypeOf<boolean>();
// checkWaiters

/**
 * == REMOVED FEATURES ==
 * These are deprecated and/or private things that have been removed from the
 * Ember.* namespace. These tests asserts that the types of these things
 * stay gone
 */

// @ts-expect-error
Ember.bind;
// @ts-expect-error
Ember.deprecate('foo', 'bar');
// @ts-expect-error
Ember.K;
// @ts-expect-error
Ember.Binding;
// @ts-expect-error
Ember.Transition;
// @ts-expect-error
Ember.create;
// @ts-expect-error
Ember.reset;
// @ts-expect-error
Ember.unsubscribe;
// @ts-expect-error
Ember.subscribe;
// @ts-expect-error
Ember.instrument;
// @ts-expect-error
Ember.Instrumentation;
