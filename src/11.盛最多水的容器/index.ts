function maxArea(height: number[]): number {
  let result = 0
  let left = 0
  let right = height.length - 1
  while (left < right) {
    result = Math.max(
      (right - left) * Math.min(height[right], height[left]),
      result
    )
    if (height[left] >= height[right]) {
      right--
    } else {
      left++
    }
  }
  return result
}
