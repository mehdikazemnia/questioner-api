# questioner-api

simple dynamic Q/A api
___
### dependencies
* MongoDB v3.4.12
* NodeJS v8.12.0
___
### node packages
* body-parser v1.18.3
* express v4.16.4
* mongoose v5.3.8
___
### basic dev/prod
1. `npm install` 
  will install mentioned node packages
2. `npm run migrate` 
  will migrate questions from `./app/storage/qustions.json` to questions collection
3. `npm start`
  will start the server on `localhost:3000`
___
### adding questions (developer)
all the questions and their connections are managed from `./app/storage/qustions.json`

all questions have a way to indicate the `next` question, they also have their own `id` and `message`
there's two types of questions
#### 1. "explain" questions
these questions don't have any options, the question is simple "just a message", and the answer would be just a simple text
this type of question is indicated by `kind:0`
these will need have an additional `next` field directly in their document to clearify the next question by `id`
#### 2. "choose" questions
these questions have a simple `message` and a few `options` that user can choose from
this type of question is indicated by `kind:1`
there should be option objects in the `options` field for them...
the option object must have the followings:
1. `kind`: 
    0.text
    1.image
    2.video
    3.audio
2. `src`: 
  if `kind` is `text`, src would just contain the text, but if it's another type src would be the source link to the needed file
3. `next`: 
  this is where you indicate where the user should be headed to after they pick this option, this mechanism will alow you to have different scenarios for users by the different answers they pick
___
### api usage
everything is based on `json`, so you should pass `json` and you'd recieve in the same format.

the entry point would be '/', you'll be given a `token` **you must send it with all POST requests (not GET)**
#### GET usage
get method is used **only to read the questions**, you won't necessarily need to have the token to read the questions, the path to get a question would simply be `/questionId` where questionId is a simple name for each question

each time you POST to server, in your response there will be a `next` key telling you what path to hit next, it will be either a questionId or `/` with a message telling you what's wrong

#### POST usage
post method is used for almost everything, at the beginning you should POST to `/`, you'll recieve a `token` that you sould send with each post request you send



