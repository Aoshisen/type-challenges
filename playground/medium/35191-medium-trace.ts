/*
  35191 - Trace
  -------
  by csharpython (@csharpython) #中等

  ### 题目

  The trace of a square matrix is the sum of the elements on its main diagonal.
  However, it's difficult to calculate the sum with type system.
  To make things simple, let's return the elements on the main diagonal with union type.


  For example:

  ```ts
  type Arr = [
    [1,2],
    [3,4]
  ]
  type Test = Trace<Arr> // expected to be 1 | 4
  ```

  > 在 Github 上查看：https://tsch.js.org/35191/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Trace<T extends any[][]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trace<[[1, 2], [3, 4]]>, 1 | 4>>,
  Expect<Equal<Trace<[[0, 1, 1], [2, 0, 2], [3, 3, 0]]>, 0>>,
  Expect<Equal<Trace<[['a', 'b', ''], ['c', '', ''], ['d', 'e', 'f']]>, 'a' | '' | 'f'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/35191/answer/zh-CN
  > 查看解答：https://tsch.js.org/35191/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
