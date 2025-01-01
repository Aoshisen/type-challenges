/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #中等 #template-literal #string

  ### 题目

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > 在 Github 上查看：https://tsch.js.org/21104/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ToArray<T> = T extends `${infer HEAD}${infer TAIL}` ? [HEAD, ...ToArray<TAIL>] : []
type Length<T extends string> = ToArray<T>['length']

// 思路,循环当前的字符串数组, 通过附加的prev字符串,确定当前位置 后的 字符串,如果后续字符串满足 P 为开头的序列那么加入到Result 数组中, 如果 不满足,就不假如序列,同时这两种情况完成后都会进入下次的循环,把当前的字符串假如到prev 的末尾,当前字符串减去头部
type FindAll<T extends string, P extends string, Prev extends string = '', Result extends unknown[] = []> =
  P extends '' ? []
    :
    T extends `${infer Current extends string}${infer TAIL}` ?
    // 如果符合条件
      T extends `${P}${string}` ?
        FindAll<TAIL, P, `${Prev}${Current}`, [...Result, Length<Prev>]> :
        FindAll<TAIL, P, `${Prev}${Current}`, Result> :
      Result

type Case1 = FindAll<'Collection of TypeScript type challenges', 'Type'>
//    ^?

type Case2 = FindAll<'Collection of TypeScript type challenges', 'pe'>
//    ^?
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/21104/answer/zh-CN
  > 查看解答：https://tsch.js.org/21104/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
