/*
  35045 - Longest Common Prefix
  -------
  by Tom Cleary (@thomcleary) #中等

  ### 题目

  ### Longest Common Prefix

  Write a type, `LongestCommonPrefix` that returns the longest common prefix string amongst a tuple of strings.

  If there is no common prefix, return an empty string `""`.

  ```ts
  type Common = LongestCommonPrefix<["flower", "flow", "flight"]>
  //   ?^ "fl"

  type Uncommon = LongestCommonPrefix<["dog", "racecar", "race"]>
  //   ?^ ""
  ```
  Inspired by [LeetCode 14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/description/)

  > 在 Github 上查看：https://tsch.js.org/35045/zh-CN
*/

/* _____________ 你的代码 _____________ */

type LongestCommonPrefix<T extends string[], P extends string = ''> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LongestCommonPrefix<['flower', 'flow', 'flight']>, 'fl'>>,
  Expect<Equal<LongestCommonPrefix<['dog', 'racecar', 'race']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', 'a', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', 'a', 'a']>, 'a'>>,
  Expect<Equal<LongestCommonPrefix<['abc', 'abcd', 'abcde']>, 'abc'>>,
  Expect<Equal<LongestCommonPrefix<[' ', ' ', ' ']>, ' '>>,
  Expect<Equal<LongestCommonPrefix<['type-challenges', 'type-hero', 'typescript']>, 'type'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/35045/answer/zh-CN
  > 查看解答：https://tsch.js.org/35045/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
