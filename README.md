![alt text](https://github.com/fabiose81/things-to-do/blob/master/things-to-do.jpg?raw=true)

### For ChatGpt and DataBase
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
