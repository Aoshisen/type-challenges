/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #中等 #arguments

  ### 题目

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > 在 Github 上查看：https://tsch.js.org/3196/zh-CN
*/

/* _____________ 你的代码 _____________ */
type Flip<T extends any[]> = T extends [infer F, ...infer Rest] ? [...Flip<Rest>, F] : []
type FlipArguments<T extends (...args: any) => any> = T extends (...args: infer A) => infer R ? (...args: Flip<A>) => R : unknown
type F = Parameters<(arg0: string, arg1: number, arg2: boolean) => number>
//   ^?
// 你提到的 [arg0: string] 是在代码中给定参数名称的情况下 TypeScript 的行为。实际上，Parameters 不关心参数的名称，而是提取了参数的类型。函数的参数名称（如 arg0）并不影响类型本身，Parameters 只关心类型，
type C = Flip<F>
//   ^?
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3196/answer/zh-CN
  > 查看解答：https://tsch.js.org/3196/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
