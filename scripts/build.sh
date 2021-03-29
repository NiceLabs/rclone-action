#!/bin/bash
export PATH="$(npm bin):$PATH"
set -x
ncc build -m src/on-main.ts -o dist/main
ncc build -m src/on-post.ts -o dist/post
git add dist
