/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > 在 Github 上查看：https://tsch.js.org/3243/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 这是减1 的算法
type Minus<T extends string> = T extends '0' ? '9' :
  T extends '1' ? '0' :
    T extends '2' ? '1' :
      T extends '3' ? '2' :
        T extends '4' ? '3' :
          T extends '5' ? '4' :
            T extends '6' ? '5' :
              T extends '7' ? '6' :
                T extends '8' ? '7' :
                  T extends '9' ? '8' : never

type ToString<T extends number> = `${T}`
type ToNumber1<T extends string> = T extends `0${infer N extends number}` ? ToNumber1<`${N}`> : T extends `${infer A extends number}` ? A : never
type ReverseString<T extends string, R extends string = ''> = T extends `${infer First}${infer Rest}`
  ? ReverseString<Rest, `${First}${R}`>
  : R

type MapString<T extends string, K extends 0 | 1 = 1> = T extends `${infer L}${infer R}` ?
  K extends 1 ?
  `${Minus<L>}${L extends '0' ? MapString<R, 1> : R}`
    : T
  : never
type MinusOne<T extends number> = ToNumber1<ReverseString<MapString<ReverseString<ToString<T>>>>>

// 遍历当前数组,并去掉一层数组
type MapArray<T> = T extends [infer HEAD, ...infer TAIL] ? HEAD extends unknown[] ? [...HEAD, ...MapArray<TAIL>] : [HEAD, ...MapArray<TAIL>] : []
type M = MapArray<[1, 2, [3, 4], [[[5]]]]>
//   ^?

type FlattenDepth<T extends unknown[], K extends number = 1> = K extends 0 ?
  T
  : T extends number[] ? T
    : FlattenDepth<MapArray<T>, MinusOne<K>>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3243/answer/zh-CN
  > 查看解答：https://tsch.js.org/3243/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
