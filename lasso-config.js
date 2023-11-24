module.exports = {
  plugins: [
    'lasso-less', // Include if you are using LESS
    'lasso-marko', // Include if you are using Marko templates
  ],
  outputDir: 'dist/static', // Adjust the output directory based on your project structure
  bundlingEnabled: true, // Enable or disable bundling
  fingerprintsEnabled: true, // Enable or disable fingerprints in asset URLs
  minify: true, // Enable or disable minification
  require: {
    transforms: [
      {
        transform: 'lasso-babel-transform', // Include if you want to use Babel for ES6+ support
      },
    ],
  },
  bundles: [
    {
      name: 'common', // Name of the bundle
      dependencies: [
        // Add dependencies to include in this bundle
        'jquery',
        'bootstrap',
        'tailwindcss',
        'flowbite',
      ],
    },
  ],
  // Additional configuration options...
};
