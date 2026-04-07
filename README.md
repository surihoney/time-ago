A zero-dependency TypeScript utility to convert timestamps into human-readable "time ago" strings. It’s a lightweight alternative to heavy date libraries.

###Usage

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

