/*
  21220 - Permutations of Tuple
  -------
  by null (@gaac510) #中等 #union #tuple #conditional type #recursion

  ### 题目

  Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

  For example:

  ```ts
  PermutationsOfTuple<[1, number, unknown]>
  // Should return:
  // | [1, number, unknown]
  // | [1, unknown, number]
  // | [number, 1, unknown]
  // | [unknown, 1, number]
  // | [number, unknown, 1]
  // | [unknown, number ,1]
  ```

  > 在 Github 上查看：https://tsch.js.org/21220/zh-CN
*/

/* _____________ 你的代码 _____________ */
type MapArrayToUnion<T> = T extends [infer HEAD, ...infer TAIL] ? [HEAD] | MapArrayToUnion<TAIL> : never
type MapArray<T> = T extends [] ? [] : MapArrayToUnion<T>

// 将 [1,2] 转变成[1]|[2]
type M = MapArray<[any, unknown]>
//   ^?

// 将 ExtractArray<[1,2],2> => [1]
type ExtractArray<T, K, P extends unknown[] = []> = T extends [infer HEAD, ...infer TAIL] ? Equal<HEAD, K> extends true ? ExtractArray<TAIL, K, P> : ExtractArray<TAIL, K, [...P, HEAD]> : P

type PermutationsOfTuple<T extends unknown[], K = MapArray<T>> = K extends [infer R] ? [R, ...PermutationsOfTuple<ExtractArray<T, R>>] : []

type Case1 = PermutationsOfTuple<[]>
//   ^?
type Case2 = PermutationsOfTuple<[any]>
//   ^?
type Case3 = PermutationsOfTuple<[any, unknown]>
//   ^?
type Case4 = PermutationsOfTuple<[any, unknown, never]>
//   ^?

/* _____________ 测试用例 _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils'

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>,
  Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number, 1]
  >>,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/21220/answer/zh-CN
  > 查看解答：https://tsch.js.org/21220/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
