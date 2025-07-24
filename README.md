https://github.com/user-attachments/assets/38ed5817-4aa5-42af-821d-424486be256b

https://github.com/user-attachments/assets/9f7f0408-20c6-45ec-806d-6efb34369423

![alt text](https://github.com/fabiose81/things-to-do/blob/master/things-to-do.jpg?raw=true)

### For ChatGpt, DataBase and AWS 
    In nodejs folder create a file .env and insert:

    SERVER_PORT = 4000 

    MONGODB_HOST = localhost
    MONGODB_PORT = 7017
    MONGODB_DB = suggestions

    OPENAI_API_KEY =  {your api key}
    CHAT_GPT_MODEL = gpt-4o
    CHAT_GPT_MESSAGE_CONTENT = Bucket list of ideas to do before die if the person is %age years old. Give me the max of things possible to do in a json  
    array like : { "bucketList" : [{"name":"name", "description":"description", "age": "age"}]}. In the field age give to me only the age that was requested 
    in the prompt.

    AWS_REGION_NAME = us-east-1
    AWS_LAMBDA_FUNCTION = trackUserAction
    AWS_PROFILE = nodejs //Profile created in .aws/credentias to set aws_access_key_id and aws_secret_access_key 

    Ex: [nodejs]
        aws_access_key_id = {your key id}
        aws_secret_access_key = {your access key}
    
### For Docker(MongoDB)
    docker compose -f docker-compose.yml up -d --build

### For Nodejs
    To compile the code:
      npx tsc
      
    To run project:
      npm start

### For React
    To run gulp:
      gulp
      
    To run project:
      npm start
