cd ../create-codepipeline
codecommitrepo=$(pulumi stack output codeCommitOutput)
echo $codecommitrepo
cd ../push-to-codecommit
git remote add origin $codecommitrepo
