/*
  27133 - Square
  -------
  by null (@aswinsvijay) #中等 #tuple #array #math

  ### 题目

  Given a number, your type should return its square.

  > 在 Github 上查看：https://tsch.js.org/27133/zh-CN
*/

/* _____________ 你的代码 _____________ */
type MapAdd = [
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]],
  [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0]],
  [[0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1]],
  [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2]],
  [[0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3]],
  [[0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
  [[0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
  [[0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6]],
  [[0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]],
  [[0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]],
]

type MapMultiply = [
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]],
  [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8], [1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
  [[0, 0], [0, 3], [0, 6], [0, 9], [1, 2], [1, 5], [1, 8], [2, 1], [2, 4], [2, 7]],
  [[0, 0], [0, 4], [0, 8], [1, 2], [1, 6], [2, 0], [2, 4], [2, 8], [3, 2], [3, 6]],
  [[0, 0], [0, 5], [1, 0], [1, 5], [2, 0], [2, 5], [3, 0], [3, 5], [4, 0], [4, 5]],
  [[0, 0], [0, 6], [1, 2], [1, 8], [2, 4], [3, 0], [3, 6], [4, 2], [4, 8], [5, 4]],
  [[0, 0], [0, 7], [1, 4], [2, 1], [2, 8], [3, 5], [4, 2], [4, 9], [5, 6], [6, 3]],
  [[0, 0], [0, 8], [1, 6], [2, 4], [3, 2], [4, 0], [4, 8], [5, 6], [6, 2], [7, 2]],
  [[0, 0], [0, 9], [1, 8], [2, 7], [3, 6], [4, 5], [5, 4], [6, 4], [7, 3], [8, 1]],
]

type Add<M extends number[], N extends number[]> = M extends [
  ...infer MRest extends number[],
  infer MLast extends number,
]
  ? N extends [...infer NRest extends number[], infer NLast extends number]
    ? MapAdd[MLast][NLast] extends [infer TensPlace1 extends number, infer OnesPlace1]
      ? [...Add<MRest, [TensPlace1]>, OnesPlace1] extends [
          ...infer Rest2 extends number[],
          infer OnesPlace2,
        ]
          ? [...Add<Rest2, NRest>, OnesPlace2]
          : never
      : never
    : M
  : N

type Multiply<M extends number[], N extends number, CarryUp extends number[] = [0]> = M extends [
  ...infer MRest extends number[],
  infer MLast extends number,
]
  ? MapMultiply[MLast][N] extends infer I extends number[]
    ? Add<I, CarryUp> extends [...infer Rest1 extends number[], infer OnesPlace1]
      ? [...Multiply<MRest, N, Rest1>, OnesPlace1]
      : never
    : never
  : [...CarryUp]

type Join<M extends number[]> = M extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? `${First}${Join<Rest>}`
  : ''

type Format<M extends number[]> = M extends [0, ...infer Rest extends number[]]
  ? Format<Rest>
  : M extends []
    ? Join<[0]>
    : Join<M>

type SquareTuple<
  M extends number[],
  N extends number[] = M,
  Result extends number[] = [],
  Place extends number[] = [],
> = N extends [...infer Rest1 extends number[], infer OnesPlace1 extends number]
  ? SquareTuple<M, Rest1, Add<Result, [...Multiply<M, OnesPlace1>, ...Place]>, [...Place, 0]>
  : Result

type ToNumber<S extends string> = S extends `${infer M extends number}` ? M : never

type ToTuple<N extends string> = `${N}` extends `${infer A}${infer B}`
  ? [ToNumber<A>, ...ToTuple<B>]
  : []

type Square<N extends number> = `${N}` extends `-${infer A extends number}`
  ? Square<A>
  : ToNumber<Format<SquareTuple<ToTuple<`${N}`>>>>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  Expect<Equal<Square<101>, 10201>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/27133/answer/zh-CN
  > 查看解答：https://tsch.js.org/27133/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
