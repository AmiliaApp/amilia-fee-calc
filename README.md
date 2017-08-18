# Credit Card Fee Calculator

Calculator to determine fees charged for an online payment. Run it here:
https://amiliaapp.github.io/amilia-fee-calc/

## Backbone Web App

This little Web App calculates fees on a credit card transaction, including taxes.
Settings are persisted in local storage. The app is responsive (Bootstrap) and works well on mobile and desktop.
The App is built using Backbone and serves as a good example of a minimalist Web App without fuss.

## Good Principles
I tried to follow some best practices in order to make things clean.

### Mobile friendly
Use of proper META tags to tell mobile browsers to behave in `index.html`:
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
<meta name="mobileoptimized" content="0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
```
Some references about those:
- [Supported Meta Tags - Mobile Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
- [Configuring the Viewport - Mobile Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html)

Use of the `window.navigator.standalone` property to detect if opened as an app on Safari. Allows me to provide extra padding at the top not to overlap with the status bar.

TODO: Still need to handle Adroid properly to. [Read this](https://dzone.com/articles/home-screen-web-apps-android).

### Business logic and validation are done in the model
The model contains a set of default attributes, business logic methods `validate` and `calculate`, and finally, a `toRender` method used to present an aggregate of all information a view requires to display things to a human. The `toRender` renders a ViewModel object - just like in .NET MVC. Its a good convention to use in order to avoid having the view augment itself an object obtained from `toJSON`.

### Model-View architecture
The app contains 2 views `Backbone.ConfigurationView` and `Backbone.CalculatorView` which are visually separate.
They both share the same model `Backbone.CalculatorModel`.
The views use [Backform](http://amiliaapp.github.io/backform/) to generate forms. It provides two-way bindings for Bootstrap forms.

I tried to avoid `jQuery` spaghetti code by levering Backbone and Backform. For instance, I use Backbone.View's `events` hash to handle DOM events. It uses [event delegation](http://backbonejs.org/#View-events) to bind clicks to methods in the view. Avoids to writing boilterplate. Backform handles the two-way bindings between the model and the DOM for the forms.

### Inline HTML templates
Thansk to [ES6 Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), I cleanly inlined HTML templates in the views. Using [Underscore's `template` helper](http://underscorejs.org/#template) to handle HTML rendering, I can interpolate variables (passed by the model) and execute Javascript code. This allows me to keep the `index.html` file very clean with only the skeleton of the DOM. Javascript handles rendering the meat on top.

### Rendering convention
Views contain multiple templates allowing me to separate render-once content from content that needs to be refreshed when the model changes. I used a convention whereby the `render` method is only called once to set up the view. I created `render*` methods to arbitrarely render dynamic portions when the model changes. When a change is done in the UI, the model is set. Event listeners are set up (using Backbone.View's `listenTo` method) in order to trigger a re-render of affected view parts.

Unlike [React](https://facebook.github.io/react/) and [Vue.js](https://vuejs.org/) who use virtual DOMs to black-box DOM manipulations, with Backbone you must consider not to replace an INPUT element when it is being edited. Breaking your view into static vs dynamic portions allows you to cleanly overcome this problem.

### No transpilation, no fuss
Javascript is interpreted and forutnately the ES6 feature I use (template literals) is supported by major browsers. Fuck transpilation. Keep things simple.