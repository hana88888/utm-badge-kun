// basics.js
import { Iterator } from 'node:iterator';

// ES2025 の Iterator Helpers を試す
const result = Iterator.from([1,2,3])
                     .map(x => x * 2)
                     .filter(x => x > 2)
                     .toArray();
console.log(result); //→ [4,6]
