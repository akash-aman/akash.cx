const fs = require('fs');
const path = 'src/generated/graphql.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace gql import
content = content.replace("import { gql } from '@apollo/client';", "import gql from 'graphql-tag';");
// Remove Apollo import
content = content.replace("import * as Apollo from '@apollo/client';", "");

const lines = content.split('\n');
const newLines = [];
let skip = false;

for (const line of lines) {
    const trimmed = line.trim();
    
    // Start of a hook function (implementation or overload)
    if (trimmed.startsWith('export function use')) {
        // If it's an implementation (ends with {), start skipping
        if (trimmed.endsWith('{')) {
            skip = true;
        }
        // If it's an overload (ends with ;), just skip this line
        continue; 
    }
    
    // End of a hook function
    if (skip && trimmed === '}') {
        skip = false;
        continue;
    }
    
    // Skip lines inside the block
    if (skip) {
        continue;
    }
    
    // Remove Result types
    if (trimmed.startsWith('export type') && (trimmed.includes('Result = Apollo.') || trimmed.includes('HookResult = ReturnType<typeof'))) {
        continue;
    }
    
    // Remove @ts-ignore
    if (trimmed === '// @ts-ignore') {
        continue;
    }

    newLines.push(line);
}

fs.writeFileSync(path, newLines.join('\n'));
console.log('Successfully cleaned graphql.ts');
