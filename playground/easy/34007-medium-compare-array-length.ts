/*
  34007 - Compare Array Length
  -------
  by alviner (@ScriptBloom) #中等 #recursion #array

  ### 题目

  Implement `CompareArrayLength` to compare two array length(T & U).

  If length of T array is greater than U, return 1;
  If length of U array is greater than T, return -1;
  If length of T array is equal to U, return 0.

  > 在 Github 上查看：https://tsch.js.org/34007/zh-CN
*/

/* _____________ 你的代码 _____________ */

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

type CompareArrayLength<T extends any[], U extends any[]> = Equal<T['length'], U['length']> extends true ? 0 : GreaterThan<T['length'], U['length']> extends true ? 1 : -1

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/34007/answer/zh-CN
  > 查看解答：https://tsch.js.org/34007/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
