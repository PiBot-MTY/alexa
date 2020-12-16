/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */


const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido, di empezar cuestionario para empezar el cuestionario.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola Mundo!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const preguntatemperaturahandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntatemperatura';
    },
    handle(handlerInput) {
            var temperatura=handlerInput.requestEnvelope.request.intent.slots.temprelativa.value;
            const speakOutput = 'Claro, tu temperatura actual es '+ temperatura +". Has tenido dolores de cabeza?, Contesta sí los he sentido ó, no los he sentido";
            const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes.temperatura=temperatura;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
             .speak(speakOutput)
             .reprompt(speakOutput)
             .getResponse();}
    
};



const preguntacabezahandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntacabeza';
    },
    handle(handlerInput) {
            const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
            var dolorcabeza=handlerInput.requestEnvelope.request.intent.slots.dolorcabeza.value;
            const speakOutput = 'Claro, entonces '+dolorcabeza+' has tenido dolor de cabeza, dime, te ha faltado el aire?, contesta sí me ha faltado ó, no me ha faltado';
            sessionAttributes.dolorcabeza=dolorcabeza;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        
    }
};

const preguntaairehandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntaaire';
    },
    handle(handlerInput) {
        var aire=handlerInput.requestEnvelope.request.intent.slots.aire.value;
        const speakOutput = 'Bien, entonces '+ aire +' te ha faltado el aire, cuentame, has tenido tos?, contesta sí he tenido tos ó, no he tenido tos';
        const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.aire=aire;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const preguntatoshandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntatos';
    },
    handle(handlerInput) {
        var tos=handlerInput.requestEnvelope.request.intent.slots.tos.value;
        const speakOutput = 'Hmmm, entonces '+ tos +' has tenido tos, has perdido el olfato?, contesta sí tengo olfato ó, no tengo olfato.';
        const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.tos=tos;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const preguntaoloreshandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntaolores';
    },
    handle(handlerInput) {
        var olores=handlerInput.requestEnvelope.request.intent.slots.olores.value;
        const speakOutput = 'Claro, entonces '+ olores +' tienes olfato, que tal el gusto?, contesta sí he perdido el gusto ó, no he perdido el gusto.';
        const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.olores=olores;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const preguntasaboreshandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntasabores';
    },
    handle(handlerInput) {
        var sabor=handlerInput.requestEnvelope.request.intent.slots.sabor.value;
        var solucion="No presentas ningún sintoma de preocupación, gracias por tomar la encuesta.";
        const sessionAttributes=handlerInput.attributesManager.getSessionAttributes();
        const temperature=sessionAttributes.temperatura;
        const dolorcabeza=sessionAttributes.dolorcabeza
        const olores=sessionAttributes.olores
        const tos=sessionAttributes.tos
        const aire=sessionAttributes.aire
        if(temperature==="alta" || sabor==="si" || dolorcabeza==="si" || olores==="no" || tos==="si" || aire==="si"){
            solucion="Basado en tus resultados, por favor, asiste al módulo de atención médica mas cercano";
        }
        const speakOutput ='Entonces '+ sabor +' has perdido el gusto,   '+ solucion;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'No hay ayuda, el mundo es cruel y yo mas';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Perdona, intenta de nuevo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Intenta con otra frase`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sucedio un error.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        preguntatemperaturahandler,
        preguntacabezahandler,
        preguntaairehandler,
        preguntatoshandler,
        preguntaoloreshandler,
        preguntasaboreshandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();