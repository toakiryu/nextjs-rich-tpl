#!/bin/bash

echo "Cleaning up unnecessary files..."

# Remove root-level files and directories
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

# Clean up each example template
for dir in templates/*; do
    if [ -d "$dir" ]; then
        echo "Cleaning $dir..."
        for tpl_dir in $dir/*; do
            if [ -d "$tpl_dir" ]; then
                echo "Cleaning $tpl_dir..."
                rm -rf -v "$tpl_dir/.next"
                rm -rf -v "$tpl_dir/node_modules"
                rm -f -v "$tpl_dir/package-lock.json"
            else
                echo "Skipping $tpl_dir (not a template)"
            fi
        done
    else
        echo "Skipping $dir (not a directory)"
    fi
done

echo "Cleanup completed."
