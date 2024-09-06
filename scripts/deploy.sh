# script to deploy to gh pages
# run with npm run deploy
vite build
cp -r ./examples ./dist
cp -r ./lib ./dist
gh-pages -d dist
