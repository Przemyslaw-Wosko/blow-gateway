/// <reference path="node/node.d.ts" />
/// <reference path="mocha/mocha.d.ts" />
/// <reference path="chai/chai.d.ts" />

declare module "util" {
  export function isFunction(object: any): boolean;
  export function isString(object: any): boolean;
  export function isUndefined(object: any): boolean;
  export function isObject(object: any): boolean;
}