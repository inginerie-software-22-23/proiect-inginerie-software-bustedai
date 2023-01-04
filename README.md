# proiect-inginerie-software-bustedai
proiect-inginerie-software-bustedai created by GitHub Classroom


# Link Sprint Planner
[Sprint Planner for bustedAI project](https://docs.google.com/spreadsheets/d/16vLLRd1A86IMXz-6o4SOA034RU-AbtB7rw2PQL5WCJE/edit#gid=0)

# Link Project Chart
[Project Chart](https://docs.google.com/document/d/1VCJf-GGZD8LIGYsz41iVwcwmNcKJWqzs1Unu8eLc69c/edit?amp%3Busp=embed_facebook)


# Link Problem Statement
[Problem Statement](https://docs.google.com/document/d/1TZzNgOfmmYbAetV1EVqiXQN3iuhumcBcCAhJzQYMF8Y/edit)

# busted AI Endpoints

### Auth
| Operation | Route                                     | Description           | Authorization | Request Body                                                                                       | Response Body                                                                        |
|-----------|-------------------------------------------|-----------------------|---------------|----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| POST      |{{api_url}}/api/Auth/register | Createa a new user    | -        | {<br>"userName": "string",<br>"email": "string",<br>"password": "string",<br>"role": "string"<br>} | -Registered<br>-Email already used<br>-Username already used<br>-Error at register       |
| POST      | {{api_url}}/api/Auth/login    | Login                 | -             | {<br>"email": "string",<br>"password": "string"<br>}                                               | {<br>  "success": bool,<br>  "accessToken": string,<br>  "refreshToken": string<br>} |
| POST      | {{api_url}}/api/Auth/refresh  | Get the refresh token | -             | {<br>  "accessToken": "string",<br>  "refreshToken": "string"<br>}                                 | refreshToken                                                                         |

### Users
| Operation | Route                                             | Parameter  | Authorization | Request Body | Response Body |
|-----------|---------------------------------------------------|---------------|---------------|--------------|---------------|
| GET       | {{api_url}}/api/User/getAllUsers |  | Admin         |      -       |       -       |
| DELETE    | {{api_url}}/api/User/removeUser    |                | -             | {<br>"userName":"string"<br>} |
| GET    | {{api_url}}/api/User/emailExist    |   email               | -             | |false/true |
| GET    | {{api_url}}/api/User/usernameExist    |   username               | -             |  |false/true |

