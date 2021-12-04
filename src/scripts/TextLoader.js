import anime from 'animejs/lib/anime.es.js';
import '../styles/text-loader.scss';

export default class TextLoader {
  constructor( htmlArray, options ) {
    this.settings = {
      delay: 3000, // the delay of loading each line
      parent: document.body,
    };

    this.lines = htmlArray;
    Object.assign( this.settings, options );

    this.addDomElements();
    this.run();
  }

  addDomElements() {
    this.bg = document.createElement("div");
    this.bg.classList.add( 'text-loader-bg' );

    this.container = document.createElement( 'div' );
    this.container.classList.add( 'container' );
    this.bg.append( this.container );

    this.overlay = document.createElement( 'div' );
    this.overlay.classList.add( 'overlay' );
    this.bg.append( this.overlay );

    this.settings.parent.appendChild( this.bg );
    this.lines.map( line => {
      const lineEl = document.createElement( 'div' );
      lineEl.innerHTML = line;
      lineEl.classList.add( 'line' );
      this.container.appendChild( lineEl );
    });
  }

  run() {
    console.log( this.lines, anime );
    this.container.translateY = '-100%';
    let totalTransform = 0;
    const transforms = [ ...document.querySelectorAll('.text-loader-bg .line') ].map( ( lineEl ) => {
      totalTransform -= lineEl.clientHeight / 2.0;
      return totalTransform;
    });

    transforms.pop();

    console.log( transforms );
    var basicTimeline = anime.timeline();
    basicTimeline.add({
      targets: '.text-loader-bg .line',
      easing: 'linear',
      duration: this.settings.duration,
      keyframes: [
        {opacity: 0},
        {
          opacity: 1,
          duration: 200,
        },
      ],
      delay: function(el, i) {
        return this.settings.delay * i;
      }.bind( this ),
    });

    anime.timeline().add({
      easing: 'easeOutQuart',
      targets: '.text-loader-bg .container',
      translateY: transforms,
      delay: this.settings.delay,
      duration: this.settings.delay * ( this.lines.length - 1),
    });

    anime.timeline().add({
      easing: 'linear',
      targets: '.text-loader-bg',
      opacity: [1,0.85],
      delay: this.settings.delay * 2,
      duration: this.settings.delay * ( this.lines.length - 2),
    });
  }
}

