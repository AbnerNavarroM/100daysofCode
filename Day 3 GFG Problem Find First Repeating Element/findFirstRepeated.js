// PROBLEM DESCRIPTION

// Given an array arr[] of size n, find the first repeating element. 
// The element should occurs more than once and the index of its first occurrence should be the smallest.

// The task: 
// Complete the function firstRepeated() which takes arr and n as input parameters and return the position
// of the first repeating element. If there is no such element, return -1.
// The position you return should be according to 1 - based indexing. 

class Solution {
    // Function to return the position of the first repeating element.
    firstRepeated(arr, n) {
        // your code here
        let hMap = new Map()
        let min = -1
        for (let i = 0; i < n; i++) {
            if (hMap.has(arr[i])) {
                if (min === -1) min = n
                let index = hMap.get(arr[i])
                if (index < min) min = index
            } else {
                let index = i + 1
                hMap.set(arr[i], index)
            }
        }
        return min
    }
}