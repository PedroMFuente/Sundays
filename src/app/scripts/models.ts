/**
 * Models generated from "Model and Storage" and models extracted from services.
 * To generate entity use syntax:
 * Apperyio.EntityAPI("<model_name>[.<model_field>]");
 */
export var models = {
    "String": {
        "type": "string"
    },
    "Number": {
        "type": "number"
    },
    "Any": {
        "type": "any"
    },
    "Function": {
        "type": "Function"
    },
    "Promise": {
        "type": "Promise"
    },
    "Boolean": {
        "type": "boolean"
    },
    "Observable": {
        "type": "Observable"
    },
    "getChatBotResponse_service": {
        "type": "object",
        "properties": {
            "url": {
                "type": "string",
                "default": "https://api.appery.io/rest/1/code/2984c180-53a3-483c-9753-4162ad3bc1b6/exec"
            },
            "method": {
                "type": "string",
                "default": "post"
            },
            "request": {
                "type": "object",
                "properties": {
                    "body": {
                        "type": "object",
                        "properties": {
                            "message": {
                                "type": "string"
                            }
                        }
                    },
                    "query": {
                        "type": "object",
                        "properties": {}
                    },
                    "headers": {
                        "type": "object",
                        "properties": {
                            "Content-Type": {
                                "type": "string",
                                "default": "application/json"
                            }
                        }
                    }
                }
            },
            "response": {
                "type": "object",
                "properties": {
                    "body": {
                        "type": "object",
                        "properties": {
                            "queryResult": {
                                "type": "object",
                                "properties": {
                                    "allRequiredParamsPresent": {
                                        "type": "boolean",
                                        "default": true
                                    },
                                    "parameters": {
                                        "type": "object",
                                        "properties": {}
                                    },
                                    "fulfillmentText": {
                                        "type": "string",
                                        "default": "Soy Sundays, una inteligencia artificial"
                                    },
                                    "languageCode": {
                                        "type": "string",
                                        "default": "es"
                                    },
                                    "fulfillmentMessages": {
                                        "type": "array",
                                        "items": [{
                                            "type": "object",
                                            "properties": {
                                                "text": {
                                                    "type": "object",
                                                    "properties": {
                                                        "text": {
                                                            "type": "array",
                                                            "items": [{
                                                                "type": "string",
                                                                "default": "Soy Sundays, una inteligencia artificial"
                                                            }]
                                                        }
                                                    }
                                                },
                                                "payload": {
                                                    "type": "object",
                                                    "properties": {
                                                        "action": {
                                                            "type": "string",
                                                            "default": "input.presentacion"
                                                        }
                                                    }
                                                }
                                            }
                                        }]
                                    },
                                    "intentDetectionConfidence": {
                                        "type": "number",
                                        "default": 0.8060418
                                    },
                                    "action": {
                                        "type": "string",
                                        "default": "input.presentacion"
                                    },
                                    "intent": {
                                        "type": "object",
                                        "properties": {
                                            "displayName": {
                                                "type": "string",
                                                "default": "Presentacion"
                                            },
                                            "name": {
                                                "type": "string",
                                                "default": "projects/sundays-cvym/agent/intents/a6b8ebc4-116e-4e6e-808a-055baeeca3de"
                                            }
                                        }
                                    },
                                    "queryText": {
                                        "type": "string",
                                        "default": "Quien eres"
                                    }
                                }
                            },
                            "responseId": {
                                "type": "string",
                                "default": "3cccb24f-f703-4dbc-ad6f-759a24523c7f-06f725e1"
                            }
                        }
                    },
                    "headers": {
                        "type": "object",
                        "properties": {}
                    }
                }
            }
        }
    }
};
/**
 * Data storage
 */