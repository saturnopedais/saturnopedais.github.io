#!/bin/bash

# Check if exactly two arguments are passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 path_to_file1 path_to_file2"
    exit 1
fi

# File paths from arguments
file1="$1"
file2="$2"
output="merged.json"

# Merge the JSON files and remove duplicates based on the Image field
jq -s '.[0] + .[1] | unique_by(.Image)' "$file1" "$file2" > "$output"

echo "Merged JSON written to $output"

