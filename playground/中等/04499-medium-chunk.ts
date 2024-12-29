/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #中等 #tuple

  ### 题目

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > 在 Github 上查看：https://tsch.js.org/4499/zh-CN
*/

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

// 转成字符串
type ToString<T extends number> = `${T}`
type ToNumber1<T extends string> = T extends `0${infer N extends number}` ? ToNumber1<`${N}`> : T extends `${infer A extends number}` ? A : never
// 从右向左遍历,并且减1;
type ReverseString<T extends string, R extends string = ''> = T extends `${infer First}${infer Rest}`
  ? ReverseString<Rest, `${First}${R}`>
  : R

// 遍历倒叙字符串
type MapString<T extends string, K extends 0 | 1 = 1> = T extends `${infer L}${infer R}` ?
  // 当前如果 需要减去1
  K extends 1 ?
  // 对当前位减1(如果当前位是0 那么下一位减1，如果不是0那么当前位置减一,下一位不变)
  `${Minus<L>}${L extends '0' ? MapString<R, 1> : R}`
  // 不需要减去1(直接返回当前传入值)
    : T
  : never
//   ^?
type MinusOne<T extends number> = ToNumber1<ReverseString<MapString<ReverseString<ToString<T>>>>>
/* _____________ 你的代码 _____________ */
type Get<T extends unknown[], K extends number> = K extends 0 ? [] :
  T extends [infer HEAD, ...infer TAIL] ?
      [HEAD, ...Get<TAIL, MinusOne<K>>]
    : []

type G = Get<[1, 2, 3], 4>
//    ^?
type Chunk<T extends unknown[], K extends number> = T extends [] ? []
  : T extends [...Get<T, K>, ...infer TAIL] ?
      [Get<T, K>, ...Chunk<TAIL, K>]
    : never

type C1 = Chunk<[], 1>
//    ^?
type C2 = Chunk<[1, 2, 3, 4], 2>
//    ^?

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4499/answer/zh-CN
  > 查看解答：https://tsch.js.org/4499/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
