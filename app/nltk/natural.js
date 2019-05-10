const natural = require('natural');

let minImprovements = 0.1;
let nrIterations = 20;
let classifierFileName = "classifier.json";

class NLP {
    constructor() {
        this.tokenizer = new natural.WordTokenizer();
        this.Classifier = new natural.BayesClassifier();
        this.stemmer = natural.PorterStemmer;
        this.stemmer.attach();

        this.Classifier.events.on('trainedWithDocument', function (obj) {
            this.Classifier.save(classifierFileName, function (err, data) {
                if (err) {
                    console.log("Error: " + err);
                } 
                // else {
                //     console.log("Data saved successfully");
                // }
            });
        }.bind(this));
    }

    addClassifiedData(iExpression, iEntity) {
        this.Classifier.addDocument(iExpression.tokenizeAndStem(), iEntity);
        this.Classifier.train(minImprovements, nrIterations);
    }

    getClassifiedData(iExpression) {
        let classificationData = {};
        classificationData.classified = this.Classifier.classify(iExpression);
        classificationData.classification = this.Classifier.getClassifications(iExpression);
        return classificationData;
    }
};

var nlp = new NLP();


module.exports = nlp;