/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #中等 #array

  ### 题目

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > 在 Github 上查看：https://tsch.js.org/4425/zh-CN
*/

/* _____________ 你的代码 _____________ */
//
type GrateList = {
  '0': []
  '1': ['0']
  '2': ['0', '1']
  '3': ['0', '1', '2']
  '4': ['0', '1', '2', '3']
  '5': ['0', '1', '2', '3', '4']
  '6': ['0', '1', '2', '3', '4', '5']
  '7': ['0', '1', '2', '3', '4', '5', '6']
  '8': ['0', '1', '2', '3', '4', '5', '6', '7']
  '9': ['0', '1', '2', '3', '4', '5', '6', '7', '8']
}

type Greater<T, K> = T extends keyof GrateList ? K extends GrateList[T][number] ? true : false : never
type G = Greater<'5', '1'>
//   ^?

type MapString<T extends string> = `${T}` extends `${infer HEAD}${infer TAIL}` ? [HEAD, ...MapString<TAIL>] : []

type M = MapString<'100'>
//   ^?

type NumberLength<T extends number> = MapString<`${T}`>['length']

// 两个长度相同的数字字符串的数组
type Compare<T extends string[], K extends string[]> = T extends [infer FH, ...infer FT extends string[]] ?
  K extends [infer KH, ...infer KT extends string[]] ?
    Greater<FH, KH> extends true ? true
      : Compare<FT, KT>
    : false
  : false

type GreaterThan<T extends number, U extends number> =
  // 如果位数比后一位多那么返回true
  Greater<`${NumberLength<T>}`, `${NumberLength<U>}`> extends true ?
    true
  // 如果小于后一位 那么直接返回false
    : Greater<`${NumberLength<U>}`, `${NumberLength<T>}`> extends true ? false
    // 如果相等,就挨个比大小
      : Compare<MapString<`${T}`>, MapString<`${U}`>>

type C5 = GreaterThan<11, 110>
//   ^?

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4425/answer/zh-CN
  > 查看解答：https://tsch.js.org/4425/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
