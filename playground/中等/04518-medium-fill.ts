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
// 获取指定 数组的前N 个N 超过当前数组的最大长度，那么返回原数组
type PickStart<T extends unknown[], K extends number, P extends unknown[] = []> =
  // 如果当前的 长度满足了K
  P['length'] extends K ?
  // 返回K
    P :
  // 取出当前元素后面的数组元素，进入下一次循环
    T extends [infer HEAD, ...infer TAIL] ?
    // 并把当前项加入到下一次循环的开头
      PickStart<TAIL, K, [...P, HEAD]> :
    // 如果循环到了最后一次把之前循环叠加的原数组返回
      P

type P1 = PickStart<[1, 2, 3], 4>
//   ^?

// 获取 start 和 end 中间的数组的值
type PickIn<T extends unknown[], Start extends number = 0, End extends number = T['length']> =
  // 正常情况下，End 通常会包含 Start
  PickStart<T, End> extends [...PickStart<T, Start>, ...infer EndArray] ?
    EndArray :
      []
type P2 = PickIn<[1, 2, 3], 0, 1>
//   ^?

type PickEnd<T extends unknown[], Start extends number = 0, End extends number = T['length']> =
  // 排除掉 PickStart + PickIn 的 T 数组就是 剩余的数组了
  T extends [...PickStart<T, Start>, ...PickIn<T, Start, End>, ...infer EndArray] ?
    EndArray :
      []
type P3 = PickEnd<[1, 2, 3, 4], 2, 3>
//   ^?

type FillWith<T extends unknown[], K, P extends unknown[] = []> = P['length'] extends T['length'] ? P
  : FillWith<T, K, [...P, K]>
type P4 = FillWith<[], 6>
//   ^?

type Fill<
  // 需要替换的数组
  T extends unknown[],
  // 替换的值
  N,
  // 替换的起始位置
  Start extends number = 0,
  // 替换的结束位置
  End extends number = T['length'],
> = [...PickStart<T, Start>, ...FillWith<PickIn<T, Start, End>, N>, ...PickEnd<T, Start, End>]
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
