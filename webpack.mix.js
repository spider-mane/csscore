const mix = require('laravel-mix');

mix
  /**
   * Basics
   */
  .setResourceRoot('src')
  .setPublicPath('dist')
  .sourceMaps(true, 'eval-source-map', 'source-map')
  .version()

  /**
   * Browsersync
   */
  .browserSync({proxy: 'csscore.test'})

  /**
   * Javascript
   */
  .js('src/js/index.js', 'dist/js/csscore.js')
  .extract()

  /**
   * Sass
   */
  .sass('src/scss/main.scss', 'dist/css/csscore.css', {
    sassOptions: {
      outputStyle: 'expanded',
    },
  })

  /**
   * Options
   */
  .options({
    processCssUrls: false,
  });
