class Solution {
    countDistinct(A, n, k) {
        let records = [];
        for (let i = 0; i < n; i++) {
            let hMap = new Map();
            if (!hMap.has(A[i])) {
                hMap.set(A[i], i)
            }
            if (i + (k - 1) <= n - 1) {
                for (let j = i + 1; j < k; j++) {
                    if (!hMap.has(A[j])) {
                        hMap.set(A[j], i)
                    }
                }
                records.push(hMap);
            }
        }

        let answer = [];
        for (let i = 0; i < records.length; i++) {
            answer.push(records[i].size)
        }

        return answer.length > 0 ? answer : 0;
    }
}

let s = new Solution();
console.log(s.countDistinct([1, 2, 1, 3, 4, 2, 3], 7, 4));