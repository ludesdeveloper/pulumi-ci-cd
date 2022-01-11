import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { exampleBucket } from "./bucket"
import { codeCommit } from "./codeCommit"


const exampleRole = new aws.iam.Role("exampleRole", {
    assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const exampleRolePolicy = new aws.iam.RolePolicy("exampleRolePolicy", {
    role: exampleRole.name,
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs",
        "ssm:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": ["*"]
    }
  ]
}
`,
});
export const exampleRolePolicyOutput = exampleRolePolicy.id
const config = new pulumi.Config();
export const exampleProject = new aws.codebuild.Project("exampleProject", {
    description: "test_codebuild_project",
    buildTimeout: 5,
    serviceRole: exampleRole.arn,
    artifacts: {
        type: "NO_ARTIFACTS",
    },
    cache: {
        type: "S3",
        location: exampleBucket.bucket,
    },
    environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/standard:3.0",
        type: "LINUX_CONTAINER",
        imagePullCredentialsType: "CODEBUILD",
        environmentVariables: [
            {
                // please remove this secret
                name: "PULUMI_ACCESS_TOKEN",
                value: config.requireSecret('pulumi-access-token'),
            },
        ],
    },
    logsConfig: {
        cloudwatchLogs: {
            groupName: "log-group",
            streamName: "log-stream",
        },
        s3Logs: {
            status: "ENABLED",
            location: pulumi.interpolate`${exampleBucket.id}/build-log`,
        },
    },
    source: {
        type: "CODECOMMIT",
        location: codeCommit.repositoryName,
        gitCloneDepth: 1,
        gitSubmodulesConfig: {
            fetchSubmodules: true,
        },
    },
    sourceVersion: "master",
    tags: {
        Environment: "Test",
    },
});


