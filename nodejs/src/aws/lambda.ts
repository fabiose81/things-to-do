import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { fromIni }  from '@aws-sdk/credential-providers';

export class Lambda {

    client: LambdaClient

    constructor(profile) {
        this.client = new LambdaClient({
            region: process.env.AWS_REGION_NAME,
            credentials: fromIni({ profile })
        });
    }

    async track(action) {
        const payload = { action: action };

        const command = new InvokeCommand({
            FunctionName: process.env.AWS_LAMBDA_FUNCTION,
            InvocationType: "Event",
            Payload: JSON.stringify(payload)
        });

        try {
           await this.client.send(command);   
        } catch (error) {
            console.error("Error invoking Lambda:", error);
        }
    }
}