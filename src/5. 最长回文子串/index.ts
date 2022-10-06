/**
 * leetCode链接：https://leetcode.cn/problems/longest-palindromic-substring/
 */
//  给你一个字符串 s，找到 s 中最长的回文子串。

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

/**
 * 方式1：暴力解法
 * 1. 首先我们要把s字符串里面的所有有可能的子串取出来，这个复杂度就是O(n^2)。
 * 2. 然后把取出来的子串进行判断，是否是回文串。然后判断是不是最长。判断回文串的过程需要O(n)
 * 3. 所以，暴力解法最差的情况下，时间复杂度是O(n^3)。空间复杂度是O(1)。
 */
// function longestPalindrome(s: string): string {
//   const len = s.length
//   let maxLen = 0
//   let result = ''
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j <= i; j++) {
//       // 每次的子串是s[j]~s[i]
//       const subStr = s.substring(j, i + 1)
//       //   然后判断subStr是否是回文串
//       if (
//         subStr.split('').reverse().join('') === subStr &&
//         i - j + 1 > maxLen
//       ) {
//         maxLen = i - j + 1
//         result = subStr
//       }
//     }
//   }
//   return result
// }

/**
 * 方式2：动态规划
 * 暴力解法的时间复杂度过高。
 * 1. 判断一个字符串s[i...j]是否是回文串，只需要满足：s[i]==s[j]&&s[i+1...j-1]也是回文串
 * 2. 但是我们还是得把每次的字符串给拿到，并且把是否是回文串的结果存起来。
 * 3. 当`abba`字符串进行判断的时候，我们只需要判断s[0]==s[3]&&s[1..2]是回文串。
 *   3.1 我们如何知道s[1...2]是回文串？答案就是当遍历字符串`abb`的时候，会取到字符串`bb`的情况,这个时候我们只需要判断`bb`是否是回文串就可以。
 *   3.2 所以，`abba`字符串高度依赖之前的是否是回文串的判断结果。
 * 4. 动态规划显然只是减少了判断一个字符串是否是回文的时间复杂度。所以它的时空复杂度都是O(n^2)。
 * 5. 这里面有一个很重要动态规划的知识：也就是大问题化解成小问题。但是这个小问题一定要在大问题来临之前解决掉。
 *    一般来说，对于遍历的话，就是用数组或者map将之前的结果存起来。而且一般是要把所有情况的结果都给存起来。
 *    对于递归也是如此。
 */

// function longestPalindrome(s: string): string {
//   const len = s.length
//   let maxLen = 1
//   let begin = 0
//   /**
//    * dp表示某一个字符串是否是回文串的二维数组。第一维表示开始索引，第二维维度结束索引
//    * 首先：相同的字符串肯定是回文，也就是索引相同。
//    */
//   const dp = new Array(len)
//   for (let n = 0; n < dp.length; n++) {
//     dp[n] = new Array(len).fill(false)
//     dp[n][n] = true
//   }
//   for (let i = 1; i < len; i++) {
//     for (let j = 0; j <= i; j++) {
//       // 这样遍历，就是可以知道s[j...i]的字符串是否是回文
//       if (s[i] !== s[j]) {
//         dp[j][i] = false
//       } else {
//         // 表示j,i之间只有一个数字
//         if (i - j < 3) {
//           dp[j][i] = true
//         } else {
//           dp[j][i] = dp[j + 1][i - 1]
//         }
//       }
//       if (dp[j][i] && i - j + 1 > maxLen) {
//         maxLen = i - j + 1
//         begin = j
//       }
//     }
//   }
//   return s.substring(begin, begin + maxLen)
// }

/**
 * 方式3：中心扩散法
 * 1. 遍历字符串，将字符串的每一个或者每两个为中心，往外扩散。得到最长的就行了。
 * 2. 这里有个小技巧：得到长度后，len如果是偶数，说明有两个中心，那么start就需要少一个，如果是奇数，start就少一个就刚好。
 * end的话，不管是偶数还是奇数，只要长度除以2就可以了。
 */
function longestPalindrome(s: string): string {
  const len = s.length
  let start = 0
  let end = 0
  for (let i = 0; i < len; i++) {
    const len1 = expandAroundCenter(s, i, i)
    const len2 = expandAroundCenter(s, i, i + 1)
    const len = Math.max(len1, len2)
    if (len > end - start + 1) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)
}

function expandAroundCenter(s: string, left: number, right: number) {
  let len = 0
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    len = right - left + 1
    left--
    right++
  }
  return len
}

const result = longestPalindrome('xaabacxcabaaxcabaax')
console.log(result)
