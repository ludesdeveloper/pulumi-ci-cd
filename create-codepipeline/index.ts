import { exampleBucket } from "./bucket"
import { codeCommit } from "./codeCommit"
import { exampleProject } from "./codeBuild"
import { codepipeline } from "./codePipeline"

export const exampleBucketOutput = exampleBucket.arn
export const codeCommitOutput = codeCommit.repositoryName
export const exampleProjectOutput = exampleProject.arn
export const codePipelineOutput = codepipeline.arn


