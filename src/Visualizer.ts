import { LineSegment, Polygon, Vector, Point, point,
  lineSegment, vector, Matrix3x3, Transformation } from 'ts-2d-geometry';

// This is the xml namespace for svg type.
const  xmlns = 'http://www.w3.org/2000/svg';

/**
 * The visualizer adds creates and adds svg elements for geometry constructs
 * into parent elements.
 */
export class Visualizer {
  /**
   * Creates a visualizer with the document that is used to construct the new elements.
   */
  constructor(public document: Document, public parentElement: Element) {

  }

  /**
   * Adds a line segment to the element tied to this visualizer.
   */
  addLineSegment(ls: LineSegment, parentElement?: Element): Element {
    const newElement = this.document.createElementNS(xmlns, 'line');
    newElement.setAttributeNS(null, 'x1', `${ls.p1.x}`);
    newElement.setAttributeNS(null, 'y1', `${ls.p1.y}`);
    newElement.setAttributeNS(null, 'x2', `${ls.p2.x}`);
    newElement.setAttributeNS(null, 'y2', `${ls.p2.y}`);
    newElement.setAttributeNS(null, 'style', 'stroke:black;stroke-width:2');
    if (parentElement !== undefined) {
      parentElement.appendChild(newElement);
    } else {
      this.parentElement.appendChild(newElement);
    }
    return newElement;
  }

  /**
   * Adds a polygon to the element tied to this visualizer.
   */
  addPolygon(p: Polygon, parentElement?: Element): Element {
    const newElement = this.document.createElementNS(xmlns, 'polygon');

    const points = p.points();
    const pointString = points.map(p => `${p.x},${p.y}`).join(' ');

    newElement.setAttributeNS(null, 'points', pointString);
    newElement.setAttributeNS(null, 'style', 'fill:none;stroke:black;stroke-width:2');

    if (parentElement !== undefined) {
      parentElement.appendChild(newElement);
    } else {
      this.parentElement.appendChild(newElement);
    }
    return newElement;
  }

  /**
   * Adds a vector to an SVG image.
   */
  addVector(p:Point, v: Vector): Element {
    const newElement = this.document.createElementNS(xmlns, 'g');
    const p2 = p.plus(v);
    this.addLineSegment(lineSegment(p.x, p.y, p2.x, p2.y), newElement);
    this.addPolygon(createArrow(1, p.plus(v), v), newElement);

    return newElement;
    function createArrow(size:number, peak: Point, direction:Vector) {
      const p = Polygon.fromPoints([point(0, 0), point(-1, 0.5), point(-1, -0.5)]);

      const t = Transformation
      .builder()
      .withScale(size)
      .withVectorRotation(direction)
      .withTranslation(peak.x, peak.y)
      .build();

      return t.applyToPolygon(p);
    }

  }

}
