const natural = require('natural');
const Analyzer = require('natural').SentimentAnalyzer

class NLP {
    constructor() {
        this.tokenizer = new natural.WordTokenizer();
        this.Classifier = new natural.BayesClassifier();
        this.stemmer = require('natural').PorterStemmer;
        this.analyzer = new Analyzer("English", this.stemmer, "afinn");


        this.Classifier.addDocument('i am feeling dizzy', 'sleep');
        this.Classifier.addDocument('i want to sleep', 'sleep');
        this.Classifier.train();
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

    getTockenize(iString) {
        let tokenize = {};
        tokenize.tokenize = this.tokenizer.tokenize(iString);
        return tokenize;
    }

    getClassified(iString) {
        let Classifier = {};
        Classifier.classified = this.Classifier.classify(iString);
        return Classifier;
    }
    getSentiments(iString) {
        let query = this.getTockenize(iString);
        let sentiments = {};
        sentiments.sentiment = this.analyzer.getSentiment(query.tokenize);
        return sentiments;
    }
};

var nlp = new NLP();


module.exports = nlp;