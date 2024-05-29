#!/bin/bash

# Check if exactly two arguments are passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 path_to_file1 path_to_file2"
    exit 1
fi

# File paths from arguments
file1="$1"
file2="$2"
intermediate_output="intermediate_merged.json"
final_output="merged.json"

# Step 1: Merge the JSON files and remove duplicates based on the Image field
jq -s '.[0] + .[1] | unique_by(.Image)' "$file1" "$file2" > "$intermediate_output"

# Step 2: Remove duplicates based on the Name and Brand fields, prioritizing file2 entries
jq 'reduce .[] as $item ({}; .[$item.Name + "|" + $item.Brand] = $item) | to_entries | map(.value)' "$intermediate_output" > "$final_output"

echo "Merged JSON written to $final_output"

# Count the number of items in the final merged JSON
count=$(jq '. | length' "$final_output")
echo "The merged JSON contains $count items."

