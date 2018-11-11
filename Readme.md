# Slack / bot

# AWS

## Role (not sure if I even use the role)

The used role needs this Trust Relationship:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "apigateway.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## Policies

Additionally to:

* AmazonS3FullAccess
* AmazonAPIGatewayAdministrator
* AWSCodeDeployRoleForLambda

I added a custom policy with (replace USER-ID with yours)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1541950102000",
      "Effect": "Allow",
      "Action": [
        "cloudformation:CreateStack",
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStackResource",
        "cloudformation:ValidateTemplate",
        "cloudformation:UpdateStack",
        "iam:GetRole",
        "lambda:GetFunctionConfiguration"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Sid": "Stmt1541953328000",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:DeleteRolePolicy",
        "iam:PutRolePolicy",
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::USER-ID:role/slack-orbo-dev-eu-central-1-lambdaRole"
      ]
    },
    {
      "Sid": "Stmt1541950102002",
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:CreateLogGroup",
        "logs:DeleteLogGroup"
      ],
      "Resource": [
        "arn:aws:logs:eu-central-1:USER-ID:log-group:*"
      ]
    },
    {
      "Sid": "Stmt1541950102003",
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunction",
        "lambda:CreateFunction",
        "lambda:DeleteFunction",
        "lambda:ListVersionsByFunction",
        "lambda:AddPermission",
        "lambda:RemovePermission",
        "lambda:PublishVersion",
        "lambda:UpdateFunctionCode",
        "lambda:ListTags",
        "lambda:UpdateFunctionConfiguration"
      ],
      "Resource": [
        "arn:aws:lambda:eu-central-1:USER-ID:function:slack-orbo*"
      ]
    }
  ]
}
```

# Next Up

Integrate Calendar: https://developers.google.com/calendar/quickstart/nodejs