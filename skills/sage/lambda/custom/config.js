const rp = require('request-promise');
const _ = require("lodash");

const intents = [
    {
      "name": "CommandList",
      "samples": [
        "list commands",
        "what I can ask",
        "what he can do",
        "what she can do",
        "what he can answer",
        "what she can answer",        
        "to list commands",
        "what commands",
        "to tell me command list",
        "to tell me what commands",
      ],
      "response": ({config}) => {
        const commands = _.tail(config.intents).map((i) => i.samples[0]).join('. ');
        return Promise.resolve(`Here is a list of the commands you can ask me.  ${commands}`);
      }
    },  
    {
        "name": "WhoIsSoGoodIntent",
        "samples": [
          "who is so good",
          "who is soo good",
          "tell me who is soo good",
          "tell who is so good"
        ],
        "response": `<prosody rate="fast">miss pie</prosody> is <prosody rate="x-slow"><emphasis level="strong">so good</emphasis></prosody><break time="500ms"/><prosody rate="fast">miss pie</prosody> is <prosody rate="x-slow"><emphasis level="strong">so good</emphasis></prosody>`
      },        
      {
        "name": "GetNewFactIntent",
        "samples": [
          "tell me about Mrs. Messah",
          "i would like to learn about mrs. messah",
          "i'd like to learn something about mrs. messah"
        ],
        "response": "A long long time ago, in the African continent, a little girl was born. Her name was Carol. Carol always wanted to be a ballerina from the moment she learned about them. She grew up and did not want to live in Africa anymore so she decided to move to America. Once she moved, she did not like her skin color so she got whiteout and put it all over herself. She still wanted to become a ballerina but she couldn\'t pay her taxes. Because of this, she became a grumpy old librarian at Corpus Christi School."
      },
      {
        "name": "BestHacker",
        "samples": [
          "who is the best hacker",
          "tell me who is the best hacker",
          "who is the greatest hacker",
          "tell me who is the greatest hacker",
        ],
        "response": `Wyatt File is currently known to be the greatest hacker of all time.  His hacking experience spans, but is not limited to.  Roblox, minecraft, farming simulator, web pages, and many more. <amazon:effect name="whispered">wait!  what?  I think he's hacking me now.  gotta go!</amazon:effect>`
      },      
      {
        "name": "BestFootballPlayer",
        "samples": [
          "who is the best football player",
          "tell me who is the best football player",
          "who is the greatest football player",
          "tell me who is the greatest football player",
        ],
        "response": `Max File of course!  He can throw perfect spirals.  He can catch any pass.  He can kick the ball to the moon! And he's the hardest tackler out there. <amazon:effect name="whispered">be sure to wear your helmet and pads if you ever play with him</amazon:effect>`
      },
      {
        "name": "BestLibrarian",
        "samples": [
          "who is the best librarian",
          "tell me who is the best librarian",
          "who is the greatest librarian",
          "tell me who is the greatest librarian",
        ],
        "response": `The beautiful, smart, and funny Tricia File!  She is regarded by industry peers as the most forward thinking thought leader in the library technology space.  <amazon:effect name="whispered">this information was provided by her adoring husband Brian File</amazon:effect>`
      },      
      {
        "name": "WyattJoke",
        "samples": [
          "tell me a joke wyatt would like",
          "tell me a joke why it would like"
        ],
        "response": `what is black and white and red all over? <break time="2s"/>a nun in a blender!<amazon:effect name="whispered">love that one.  never gets old.</amazon:effect>`
      },      
      {
        "name": "HowManyTokes",
        "samples": [
          "how many tokes",
          "how many tokos",
          "how many tocks"
        ],
        "response": `<prosody rate="x-slow"><emphasis level="strong">twenty five</emphasis></prosody>`
      },
      {
        "name": "RandomJoke",
        "samples": [
          "tell me a joke",
          "to tell me a joke"
        ],
        "response": () => {
          let opts = {
            uri: 'https://icanhazdadjoke.com/',
            headers: {
              'Accept': 'application/json'
            },
            json: true
          }
          return rp(opts).then((resp) => resp.joke)
        }
      },
      {
        "name": "RandomMathFact",
        "samples": [
          "math fact",
          "a math fact",
          "tell math fact",
          "to tell me a math fact",
          "tell a random math fact",
          "to tell me a random math fact"
        ],
        "response": () => rp(`http://numbersapi.com/random/math`)
      },
      {
        "name": "RandomMathTrivia",
        "samples": [
          "math trivia",
          "some math trivia",
          "for math trivia",
          "a math trivia",
          "tell math trivia",
          "to tell me math trivia",
          "tell a random math trivia",
          "to tell me a random math trivia"
        ],
        "response": () => rp(`http://numbersapi.com/random/trivia`)
      },
      {
        "name": "NumberMathFact",
        "samples": [
          "number fact for number {Number}",
          "a number fact for number {Number}",
          "number fact for the number {Number}",
          "a number fact for the number {Number}",
          "tell number fact for number {Number}",
          "to tell me a number fact for number {Number}",
          "tell number fact for the number {Number}",
          "to tell me a number fact for the number {Number}"
          
        ],
        "slots": [
          {
            "name": "Number",
            "type": "AMAZON.NUMBER",
            "samples": []
          }
        ],        
        "response": ({input}) => rp(`http://numbersapi.com/${input.requestEnvelope.request.intent.slots.Number.value}/math`)
      }
]


module.exports = {
    intents
}