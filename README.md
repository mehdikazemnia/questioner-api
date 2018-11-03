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
2. `npm setup` 
  will migrate questions from `./app/storage/qustions.json` to questions collection
3. `npm start`
  will start the server on `localhost:3000`
___
### adding questions
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
1. `kind`
    0.text
    1.image
    2.video
    3.audio
2. `src`
  if `kind` is `text`, src would just contain the text, but if it's another type src would be the source link to the needed file
3. `next`
  this is where you indicate where the user should be headed to after they pick this option, this mechanism will alow you to have different scenarios for users by the different answers they pick




