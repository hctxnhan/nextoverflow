import { TfIdfTerm } from "natural";

export function cosineSimilarity(document1: TfIdfTerm[], document2: TfIdfTerm[]) {
  // start with the smaller document to reduce total computation time
  const calculateFirst =
    document1.length <= document2.length ? document1 : document2;
  const calculateSecond =
    document1.length <= document2.length ? document2 : document1;

  // reduce each document to key value pair objects in the form term: tfidf
  const d1 = reduceDocument(calculateFirst);
  const d2 = reduceDocument(calculateSecond);

  // calculate dot product
  let sum = 0;
  Object.keys(d1).forEach((key) => {
    const tfidf1 = Number(d1[key]);
    const tfidf2 = Number(d2[key]) || 0;
    sum += tfidf1 * tfidf2;
  });

  // divide dot product by normalization factors
  const norm1 = calcNormalizationFactor(d1);
  const norm2 = calcNormalizationFactor(d2);
  return sum / (norm1 * norm2);
}

function reduceDocument(doc: TfIdfTerm[]) {
  return doc.reduce((reducedDoc, term) => {
    reducedDoc[term.term] = term.tfidf;
    return reducedDoc;
  }, {} as Record<string, number>);
}

function calcNormalizationFactor(doc: Record<string, number>) {
  let squaredSum = 0;
  Object.keys(doc).forEach((key) => (squaredSum += doc[key] * doc[key]));
  return Math.sqrt(squaredSum);
}
