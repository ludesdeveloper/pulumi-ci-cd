echo Input Your Pulumi Access Token
read pulumiaccesstoken
pulumi config set --secret pulumi-access-token $pulumiaccesstoken 
