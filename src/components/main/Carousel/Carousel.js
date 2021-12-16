import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CarouselItem from "./CarouselItem";
import { mapToCssModules } from "./utils";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
    this.state = {
      activeIndex: this.props.activeIndex,
      direction: this.props.direction,
    };
  }
  getChildContext() {
    return { direction: this.state.direction };
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {
      activeIndex: nextProps.activeIndex,
      direction: nextProps.direction,
    };

    return newState;
  }

  renderItems(carouselItems, className) {
    const { slide } = this.props;
    return (
      <div className={className}>
        {carouselItems.map((item, index) => {
          const isIn = index === this.state.activeIndex;
          return React.cloneElement(item, {
            in: isIn,
            slide: slide,
          });
        })}
      </div>
    );
  }

  render() {
    const { cssModule, slide, className } = this.props;
    const outerClasses = mapToCssModules(
      classNames(className, "carousel", slide && "slide"),
      cssModule
    );

    const innerClasses = mapToCssModules(
      classNames("carousel-inner"),
      cssModule
    );

    // filter out booleans, null, or undefined
    const children = this.props.children.filter(
      (child) =>
        child !== null && child !== undefined && typeof child !== "boolean"
    );

    const slidesOnly = children.every((child) => child.type === CarouselItem);

    // Rendering only slides
    if (slidesOnly) {
      return (
        <div className={outerClasses}>
          {this.renderItems(children, innerClasses)}
        </div>
      );
    }

    const carouselItems = children[1];
    const controlLeft = children[2];
    const controlRight = children[3];

    return (
      <div className={outerClasses}>
        {this.renderItems(carouselItems, innerClasses)}
        {controlLeft}
        {controlRight}
      </div>
    );
  }
}

Carousel.propTypes = {
  // the current active slide of the carousel
  activeIndex: PropTypes.number,
  // a function which should advance the carousel to the next slide (via activeIndex)
  next: PropTypes.func.isRequired,
  // a function which should advance the carousel to the previous slide (via activeIndex)
  previous: PropTypes.func.isRequired,
  // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
  // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
  ride: PropTypes.oneOf(["carousel"]),
  children: PropTypes.array,
  // called when the mouse enters the Carousel
  mouseEnter: PropTypes.func,
  // called when the mouse exits the Carousel
  mouseLeave: PropTypes.func,
  // controls whether the slide animation on the Carousel works or not
  slide: PropTypes.bool,
  cssModule: PropTypes.object,
  className: PropTypes.string,
};

Carousel.defaultProps = {
  slide: true,
};

Carousel.childContextTypes = {
  direction: PropTypes.string,
};

export default Carousel;
