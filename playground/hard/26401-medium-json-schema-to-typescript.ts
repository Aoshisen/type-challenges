/*
  26401 - JSON Schema to TypeScript
  -------
  by null (@aswinsvijay) #中等 #JSON

  ### 题目

  Implement the generic type JSONSchema2TS which will return the TypeScript type corresponding to the given JSON schema.

  Additional challenges to handle:
  * additionalProperties
  * oneOf, anyOf, allOf
  * minLength and maxLength

  > 在 Github 上查看：https://tsch.js.org/26401/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Unions<T, K> = {
  [P in keyof (T & K)]: P extends keyof T
    ? (P extends keyof K ? T[P] | K[P] : T[P])
    : (P extends keyof K ? K[P] : never)
}
type RequiredByKeys<T, K extends keyof T = keyof T> = Unions<Required<Pick<T, K>>, Omit<T, K>>
// array 的时候有items, object 的时候有properties, string 和number 的时候有enums

// ----------------------- string -----------------------------------
type StringType = { type: 'string', enum?: string[] }
type String2Ts<T extends StringType> = T['enum'] extends string[] ? T['enum'][number] : string
type C1 = String2Ts<{ type: 'string', enum: ['a', 'b', 'c'] }>
//   ^?
type C2 = String2Ts<{ type: 'string' }>
//   ^?

// ----------------------- number -----------------------------------
type NumberType = { type: 'number', enum?: number[] }
type Number2Ts<T extends NumberType> = T['enum'] extends number[] ? T['enum'][number] : number
type C3 = Number2Ts<{ type: 'number', enum: [1, 2, 3] }>
//   ^?
type C4 = Number2Ts<{ type: 'number' }>
//   ^?

// ----------------------- number -----------------------------------
type BooleanType = { type: 'boolean' }
type Boolean2Ts<T> = T extends BooleanType ? boolean : never
type C5 = Boolean2Ts<{ type: 'boolean' }>
//   ^?

// ----------------------- number -----------------------------------

type UnionType = NumberType | StringType | ObjectType | BooleanType | ArrayType
type BaseType = NumberType | StringType | BooleanType | ArrayType
type ArrayType = { type: 'array', items?: UnionType }

type Array2Ts<T extends ArrayType> = T['items'] extends UnionType ? JSONSchema2TS<T['items']>[] : unknown[]

type ProcessBaseType<T extends BaseType> = T extends StringType ? String2Ts<T> : T extends NumberType ? Number2Ts<T> : T extends BooleanType ? Boolean2Ts<T> : T extends ArrayType ? Array2Ts<T> : never

type ObjectType = {
  type: 'object'
  properties?: { [x: string]: unknown }
  required?: string[]
}
type Object2Ts<T extends ObjectType, P extends object | undefined = T['properties'], R extends string[] | undefined = T['required']> = P extends { [x: string]: unknown } ?
  // properties 有值
  RequiredByKeys<
    {
      [K in keyof P]?: P[K] extends ObjectType ? Object2Ts<P[K]> : P[K] extends BaseType ? ProcessBaseType<P[K]> : never
    },
    R extends string[] ? R[number]
      : never
  >
  : Record<string, unknown>

type JSONSchema2TS<T extends NumberType | StringType | BooleanType | ObjectType | ArrayType> = T extends BaseType ? ProcessBaseType<T> : T extends ObjectType ? Object2Ts<T> : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: 'string'
}>
type Expected1 = string
type Result1 = Expect<Equal<Type1, Expected1>>

type Type2 = JSONSchema2TS<{
  type: 'number'
}>
type Expected2 = number
type Result2 = Expect<Equal<Type2, Expected2>>

type Type3 = JSONSchema2TS<{
  type: 'boolean'
}>
type Expected3 = boolean
type Result3 = Expect<Equal<Type3, Expected3>>
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: 'string'
  enum: ['a', 'b', 'c']
}>
type Expected4 = 'a' | 'b' | 'c'
type Result4 = Expect<Equal<Type4, Expected4>>

type Type5 = JSONSchema2TS<{
  type: 'number'
  enum: [1, 2, 3]
}>
type Expected5 = 1 | 2 | 3
type Result5 = Expect<Equal<Type5, Expected5>>
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: 'object'
}>
type Expected6 = Record<string, unknown>
type Result6 = Expect<Equal<Type6, Expected6>>

type Type7 = JSONSchema2TS<{
  type: 'object'
  properties: {}
}>
type Expected7 = {}
type Result7 = Expect<Equal<Type7, Expected7>>

type Type8 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
    }
  }
}>
type Expected8 = {
  a?: string
}
type Result8 = Expect<Equal<Type8, Expected8>>
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{ type: 'array' }>
//    ^?
type Expected9 = unknown[]
type Result9 = Expect<Equal<Type9, Expected9>>

type Type10 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'string'
  }
}>
type Expected10 = string[]
type Result10 = Expect<Equal<Type10, Expected10>>

type Type11 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
  }
}>
type Expected11 = Record<string, unknown>[]
type Result11 = Expect<Equal<Type11, Expected11>>
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
      enum: ['a', 'b', 'c']
    }
    b: {
      type: 'number'
    }
  }
}>
type Expected12 = {
  a?: 'a' | 'b' | 'c'
  b?: number
}
type Result12 = Expect<Equal<Type12, Expected12>>

type Type13 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
    properties: {
      a: {
        type: 'string'
      }
    }
  }
}>
type Expected13 = {
  a?: string
}[]
type Result13 = Expect<Equal<Type13, Expected13>>
// - Mixed types

// + Required fields
type Inner = {
  type: 'object'
  properties: {
    req1: { type: 'string' }
    req2: {
      type: 'object'
      properties: {
        a: {
          type: 'number'
        }
      }
      required: ['a']
    }
    add1: { type: 'string' }
    add2: {
      type: 'array'
      items: {
        type: 'number'
      }
    }
  }
  required: ['req1', 'req2']
}

type Type14 = JSONSchema2TS<Inner>
//    ^?
type Expected14 = {
  req1: string
  req2: { a: number }
  add1?: string
  add2?: number[]
}
type Result14 = Expect<Equal<Type14, Expected14>>
// - Required fields

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/26401/answer/zh-CN
  > 查看解答：https://tsch.js.org/26401/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
