import * as cdk from '@aws-cdk/core';
import * as CdkIamStack from '../lib/cdk-iam-stack-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkIamStack.CdkIamStackStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
