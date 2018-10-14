# Summary
This is a project that has few aims.
At the first it is my personal site.
Also it is a challenging project for an investigation.
I am looking for a way of inexpensive projects using professional tools without reducing development quality.
The main point is to provide to a client what he needs exactly without extra features,
also reducing development recycling, make the whole project almost predictible with small deviations.
It have to reduce price for clients remaining the same price for functional item.
This project can be used as a template for a similar project.
It fits very well for same projects.
These have same functionality with a different look and different content. Feel free forking.
## My results you can watch here.
[![My results you can watch here.](https://img.youtube.com/vi/1YdpJKsdQeU/0.jpg)](https://www.youtube.com/watch?v=1YdpJKsdQeU)
## Articles these are based on the project.
* [Development approaches of Shelepen's Personal Site](http://vlikin.blogspot.com/2018/03/development-approaches-of-shelepens.html)
## Project features.
### Functional
* Landing page.
* Multilingual.
* GitHub hosted.
### Technical
* MaterializeCSS based.
* Babel based.
* Gets translated content from yml files.
* Compiles HTML sources from Jade templates.
## GitHub page deployment
Create a temporary branch.
```
git checkout -b gh-pages-preparation
```
Compile code
```
gulp default
```
Assemple the build
```
gulp build
```
Check results these were built.
```
gulp build-server
```
* Uncomment `build` folder in the file `.gitignore`
* Add the build and commit it
```
git add build
git commit -m "Initial dist subtree commit"
```
Publish the build to the branch gh-pages
```
git subtree push --prefix build origin gh-pages
```
Open in a browser
```
www.shelepen.com.ua
```
Delete the temporary branch
```
git branch -D gh-pages-preparation
```

## Test running
Protractor have to be installed, [look at](https://www.protractortest.org).
### Run tests on the desktop.
```
  protractor ./e2e/default.config.js 
```

### Run tests on the mobile.
```
  protractor ./e2e/mobile.config.js 
``` 
### Options
By default the test checks the local server ```http://localhost:3000```. You can define another URL.

## Links
* [Deploying a subfolder to GitHub Pages](https://gist.github.com/cobyism/4730490)