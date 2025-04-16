const fs = require('fs');

const tokenSets = ['core', 'light', 'dark', 'theme', 'Global', 'test'];
let mergedTokens = {};

// read all sets from tokens/tokens.json
const allTokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf-8'));

// merge them
tokenSets.forEach(set => {
  if (allTokens[set]) {
    mergedTokens = {
      ...mergedTokens,
      ...allTokens[set]
    };
  }
});

// save merged
fs.writeFileSync('tokens/merged-tokens.json', JSON.stringify(mergedTokens, null, 2));

module.exports = {
  source: ['tokens/merged-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    }
  }
};
