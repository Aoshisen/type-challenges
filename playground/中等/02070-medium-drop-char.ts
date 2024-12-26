/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #中等 #template-literal #infer

  ### 题目

  从字符串中剔除指定字符。

  例如：

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > 在 Github 上查看：https://tsch.js.org/2070/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 两种情况, 空或者是空格 dropEmpty, 另一种,drop string,

type DropChar<S extends string, C extends string, L extends string = ''> =
  S extends `${infer HEAD}${infer TAIL}` ?
    HEAD extends C ?
      C extends ' ' | '' ?
  `${L}${DropChar<TAIL, C, L>}`
        : `${L}${DropChar<TAIL, C, L>}`
      : `${L}${HEAD}${DropChar<TAIL, C, L>}`
    : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2070/answer/zh-CN
  > 查看解答：https://tsch.js.org/2070/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
