import { Visualizer } from './Visualizer';
import domino from 'domino';

import { lineSegment, polygon, point, Polygon, vector, rectangle } from 'ts-2d-geometry';

describe('Visualizer', () => {
  let doc: Document;
  let parentElement: Element;
  let v: Visualizer;

  beforeEach(() => {
    doc = domino.createDocument('<div id="div"></div>', true);
    parentElement = doc.getElementById('div') as Element;
    v = new Visualizer(doc, parentElement);
  });

  test('constructor should set document and default parent element.', () => {
    expect(v.document).toBe(doc);
    expect(v.parentElement).toBe(parentElement);
  });

  test('addLineSegment should add line segment to parent element', () => {
    const newElement = v.addRectangle(rectangle(10, 10, 100, 100));

    expect(newElement.getAttribute('x')).toBe('10');
    expect(newElement.getAttribute('y')).toBe('10');
    expect(newElement.getAttribute('width')).toBe('90');
    expect(newElement.getAttribute('height')).toBe('90');

    expect(parentElement.children).toContain(newElement);
  });

  test('addLineSegment should add line segment to parent element', () => {
    const newElement = v.addLineSegment(lineSegment(0, 0, 1, 1));

    expect(parentElement.children).toContain(newElement);
  });

  test('addLineSegment should set correct properties', () => {
    const newElement = v.addLineSegment(lineSegment(0, 0, 1, 1));

    expect(newElement.tagName).toEqual('line');
    expect(newElement.getAttribute('x1')).toBe('0');
    expect(newElement.getAttribute('y1')).toBe('0');
    expect(newElement.getAttribute('x2')).toBe('1');
    expect(newElement.getAttribute('y2')).toBe('1');
  });

  test('addPolygon should add correct points', () => {
    const points = [point(1, 1), point(2, 2), point(0, 2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    const pointsAttr = newElement.getAttribute('points');

    points.forEach((p) => {
      expect(pointsAttr).toContain(`${p.x},${p.y}`);
    });
  });

  test('addPolygon should add polygon to parent element', () => {
    const points = [point(1, 1), point(2, 2), point(0, 2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    expect(parentElement.children).toContain(newElement);
  });

  test('addPolygon should add style attribute', () => {
    const points = [point(1, 1), point(2, 2), point(0, 2)];
    const newElement = v.addPolygon(Polygon.fromPoints(points));

    const styleAttr = newElement.getAttribute('style');

    expect(styleAttr).toContain('stroke');
  });

  test('addVector should return items in a group', () => {
    const newElement = v.addVector(point(0, 0), vector(1, 0));

    expect(newElement.tagName).toEqual('g');
  });

  test('setStyling should add style to elements', () => {
    const style = {
      fill: 'red',
      stroke: 'yellow',
      fillWidth: 3,
    };
    const newElement = v.addLineSegment(lineSegment(0, 0, 1, 1), undefined, style);

    expect(newElement.getAttribute('style')).toContain('fill:red');
    expect(newElement.getAttribute('style')).toContain('fill-width:3');
    expect(newElement.getAttribute('style')).toContain('stroke:yellow');
  });

  test('addVector should contain a line from point to vector', () => {
    const newElement = v.addVector(point(0, 0), vector(1, 0));

    let nodeFound = false;
    newElement.childNodes.forEach((childNode) => {
      const e = childNode as Element;
      if (e.tagName === 'line') {
        nodeFound = true;
        expect(e.getAttribute('x1')).toBe('0');
        expect(e.getAttribute('y1')).toBe('0');
        expect(e.getAttribute('x2')).toBe('1');
        expect(e.getAttribute('y2')).toBe('0');
      }
    });
    expect(nodeFound).toBeTruthy();
  });
  test('addVector should contain a triangle on the arrow side', () => {
    const newElement = v.addVector(point(0, 0), vector(1, 0));

    let nodeFound = false;
    newElement.childNodes.forEach((childNode) => {
      const e = childNode as Element;
      if (e.tagName === 'polygon') {
        nodeFound = true;
      }
    });
    expect(nodeFound).toBeTruthy();
  });
});
