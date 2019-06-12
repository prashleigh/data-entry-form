const startingData = [
    {
        "id": "24823480909",
        "title": "Title 1",
        "date": "May 5th, 1900",
        "description": "Title 1 is a very long title that includes many components about the POI",
        "location": "Here but not there",
        "latitude": 30,
        "longitude": 55
    },
    {
        "id": "2083049280",
        "title": "Title 2",
        "date": "April 15th, 1913",
        "description": "New description, who this?",
        "location": "Here but not there",
        "latitude": 30,
        "longitude": 55
    }
];

const schema = {
    "$schema":"http://json-schema.org/draft-07/schema",
    "$id": "http://mappingviolence.com/schemas/poi_schema.json",
    "type": "object",
    "properties": {
        "id": {"type":"string"},
        "title": {"type":"string"}, // field also called "name"
        "description": {"type":"string"},
        "location": {"type":"string"},
        "latitude": {"type":"number"},
        "longitude": {"type":"number"},
        "locationRationale": {"type":"string"},
        "date": {
            "type": "object",
            "properties": {
                "year": {"type":"integer"},
                "month": {"type":"integer"},
                "day": {"type":"integer"},
                "modifier": {
                    "type": "string",
                    "enum": ["Early", "Mid", "Late", "Around"]
                }
            }
        },
        "aggressors": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "gender": {"type": "string"},
                    "age": {"type": "integer"},
                    "ethnicity": {"type": "string"},
                    "nationality": {"type": "string"},
                    "occupation": {"type": "string"},
                }
            }
        },
        "victims": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "gender": {"type": "string"},
                    "age": {"type": "integer"},
                    "ethnicity": {"type": "string"},
                    "nationality": {"type": "string"},
                    "occupation": {"type": "string"},
                }
            }
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": ["SOME NUMBER OF TAGS"]
            }
        },
        "womenInvolved": {"type":"boolean"},
        "typeOfViolence": {
            "type": "string",
            "enum": ["SOME NUMBER OF TAGS"],
        },
        "primarySources": {
            "type": "array",
            "items": {"type":"string"}
        },
        "secondarySources": {
            "type": "array",
            "items": {"type":"string"}
        },
        "researcherNotes": {"type":"string"}
    },
    "required": ["id", "title", "description", "location", "latitude", "longitude"],
    "additionalProperties": false
};

const uischema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "label": "Title",
            "scope": "#/properties/title"
        },
        {
            "type": "Control",
            "label": "Description",
            "scope": "#/properties/description",
            "options": {
                "multi": true
            }
        },
        {
            "type": "Group",
            "label": "Location Information",
            "elements": [
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Location",
                            "scope": "#/properties/location"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Latitude",
                            "scope": "#/properties/latitude"
                        },
                        {
                            "type": "Control",
                            "label": "Longitude",
                            "scope": "#/properties/longitude"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Location Rationale",
                            "scope": "#/properties/locationRationale"
                        }
                    ]
                }
            ]
        },
        {
            "type": "Group",
            "label": "Date",
            "elements": [
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Modifier",
                            "scope": "#/properties/date/properties/modifier"
                        },
                        {
                            "type": "Control",
                            "label": "Year",
                            "scope": "#/properties/date/properties/year"
                        },
                        {
                            "type": "Control",
                            "label": "Month",
                            "scope": "#/properties/date/properties/month"
                        },
                        {
                            "type": "Control",
                            "label": "Day",
                            "scope": "#/properties/date/properties/day"
                        },
                    ]
                },
            ]
        },
        {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Victims",
                    "scope": "#/properties/victims"
                }
            ]
        },
        {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Aggressors",
                    "scope": "#/properties/aggressors"
                }
            ]
        },
        {
            "type": "Group",
            "label": "Metadata",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Women Involved?",
                            "scope": "#/properties/womenInvolved"
                        },
                        {
                            "type": "Control",
                            "label": "Type of Violence",
                            "scope": "#/properties/typeOfViolence"
                        },
                        {
                            "type": "Control",
                            "label": "Tags",
                            "scope": "#/properties/tags"
                        }   
                    ]
                }
            ]
        },
        {
            "type": "Group",
            "label": "Sources",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "label": "Primary Sources",
                            "scope": "#/properties/primarySources"
                        },
                        {
                            "type": "Control",
                            "label": "Secondary Sources",
                            "scope": "#/properties/secondarySources"
                        },
                    ]
                }
            ]
        },
        {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Researcher Notes",
                    "scope": "#/properties/researcherNotes",
                    "options": {
                        "multi": true
                    }
                }
            ]
        }
    ]
};

export { startingData, schema, uischema };