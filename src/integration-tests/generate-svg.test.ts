import { lineSegment, point, Polygon, vector, rectangle } from 'ts-2d-geometry';
import domino from 'domino'
import {Visualizer} from '../Visualizer';

import {writeFile} from './utils/fileWriter';

describe('generate-svg', () => {
  let doc: Document;
  let parentElement: Element;
  let v: Visualizer;

  beforeEach(() => {
    doc = domino.createDocument('<body><svg height="500" width="500" id="paint-here"></svg></body>', true);
    parentElement = doc.getElementById('paint-here') as Element
    v = new Visualizer(doc, parentElement);
  });

  it('creates a document', () => {
    const l = lineSegment(2, 2, 50, 50);

    v.addLineSegment(l);
    const polygon = Polygon.fromPoints([point(50,0), point(300, 0), point(50,400)]);
    v.addPolygon(polygon);
    v.addVector(point(50,5), vector(200,100));
    v.addLineSegment(lineSegment(0,5,20,24));
    v.addRectangle(rectangle(0,5,20,124));

    writeFile('test.html', createHtml(doc));
  });
});

function createHtml(doc: Document) {
  return `<html> ${doc.body.innerHTML} </html>`;
}
