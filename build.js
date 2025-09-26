#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting build process...');

// Build the Next.js app
console.log('Building Next.js app...');
execSync('cd apps/web && npm run build', { stdio: 'inherit' });

console.log('Build complete! Output in apps/web/out');