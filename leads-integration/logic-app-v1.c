{
    "definition": {
        "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
        "actions": {
            "Compose": {
                "inputs": "@variables('fields')",
                "runAfter": {
                    "Switch": [
                        "Succeeded"
                    ]
                },
                "type": "Compose"
            },
            "Compose_2": {
                "inputs": "@variables('api_url')",
                "runAfter": {
                    "Initialize_variable": [
                        "Succeeded"
                    ]
                },
                "type": "Compose"
            },
            "HTTP": {
                "inputs": {
                    "body": "@variables('fields')",
                    "headers": {
                        "X-SmartToken": "DCRA1-3cf81f7b5c26416eb5c108f1d2ebceae"
                    },
                    "method": "POST",
                    "uri": "@variables('api_url')"
                },
                "runAfter": {
                    "Compose_2": [
                        "Succeeded"
                    ]
                },
                "type": "Http"
            },
            "Initialize_variable": {
                "inputs": {
                    "variables": [
                        {
                            "name": "api_url",
                            "type": "string",
                            "value": "https://api.smartrecruiters.com/postings/@{triggerOutputs()['headers']['Target-Job']}/candidates"
                        }
                    ]
                },
                "runAfter": {
                    "Compose": [
                        "Succeeded"
                    ]
                },
                "type": "InitializeVariable"
            },
            "Initialize_variable_2": {
                "inputs": {
                    "variables": [
                        {
                            "name": "x2",
                            "type": "string",
                            "value": "@{int(length(triggerBody()['Full name']))}"
                        }
                    ]
                },
                "runAfter": {
                    "Output_object": [
                        "Succeeded"
                    ]
                },
                "type": "InitializeVariable"
            },
            "Initialize_variable_3": {
                "inputs": {
                    "variables": [
                        {
                            "name": "x3",
                            "type": "integer",
                            "value": "@int(indexOf(triggerBody()['Full name'], ' '))"
                        }
                    ]
                },
                "runAfter": {
                    "Initialize_variable_2": [
                        "Succeeded"
                    ]
                },
                "type": "InitializeVariable"
            },
            "Output_object": {
                "inputs": {
                    "variables": [
                        {
                            "name": "fields",
                            "type": "object",
                            "value": {
                                "email": null,
                                "firstName": null,
                                "lastName": null,
                                "phoneNumber": null
                            }
                        }
                    ]
                },
                "runAfter": {},
                "type": "InitializeVariable"
            },
            "Switch": {
                "cases": {
                    "Meta_-_IG,_FB": {
                        "actions": {
                            "Set_variable_2": {
                                "inputs": {
                                    "name": "fields",
                                    "value": {
                                        "email": "@triggerBody()['email']",
                                        "firstName": "@if(equals(int(indexOf(triggerBody()['Full name'], ' ')), -1), triggerBody()['Full name'], substring(triggerBody()['Full name'], 0, indexOf(triggerBody()['Full name'], ' ')))",
                                        "lastName": "@if(equals(int(indexOf(triggerBody()['Full name'], ' ')), -1), triggerBody()['Full name'], trim(substring(triggerBody()['Full name'], indexOf(triggerBody()['Full name'], ' '))))",
                                        "phoneNumber": "@triggerBody()['Phone number']"
                                    }
                                },
                                "runAfter": {},
                                "type": "SetVariable"
                            }
                        },
                        "case": "meta"
                    },
                    "Snapchat": {
                        "actions": {
                            "Set_variable_3": {
                                "inputs": {
                                    "name": "fields",
                                    "value": {
                                        "email": "@triggerBody()['COL$D']",
                                        "firstName": "@triggerBody()['COL$A']",
                                        "lastName": "@triggerBody()['COL$B']",
                                        "phoneNumber": "@triggerBody()['COL$C']"
                                    }
                                },
                                "runAfter": {},
                                "type": "SetVariable"
                            }
                        },
                        "case": "snapchat"
                    },
                    "TikTok": {
                        "actions": {
                            "Set_variable": {
                                "inputs": {
                                    "name": "fields",
                                    "value": {
                                        "email": "@triggerBody()['email']",
                                        "firstName": "@substring(triggerBody()['name'], 0, indexOf(triggerBody()['name'], ' '))",
                                        "lastName": "@trim(substring(triggerBody()['name'], indexOf(triggerBody()['name'], ' ')))",
                                        "phoneNumber": "@triggerBody()['phone_number']"
                                    }
                                },
                                "runAfter": {},
                                "type": "SetVariable"
                            }
                        },
                        "case": "tiktok"
                    }
                },
                "default": {
                    "actions": {}
                },
                "expression": "@triggerOutputs()['headers']['source']",
                "runAfter": {
                    "Initialize_variable_3": [
                        "Succeeded"
                    ]
                },
                "type": "Switch"
            }
        },
        "contentVersion": "1.0.0.0",
        "outputs": {},
        "parameters": {},
        "triggers": {
            "manual": {
                "inputs": {
                    "schema": {}
                },
                "kind": "Http",
                "type": "Request"
            }
        }
    },
    "parameters": {}
}