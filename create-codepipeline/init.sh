echo Installing NPM Dependencies
npm install
echo Input Your AWS Region
read pulumiregion
pulumi config set aws:region $pulumiregion
echo Input Your Pulumi Access Token
read pulumiaccesstoken
pulumi config set --secret pulumi-access-token $pulumiaccesstoken 
