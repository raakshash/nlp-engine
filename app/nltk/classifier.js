const natural = require('natural');
const Element = natural.Element;
const Context = natural.Context;
const Feature = natural.Feature;
const FeatureSet = natural.FeatureSet;
const Classifier = natural.BayesClassifier;
const Sample = natural.Sample;

let classifierFileName = 'classifier.json';
let minImprovements = 0.1;
let nrIterations = 20;

class NLP_Element extends Element {
    constructor(iElement1, iElement2) {
        super(iElement1, iElement2);
    }

    generateFeatures(iFeatureSet) {
        function isZero(x) {
            if ((x.a === "x") && (x.b.data === "0")) {
                return 1;
            }
            return 0;
        }
        iFeatureSet.addFeature(new Feature(isZero, "isZero", ["0"]));

        function isOne(x) {
            if ((x.a === "y") && (x.b.data === "1")) {
                return 1;
            }
            return 0;
        }
        iFeatureSet.addFeature(new Feature(isOne, "isOne", ["1"]));
    }
}

class NLPClassifier {
    constructor() {
        this.sample = new Sample();
    }

    addElementToSample(){
        this.sample.addElement(new NLP_Element("x", new Context("0")));
        this.sample.addElement(new NLP_Element("y", new Context("1")));
    }

    generateFeatures(){
        this.FeatureSet = new FeatureSet();
        this.sample.generateFeatures(this.FeatureSet);
    }

    createClassifier(){
        this.classifier = new Classifier(this.FeatureSet, this.sample);
        this.classifier.train(minImprovements, nrIterations);
    }

    saveClassifier(){
        this.classifier.save(classifierFileName, function(err, data){
            if(err){
                console.log("Error: "+ err);
            }else{
                console.log("Data: "+ JSON.stringify(data));
            }
        });
    }
    addTrainingData(iExpressionData, iIntent){
        this.classifier.addDocument(iExpressionData, iIntent);
        this.classifier.train(minImprovements, nrIterations);
        this.saveClassifier();
    }
}

exports.initClassfier = function(){
    classifier = new NLPClassifier();
    classifier.addElementToSample();
    classifier.generateFeatures();
    classifier.createClassifier();
    classifier.saveClassifier();
    return classifier;
}