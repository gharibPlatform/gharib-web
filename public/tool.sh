#!/bin/bash

# Directory to start the search
DIR="./"  # Change this to specify a different directory

# Function to update text in each JSX file
process_file() {
  local file="$1"
  # Use sed to replace the prefixes in the XML namespaces
  sed -i -E 's/(xmlns:)([a-zA-Z])([a-zA-Z]*)/\1\U\2\L\3/g; s/(xmlns:)([a-zA-Z]+)/xmlns\U\2/g' "$file"
}

# Iterate over JSX files in the directory
find "$DIR" -type f -name '*.jsx' | while read -r file; do
  # Process each JSX file to make replacements
  process_file "$file"
done

echo "Replacement complete."
