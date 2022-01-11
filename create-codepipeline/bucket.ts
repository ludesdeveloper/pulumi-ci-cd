import * as aws from "@pulumi/aws";

export const exampleBucket = new aws.s3.Bucket("exampleBucket", {
    acl: "private",
    forceDestroy: true
});


