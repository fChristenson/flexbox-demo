var logo = function(spec) {

    'use strict';

  /*
      Just making sure the spec is available
      and if not we use defaults.
  */
  spec = (!!spec) ? spec : {};

  // configs and their defaults
  var config = {

    delay: spec.delay || 50,
    text: spec.text || 'Header',
    isRunningAnimation: false, // a bool to make sure we dont fire events if the animation is running
    elements: {
      // keeping track of our elements
      container: undefined,
      top: undefined,
      text: undefined,
      bottom: undefined,
      right: undefined,
      left: undefined

    },
    styles: {
      // keeping track of our element styles
      container: {

          'padding': '5px',
          'width': '205px',
          'text-align': 'center',
          'position': 'relative',
          'cursor': 'pointer'

      },
      top: {

          'background': '#fff',
          'position': 'absolute',
          'top': '0',
          'width': '0',
          'height': '2px',
          'transition': 'width 0.2s ease-in',
          'left': '-0.3px'

      },
      text: {

          'color': '#fff',
          'font-size': '4em',
          'text-transform': 'uppercase',
          'font-weight': 'lighter',
          'letter-spacing': '5px'

      },
      bottom: {

          'width': '0',
          'height': '2px',
          'transition': 'width 0.2s ease-in',
          'left': '-0.3px',
          'position': 'absolute',
          'background': '#fff',
          'bottom': '0'

      },
      left: {

          'background': '#fff',
          'position': 'absolute',
          'top': '0',
          'width': '2px',
          'height': '0',
          'transition': 'height 0.2s ease-in',
          'left': '-0.3px'

      },
      right: {

          'background': '#fff',
          'position': 'absolute',
          'top': '0',
          'width': '2px',
          'height': '0',
          'transition': 'height 0.2s ease-in',
          'right': '0'

      }

    }

  };

  /*
      This grows all the border surrounding the text.
      This is intended to be put in the logos onmouseover attribute.
  */
  function growBorders() {

    config.isRunningAnimation = !config.isRunningAnimation;

    if(config.isRunningAnimation) {

      config.elements.top.style.width = '100.1%';

      setTimeout(function() {

        config.elements.bottom.style.width = '100.1%';

        setTimeout(function() {

          config.elements.right.style.height = '100%';

          setTimeout(function() {

            config.elements.left.style.height = '100%';
            config.isRunningAnimation = false;

          }, config.delay);

        }, config.delay);

      }, config.delay);

    }

  }

  /*
      This shrinks the border back to 0.
      It is intended to be put in the containers onmouseout attribute.
  */
  function shrinkBorders() {

    config.isRunningAnimation = !config.isRunningAnimation;

    if(config.isRunningAnimation) {

      setTimeout(function() {

        config.elements.top.style.width = '0';
        config.elements.bottom.style.width = '0';
        config.elements.right.style.height = '0';
        config.elements.left.style.height = '0';
        config.isRunningAnimation = false;

      }, config.delay);

    }
  }

  /*
      Takes a string type and a style object and returns a new element.
      This way we can create the logo elements.
  */
  function createElement(type, style) {

    var element = document.createElement(type);
    var keys = Object.keys(style);

    keys.forEach(function(key) {

      element.style[key] = style[key];

    });

    return element;
  }

  /*
      Using our createElement helper we create a container
      with 4 divs that surround a h1 with the logo text.
  */
  function buildLogo() {

    config.elements.container = createElement('div', config.styles.container);
    config.elements.top = createElement('div', config.styles.top);
    config.elements.text = createElement('h1', config.styles.text);
    config.elements.text.innerHTML = config.text;
    config.elements.bottom = createElement('div', config.styles.bottom);
    config.elements.left = createElement('div', config.styles.left);
    config.elements.right = createElement('div', config.styles.right);

    config.elements.container.appendChild(config.elements.top);
    config.elements.container.appendChild(config.elements.text);
    config.elements.container.appendChild(config.elements.bottom);
    config.elements.container.appendChild(config.elements.left);
    config.elements.container.appendChild(config.elements.right);

    config.elements.container.onmouseover = growBorders;
    config.elements.container.onmouseout = shrinkBorders;

    return config.elements.container;

  }

  return buildLogo();

};
