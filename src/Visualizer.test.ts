import { Visualizer } from './Visualizer'
import domino from 'domino'

import { lineSegment, polygon, point, Polygon } from 'ts-2d-geometry';

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

  test('addPolygon should add correct points', () => {
    const points = [point(1, 1), point(2, 2,), point(0,2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    const pointsAttr = newElement.getAttribute('points');

    points.forEach((p) => {
      expect(pointsAttr).toContain(`${p.x},${p.y}`);
    })

  });

  test('addPolygon should add polygon to parent element', () => {
    const points = [point(1, 1), point(2, 2,), point(0,2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    expect(parentElement.children).toContain(newElement);
  });

  test('addPolygon should add style attribute', () => {
    const points = [point(1, 1), point(2, 2,), point(0,2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    const styleAttr = newElement.getAttribute('style');

    expect(styleAttr).toContain('stroke');
  });
});
