import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class CdkIamStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // The code that defines your stack goes here

    // STEP 1
    
    // Create group
    const group = new iam.Group(this, 'example-group', {
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ReadOnlyAccess'),
      ],
    });

    // Create Managed Policy
    const loggingManagedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
      'CloudWatchReadOnlyAccess',
    );

    // Create Permissions Boundary
    const permissionsBoundary = new iam.ManagedPolicy(
      this,
      'example-permissions-boundary',
      {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.DENY,
            actions: ['sqs:*'],
            resources: ['*'],
          }),
        ],
      },
    );

    // Create User
    const user = new iam.User(this, 'example-user', {
      userName: 'example-user1',
      managedPolicies: [loggingManagedPolicy],
      groups: [group],
      permissionsBoundary,
    });

    // add a managed policy to the user
    // (these are already aws managed policies. You can add your custom policies as well)
    
    user.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
    );

    user.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AWSAppSyncInvokeFullAccess'),
    );

    user.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_ReadOnlyAccess'),
    );

    // create an inline policy
    const inlinePolicy = new iam.Policy(this, 'cloudwatch-logs-policy', {
      statements: [
        new iam.PolicyStatement({
          actions: ['logs:PutLogEvents'],
          resources: ['*'],
        }),
      ],
    });

    // attach the inline policy to the user
    user.attachInlinePolicy(inlinePolicy);

    // now you can deploy by `npm run build && cdk deploy`

    // Step 2
    
    //...rest

    // Adding Permissions to an IAM User after creation in AWS CDK #

    //  add a managed policy to the user

    // user.addManagedPolicy(
    //   iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'),
    // );

  // then again `npm run build && cdk deploy` to deploy
  }
}
