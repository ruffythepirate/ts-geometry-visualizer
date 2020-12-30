import { LineSegment, Polygon, Vector, Point, point,
  lineSegment, vector, Matrix3x3, Transformation, Rectangle } from 'ts-2d-geometry';
import { FillRule, Style } from './Style';
import { camelToSnakeCase } from './Util';

// This is the xml namespace for svg type.
const  xmlns = 'http://www.w3.org/2000/svg';

const defaultStyle: Style = {
  fillRule: FillRule.nonzero,
  fill: 'black',
  strokeWidth: 3,
  stroke: 'black',
};

/**
 * The visualizer adds creates and adds svg elements for geometry constructs
 * into parent elements.
 */
export class Visualizer {

  private style?: Style;

  /**
   * Creates a visualizer with the document that is used to construct the new elements.
   */
  constructor(public document: Document, public parentElement: Element, style?: Style) {

    this.style = {
      ...defaultStyle,
    };

    if (style !== undefined) {
      this.style = {
        ...this.style,
        ...style,
      };
    }
  }

  /**
   * Sets the default style that will be applied to new objects that are added with this
   * visualizer.
   */
  setStyle(style: Style) {
    this.style = {
      ...defaultStyle,
      ...style,
    };
  }

  /**
   * Adds a line segment to the element tied to this visualizer.
   */
  addLineSegment(ls: LineSegment, parentElement?: Element, style?: Style): Element {
    const newElement = this.document.createElementNS(xmlns, 'line');
    newElement.setAttributeNS(null, 'x1', `${ls.p1.x}`);
    newElement.setAttributeNS(null, 'y1', `${ls.p1.y}`);
    newElement.setAttributeNS(null, 'x2', `${ls.p2.x}`);
    newElement.setAttributeNS(null, 'y2', `${ls.p2.y}`);
    this.applyStyling(newElement, style);
    this.addElement(newElement, parentElement);
    return newElement;
  }

  /**
   * Adds a rectangle to the defined parentElement, or if it is undefined, to the one
   * that is associated with this visualizer.
   */
  addRectangle(r: Rectangle, parentElement?: Element, style?: Style): Element {
    const newElement = this.document.createElementNS(xmlns, 'rect');
    const width = r.bottomRight.x - r.topLeft.x;
    const height = r.bottomRight.y - r.topLeft.y;
    newElement.setAttributeNS(null, 'x', `${r.topLeft.x}`);
    newElement.setAttributeNS(null, 'y', `${r.topLeft.y}`);
    newElement.setAttributeNS(null, 'width', `${width}`);
    newElement.setAttributeNS(null, 'height', `${height}`);
    this.addElement(newElement, parentElement);
    this.applyStyling(newElement, style);
    return newElement;

  }

  /**
   * Adds a polygon to the element tied to this visualizer.
   */
  addPolygon(p: Polygon, parentElement?: Element, style?: Style): Element {
    const newElement = this.document.createElementNS(xmlns, 'polygon');

    const points = p.points();
    const pointString = points.map(p => `${p.x},${p.y}`).join(' ');

    newElement.setAttributeNS(null, 'points', pointString);
    this.applyStyling(newElement, style);

    this.addElement(newElement, parentElement);
    return newElement;
  }

  /**
   * Adds a vector to an SVG image.
   */
  addVector(p:Point, v: Vector, parentElement?: Element, style?: Style)
    : Element {
    const newElement = this.document.createElementNS(xmlns, 'g');
    const p2 = p.plus(v);
    const ls = this.addLineSegment(lineSegment(p.x, p.y, p2.x, p2.y), newElement);
    this.applyStyling(ls, style);
    this.addPolygon(createArrow(v.norm2() / 8.0, p.plus(v), v), newElement, style);
    this.addElement(newElement, parentElement);

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

  /**
   * Applies the styling to this element. The applied style
   * will be a mixture of the configured defaults for this
   * visualizer combined with the override values.
   */
  private applyStyling(e: Element, overrides?: Style) {

    const style = Object.assign({}, this.style, overrides);

    const attributeString = [...Object.keys(style)]
    .map((k) => { return { key: k, value: `${(style as {[key: string]: any})[k]}` }; })
    .filter(v => v.value !== undefined)
    .map(({ key, value }) => `${camelToSnakeCase(key)}:${value}`)
    .join(';');

    e.setAttributeNS(null, 'style', attributeString);
  }

  /**
   * Adds the element e to either the parentElement, or if it is null,
   * to the element associated to this visualizer.
   */
  private addElement(e: Element, parentElement?: Element) {
    if (parentElement !== undefined) {
      parentElement.appendChild(e);
    } else {
      this.parentElement.appendChild(e);
    }
  }
}
