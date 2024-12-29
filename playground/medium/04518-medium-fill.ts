/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #中等 #tuple

  ### 题目

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > 在 Github 上查看：https://tsch.js.org/4518/zh-CN
*/
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Ret extends unknown[] = [],
  Prev extends boolean = false,
  // use this to mark whether we shall Fill
  // we seperate T to three segments [ ...Not fill, ...Fill, ...Not fill ]
  // initially we do not fill,
  // when we see Start, we set DoFill to true
  // and preserve this state, until we see Ret
  DoFill extends boolean = Prev extends true
    ? Ret['length'] extends End
      ? false
      : Prev
    : Ret['length'] extends Start
      ? Ret['length'] extends End ? false : true // in case End == Start
      : Prev,
> = Ret['length'] extends T['length'] ? Ret
  : Fill<T, N, Start, End, [...Ret, DoFill extends true ? N : T[Ret['length']]], DoFill>
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4518/answer/zh-CN
  > 查看解答：https://tsch.js.org/4518/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
