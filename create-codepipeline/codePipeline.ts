import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { exampleBucket } from "./bucket"
import { codeCommit } from "./codeCommit"
import { exampleProject } from "./codeBuild"


const codepipelineRole = new aws.iam.Role("codepipelineRole", {
    assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
export const debugCodeCommitOutput = codeCommit.arn

export const codepipeline = new aws.codepipeline.Pipeline("codepipeline", {
    roleArn: codepipelineRole.arn,
    artifactStore: {
        location: exampleBucket.bucket,
        type: "S3",
    },
    stages: [
        {
            name: "Source",
            actions: [{
                name: "Source",
                category: "Source",
                owner: "AWS",
                provider: "CodeCommit",
                version: "1",
                outputArtifacts: ["source_output"],
                configuration: {
                    // ConnectionArn: codeCommit.arn,
                    // FullRepositoryId: codeCommit.id,
                    RepositoryName: codeCommit.repositoryName,
                    BranchName: "master",
                },
            }],
        },
        {
            name: "Build",
            actions: [{
                name: "Build",
                category: "Build",
                owner: "AWS",
                provider: "CodeBuild",
                inputArtifacts: ["source_output"],
                outputArtifacts: ["build_output"],
                version: "1",
                configuration: {
                    ProjectName: exampleProject.arn,
                },
            }],
        },
    ],
});
const codepipelinePolicy = new aws.iam.RolePolicy("codepipelinePolicy", {
    role: codepipelineRole.id,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "${exampleBucket.arn}",
        "${exampleBucket.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codecommit:*",
        "codecommit:GetUploadArchiveStatus"
      ],
      "Resource": "${codeCommit.arn}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
`,
});
export const codePipelinePolicyOutput = codepipelinePolicy.policy

