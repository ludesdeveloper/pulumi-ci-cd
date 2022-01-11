import * as aws from "@pulumi/aws";

export const codeCommit = new aws.codecommit.Repository("CodeCommit", {
    description: "This is the CodePipeline Pulumi Repository",
    repositoryName: "codepipeline-pulumi",
});
