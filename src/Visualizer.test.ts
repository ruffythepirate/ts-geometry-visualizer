import { Visualizer } from './Visualizer'
import domino from 'domino'

import { lineSegment } from 'ts-2d-geometry';

describe('Visualizer', () => {
  let doc: Document;
  let parentElement: Element;
  let v: Visualizer;

  beforeEach(() => {
    doc = domino.createDocument('<div id="div"></div>', true);
    parentElement = doc.getElementById('div') as Element
    v = new Visualizer(doc, parentElement);
  });

  test('constructor should set document and default parent element.', () => {
    expect(v.document).toBe(doc);
    expect(v.parentElement).toBe(parentElement);
  });

  test('addLineSegment should add line segment to parent element', () => {
    const newElement = v.addLineSegment(lineSegment(0, 0, 1, 1));

    expect(parentElement.children).toContain(newElement);

  });

  test('addLineSegment should set correct properties', () => {
    const newElement = v.addLineSegment(lineSegment(0, 0, 1, 1));

    expect(newElement.getAttribute('x1')).toBe('0');
    expect(newElement.getAttribute('y1')).toBe('0');
    expect(newElement.getAttribute('x2')).toBe('1');
    expect(newElement.getAttribute('y2')).toBe('1');
  });
});
