#!/bin/bash
set -ex

s3_bucket="snark-artifacts"
artifacts=$(ls packages/ | grep -v 'artifacts\|cli')

cd packages
git restore-mtime

for artifact in $artifacts; do
  package_version=$(jq -r '.version' "$artifact/package.json")
  aws s3 sync $artifact s3://$s3_bucket/$artifact/$package_version --delete
done

exit 0
