<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Calculate expression based on other answers in Panel Dynamic, Reactjs Survey Library Example</title><meta name="viewport" content="width=device-width"/>
        <script src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone@7.2.5/babel.min.js"></script>
        <script src="https://unpkg.com/survey-core@1.9.18/survey.core.min.js"></script>
        <script src="https://unpkg.com/survey-core@1.9.18/survey.i18n.min.js"></script>
        <script src="https://unpkg.com/survey-react-ui@1.9.18/survey-react-ui.min.js"></script>
        <link href="https://unpkg.com/survey-core@1.9.18/modern.min.css" type="text/css" rel="stylesheet"/>
        <link rel="stylesheet" href="./index.css"></head>
    <body>
        <div id="surveyElement" style="display:inline-block;width:100%;"></div>
        <div id="surveyResult"></div>
        <script type="text/babel" src="./index.js"></script>
    </body>
</html>

<script>

Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "showQuestionNumbers": "off",
    "elements": [
        {
            "type": "paneldynamic",
            "name": "items",
            "title": "Items",
            "keyName": "name",
            "showQuestionNumbers": "off",
            "templateTitle": "item #{panelIndex}",
            "templateElements": [
                {
                    "type": "text",
                    "name": "name",
                    "title": "Name:",
                    "isRequired": true
                }, {
                    "type": "text",
                    "name": "cost",
                    "inputType": "number",
                    "title": "Item Cost:",
                    "isRequired": true,
                    "startWithNewLine": false
                }, {
                    "type": "text",
                    "name": "vendor",
                    "title": "Vendor:",
                    "isRequired": true
                }, {
                    "type": "text",
                    "name": "quantity",
                    "inputType": "number",
                    "title": "Quantity:",
                    "isRequired": true,
                    "startWithNewLine": false
                }, {
                    "type": "text",
                    "name": "link",
                    "title": "Link:",
                    "isRequired": true
                }, {
                    "type": "expression",
                    "name": "total",
                    "title": "Total Item Cost:",
                    "expression": "{panel.cost} * {panel.quantity}",
                    "displayStyle": "currency",
                    "currency": "EUR",
                    "startWithNewLine": false
                }
            ],
            "minPanelCount": 1,
            "panelAddText": "Add another  item",
            "panelRemoveText": "Remove item"
        }, {
            "type": "panel",
            "title": "Totals",
            "elements": [
                {
                    "type": "expression",
                    "name": "totalQuantity",
                    "title": "Total  Quantity:",
                    "expression": "sumInArray({items}, 'quantity')"
                }, {
                    "type": "expression",
                    "name": "totalCost",
                    "title": "Total Cost:",
                    "expression": "sumInArray({items}, 'total')",
                    "displayStyle": "currency",
                    "currency": "EUR",
                    "startWithNewLine": false
                }
            ]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

ReactDOM.render(<SurveyReact.Survey model={survey}/>, document.getElementById("surveyElement"));

</script>
