/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #中等 #math

  ### 题目

  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

  例如:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > 在 Github 上查看：https://tsch.js.org/2257/zh-CN
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
type S = ToString<9_007_199_254_740_992>
//   ^?
type ToNumber1<T extends string> = T extends `0${infer N extends number}` ? ToNumber1<`${N}`> : T extends `${infer A extends number}` ? A : never
type N = ToNumber1<'20'>
//   ^?
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
type M = MapString<'01'>
//   ^?
type MinusOne<T extends number> = ToNumber1<ReverseString<MapString<ReverseString<ToString<T>>>>>
type One = MinusOne<1>
//   ^?
type Two = MinusOne<10>
//   ^?
type Three = MinusOne<100>
//   ^?
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2257/answer/zh-CN
  > 查看解答：https://tsch.js.org/2257/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
