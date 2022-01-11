echo Installing NPM Dependencies
npm install
echo Input Your AWS Region
read pulumiregion
pulumi config set aws:region $pulumiregion
