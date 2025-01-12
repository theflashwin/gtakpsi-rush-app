#!/bin/bash

# List of commands
commands=(
    "cd client"
    "npm run deploy"
    "cd ../"
    "cd server"
    "cargo lambda build --release"
    "cargo lambda deploy --enable-function-url server"
)

for cmd in "${commands[@]}"
do
    echo "Executing: $cmd"
    eval $cmd
done
