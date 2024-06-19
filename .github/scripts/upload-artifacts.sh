#!/bin/bash
set -ex

s3_bucket="snark-artifacts"
artifacts=$(ls packages/ | grep -v 'artifacts\|cli')

cd packages
git restore-mtime

for artifact in $artifacts; do
  aws s3 sync $artifact s3://$s3_bucket/$artifact --delete
done

exit 0
