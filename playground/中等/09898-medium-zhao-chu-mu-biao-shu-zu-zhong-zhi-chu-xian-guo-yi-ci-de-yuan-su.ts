/*
  9898 - 找出目标数组中只出现过一次的元素
  -------
  by X.Q. Chen (@brenner8023) #中等

  ### 题目

  找出目标数组中只出现过一次的元素。例如：输入[1,2,2,3,3,4,5,6,6,6]，输出[1,4,5]

  > 在 Github 上查看：https://tsch.js.org/9898/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Includes<T extends readonly unknown[], U> = T extends [infer Head, ...infer Tail]
  ? Equal<Head, U> extends true
    ? true
    : Includes<Tail, U>
  : false

type FindEles<T extends unknown[], Prev extends unknown[] = [], Current = T[0], Find extends unknown[] = [], K extends unknown[] = T> =
  T extends [...Prev, Current, ...infer TAIL extends number[]] ?
    Includes<[...Prev, ...TAIL], Current> extends true ?
    // 如果当前值不唯一,不做任何事开启下次循环
      FindEles<K, [...Prev, Current], TAIL[0], Find>
    // 那么添加到Finded 里面 进入下次循环
      :
      FindEles<K, [...Prev, Current], TAIL[0], [...Find, Current]>
  // 循环结束返回存储的Find
    : Find

type Case1 = FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>
//     ^?
type Case2 = FindEles<[1, 2, number]>
//     ^?

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9898/answer/zh-CN
  > 查看解答：https://tsch.js.org/9898/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
