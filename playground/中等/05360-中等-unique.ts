/*
  5360 - Unique
  -------
  by Pineapple (@Pineapple0919) #中等 #array

  ### 题目

  实现类型版本的 Lodash.uniq 方法, Unique<T> 接收数组类型 T, 返回去重后的数组类型.

  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```

  > 在 Github 上查看：https://tsch.js.org/5360/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Includes<T extends readonly unknown[], U> = T extends [infer Head, ...infer Tail]
  ? Equal<Head, U> extends true
  ? true
  : Includes<Tail, U>
  : false

type Unique<T extends readonly unknown[]> = T extends [...infer HEAD, infer TAIL] ?
  Includes<HEAD, TAIL> extends true ?
  Unique<HEAD>
  : [...Unique<HEAD>, TAIL]
  : []

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/5360/answer/zh-CN
  > 查看解答：https://tsch.js.org/5360/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
