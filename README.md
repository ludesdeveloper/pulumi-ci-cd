# **PULUMI CI CD**
### **Design Architecture**
![CI CD Design Architecture](images/Pulumi.png)
### **Requirement**
1. [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)
3. [Pulumi installed](https://www.pulumi.com/docs/get-started/install/)
4. [Pulumi logged in](https://www.pulumi.com/docs/reference/cli/pulumi_login/)
### **How To**
1. Clone repository 
```
git clone https://github.com/ludesdeveloper/pulumi-ci-cd.git
```
2. Change directory
```
cd pulumi-ci-cd
```
### **Create CodeCommit, CodeBuild, And CodePipeline**
1. Change directory
```
cd create-codepipeline
```
2. Execute initialization script
```
./init.sh
```
3. Script will ask for region, please type and hit enter
4. Script will ask for pulumi token, please provide [Access Token](https://www.pulumi.com/docs/intro/console/accounts/#creating-access-tokens) 
5. Execute pulumi up
```
pulumi up
```
6. After success you can take a look output for **codeCommitOutput** (this is your repo in codecommit), save it, we will use it later
### **Push Pulumi Code to Repository**
> This code will create new s3 bucket if CI CD success
1. Change directory to **push-to-codecommit**
2. Initialize git, and push to repo (Before you do this, you need to remove .git folder in root directory)
