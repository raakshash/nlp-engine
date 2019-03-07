const natural = require('natural');
const sw = require('stopword');
const Analyzer = natural.SentimentAnalyzer;

class NLP {
    constructor() {
        this.tokenizer = new natural.WordTokenizer();
        this.Classifier = new natural.BayesClassifier();
        this.stemmer = natural.PorterStemmer;
        this.stemmer.attach();
        this.analyzer = new Analyzer("English", this.stemmer, "afinn");
        this.wordnet = new natural.WordNet();
    }

    getExpressionData(iExpression, callback) {
        let self = this;
        let expressionData = {};
        self.getTockenize(iExpression, function (iResults) {
            expressionData.expression = iExpression;
            expressionData.keywords = iResults.tokenize;
            expressionData.sentiment = self.getSentiments(iResults.tokenize);
            expressionData.results = iResults.results;
            callback(expressionData);
        });
    }

    getStringDistance(iString1, iString2) {
        let distance = {};
        distance.JaroWinklerDistance = natural.JaroWinklerDistance(iString1, iString2);
        distance.LevenshteinDistance = natural.LevenshteinDistance(iString1, iString2, {
            search: true
        });
        return distance;
    }

    getStemming(iWord) {
        let stemmer = {}
        stemmer.PorterStemmer = this.stemmer.stem(iWord)
        stemmer.LancasterStemmer = natural.LancasterStemmer.stem(iWord);
        return stemmer;
    }

    getTockenize(iString, callback) {
        let self = this;
        let tokenize = {};
        tokenize.results = [];
        // tokenize.tokenize = this.tokenizer.tokenize(iString);
        tokenize.tokenize = iString.tokenizeAndStem();
        // tokenize.tokenize = sw.removeStopwords(tokenize.tokenize);
        for(let i = 0; i < tokenize.tokenize.length; i++){
            let iKeyword = tokenize.tokenize[i];
            self.getKeywordData(iKeyword, function(iResults){
                tokenize.results = tokenize.results.concat(iResults);
                if(i+1 >= tokenize.tokenize.length){
                    callback(tokenize);
                }
            })
        }
    }

    getKeywordData(iKeyword, iCallback) {
        this.wordnet.lookup(iKeyword, function (results) {
            iCallback(results);
        });
    }

    addClassifiedData(iExpression, iEntity){
        this.Classifier.addDocument(iExpression, iEntity);
        this.Classifier.train();
    }

    getClassifiedData(iExpression){
        let classificationData = {};
        classificationData.classified = this.Classifier.classify(iExpression);
        classificationData.classification = this.Classifier.getClassifications(iExpression);
        return classificationData;
    }

    trainYourBot(){
        this.Classifier.train();
    }

    getClassified(iString) {
        let Classifier = {};
        Classifier.classified = this.Classifier.classify(iString);
        return Classifier;
    }
    getSentiments(iQuery) {
        return this.analyzer.getSentiment(iQuery);
    }
};

var nlp = new NLP();


module.exports = nlp;