
## @surihoney/time-ago

[![npm version](https://img.shields.io/npm/v/@surihoney/time-ago.svg)](https://www.npmjs.com/package/@surihoney/time-ago)

A zero-dependency TypeScript utility to convert timestamps into human-readable "time ago" strings. It’s a lightweight alternative to heavy date libraries.

### Installation

```
npm install @surihoney/time-ago
```

### Usage

```
import { timeAgo } from '@surihoney/time-ago';

// 1. Basic numeric usage
console.log(timeAgo(Date.now() - 60000));
// Output: "1 minute ago"

// 2. Using "words" style (English words for numbers 1-10)
console.log(timeAgo(Date.now() - 3600000, { numberStyle: 'words' })); 
// Output: "one hour ago"

// 3. Custom "just now" label
console.log(timeAgo(Date.now() - 2000, { justNow: 'Right now' })); 
// Output: "Right now"


```

## ⚙️ Output Reference

The library automatically calculates the best unit for readability based on the difference between the input and "now":


| Time Difference | Output Example (Numeric) | Output Example (Words) |
| :--- | :--- | :--- |
| < 5 seconds | "just now" | "just now" |
| 5 - 59 seconds | "45 seconds ago" | "forty-five seconds ago" |
| 1 - 59 minutes | "15 minutes ago" | "fifteen minutes ago" |
| 1 - 23 hours | "3 hours ago" | "three hours ago" |
| 1 - 6 days | "2 days ago" | "two days ago" |
| 1 - 4 weeks | "1 week ago" | "one week ago" |
| 1 - 11 months | "5 months ago" | "five months ago" |
| > 1 year | "2 years ago" | "two years ago" |


> **Note:** When using `{ numberStyle: "words" }`, the library typically converts numbers 1 through 10 into English words.

