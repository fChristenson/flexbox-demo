var hamburgerMenu = function(spec) {

    'use strict';

    /*
        Just making sure the spec is available
        and if not we use defaults.
    */
    spec = (!!spec) ? spec : {};

    // placeholder callback
    function defaultLog() {

        console.log('click');

    }

    // configs and their defaults
    var config = {

      callback: spec.callback || defaultLog,
      isActive: spec.isActive || false, // bool to track if menu is in active state
      isRunningAnimation: false, // a bool to make sure we dont fire events if the animation is running
      elements: {
        // keeping track of our elements
        container: undefined,
        bar1: undefined,
        bar2: undefined,
        bar3: undefined

      },
      styles: {
        // keeping track of our element styles
        container: {
            "width": "40px",
            "height": "40px",
            "background": "none",
            "border": "0",
            "cursor": "pointer",
            "position": "relative"
        },
        bar1: {
            "height": "3px",
            "background": "#fff",
            "position": "absolute",
            "top": "10px",
            "left": "5px",
            "width": "30px",
            "transform": "rotate(0deg)",
            "transition": "transform 0.2s ease-in-out, top 0.2s ease-in-out"
        },
        bar2: {
            "height": "3px",
            "background": "#fff",
            "position": "absolute",
            "top": "18px",
            "left": "5px",
            "width": "30px",
            "opacity": "1",
            "transition": "opacity 0.2s ease-in-out"
        },
        bar3: {
            "height": "3px",
            "background": "#fff",
            "position": "absolute",
            "top": "26px",
            "left": "5px",
            "width": "30px",
            "transform": "rotate(0deg)",
            "transition": "transform 0.2s ease-in-out, top 0.2s ease-in-out"
        },
        onClick: {
            // styles for focused state
            container: {
                "background": "#D14130"
            },
            bar1: {
                "transform": "rotate(40deg)",
                "top": "50%"
            },
            bar2: {
                "opacity": "0"
            },
            bar3: {
                "transform": "rotate(-40deg)",
                "top": "50%"
            }
        }
      }

    };

    /*
        Maps over props from one object to another.
        Returns the updated object.
    */
    function mapProps(obj1, obj2) {

        var keys = Object.keys(obj1);

        keys.forEach(function(key) {

          obj2[key] = obj1[key];

        });

        return obj2;

    }

    /*
        Sets new styles on click.
        This should run a animation and call the provided callback.
    */
    function onClickHandler() {

        if(config.isActive) {

            mapProps(config.styles.container, config.elements.container.style);

            mapProps(config.styles.bar1, config.elements.bar1.style);
            mapProps(config.styles.bar2, config.elements.bar2.style);
            mapProps(config.styles.bar3, config.elements.bar3.style);

            config.isActive = false;

        } else {

            mapProps(config.styles.onClick.container, config.elements.container.style);

            mapProps(config.styles.onClick.bar1, config.elements.bar1.style);
            mapProps(config.styles.onClick.bar2, config.elements.bar2.style);
            mapProps(config.styles.onClick.bar3, config.elements.bar3.style);

            config.isActive = true;

        }

        config.callback();

    }

    /*
        Takes a string type and a style object and returns a new element.
        This way we can create the logo elements.
    */
    function createElement(type, style) {

      var element = document.createElement(type);
      mapProps(style, element.style);
      return element;

    }

    /*
        Using our createElement helper we create a container
        with 4 divs that surround a h1 with the logo text.
    */
    function buildMenu() {

      config.elements.container = createElement('button', config.styles.container);
      config.elements.container.onclick = onClickHandler;

      config.elements.bar1 = createElement('div', config.styles.bar1);
      config.elements.bar2 = createElement('div', config.styles.bar2);
      config.elements.bar3 = createElement('div', config.styles.bar3);

      config.elements.container.appendChild(config.elements.bar1);
      config.elements.container.appendChild(config.elements.bar2);
      config.elements.container.appendChild(config.elements.bar3);

      return config.elements.container;

    }

    return buildMenu();

};
