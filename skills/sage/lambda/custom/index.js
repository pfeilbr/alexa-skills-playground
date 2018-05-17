/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const _ = require("lodash")
const config = require("./config");

const LoggingHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log(JSON.stringify(handlerInput, null, 2));
    console.log(JSON.stringify(request, null, 2));
    return false;
  },
  handle(handlerInput) {
    return null;
  },
};

const GenericIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && _.find(config.intents, {name: request.intent.name}));
  },
  async handle(handlerInput) {
    let responseSSML = config.defaultResponse
    try {
      const request = handlerInput.requestEnvelope.request;
      const intent = request.intent ? _.find(config.intents, {name: request.intent.name}) : config.intents[0] /* return first intent if 'LaunchRequest' */;
  
      responseSSML = (typeof(intent.response) === "string") ? intent.response : await intent.response({input: handlerInput, request, intent, config});
  
      return handlerInput.responseBuilder
        .speak(responseSSML)
        .withSimpleCard(config.skillName, responseSSML)
        .getResponse();
    } catch (e) {
      console.error("ERROR:", {error: JSON.stringify(e, Object.getOwnPropertyNames(e))})
      responseSSML = config.exceptionErrorMessage
      return handlerInput.responseBuilder
        .speak(responseSSML)
        .withSimpleCard(config.skillName, responseSSML)
        .getResponse();
    }
  }
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(config.helpMessage)
      .reprompt(config.helpReprompt)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(config.stopMessage)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak(config.errorMessage)
      .reprompt(config.errorMessage)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LoggingHandler,
    GenericIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
