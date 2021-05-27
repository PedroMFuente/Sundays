// Appery.io models
export interface $aio_empty_object {};
//
interface __getChatBotResponse_serviceResponse_sub_008 {
    "displayName": string,
    "name": string
}
interface __getChatBotResponse_serviceResponse_sub_007 {
    "action": string
}
interface __getChatBotResponse_serviceResponse_sub_006 extends Array < string > {}
interface __getChatBotResponse_serviceResponse_sub_005 {
    "text": __getChatBotResponse_serviceResponse_sub_006
}
interface __getChatBotResponse_serviceResponse_sub_004 {
    "text": __getChatBotResponse_serviceResponse_sub_005,
    "payload": __getChatBotResponse_serviceResponse_sub_007
}
interface __getChatBotResponse_serviceResponse_sub_003 extends Array < __getChatBotResponse_serviceResponse_sub_004 > {}
interface __getChatBotResponse_serviceResponse_sub_002 {}
interface __getChatBotResponse_serviceResponse_sub_001 {
    "allRequiredParamsPresent": boolean,
    "parameters": __getChatBotResponse_serviceResponse_sub_002,
    "fulfillmentText": string,
    "languageCode": string,
    "fulfillmentMessages": __getChatBotResponse_serviceResponse_sub_003,
    "intentDetectionConfidence": number,
    "action": string,
    "intent": __getChatBotResponse_serviceResponse_sub_008,
    "queryText": string
}
export interface getChatBotResponse_serviceResponse {
    "queryResult": __getChatBotResponse_serviceResponse_sub_001,
    "responseId": string
}