## Hunel React Credit Card

![npm](https://img.shields.io/npm/v/reactjs-credit-card)

[**Github** ](https://github.com/huneljs/reactjs-credit-card 'Github ')

[**Demo** ](https://reactjs-credit-card-example-xo1yaqfuf-huneljs.vercel.app/ 'Demo ')

[**For Demo Files** ](https://github.com/huneljs/reactjs-credit-card-example/tree/master/src/ 'For Demo Files ')

Hunel React Credit Card System is a completely customizable credit card component and validation system.

### Installation

`npm install reactjs-credit-card --save`

- [Hunel React Credit Card](#hunel-react-credit-card)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Get form data and validation with Hook](#get-form-data-and-validation-with-hook)
  - [Get form data and validation with HOC](#get-form-data-and-validation-with-hoc)
  - [Customization](#customization)
    - [Customization for HunelCreditCard Instance](#customization-for-hunelcreditcard-instance)
      - [Config Object](#config-object)
  - [Card Type Support](#card-type-support)
  - [IF You Dont't Use Webpack Image Loader](#if-you-dont-t-use-webpack-image-loader)

### Usage

Create a HunelCrediCard instance and Wrap any component with HunelProvider;
index.js;

```jsx
import { HunelProvider, HunelCreditCard } from 'reactjs-credit-card';

const hunel = new HunelCreditCard();

ReactDOM.render(
  <HunelProvider config={hunel}>
    <App />
  </HunelProvider>,
  document.getElementById('root')
);
```

Now we can import Card and form components in any component which wrapped with HunelProvider.
Card component is our virtual card.
Form components are our form components which can completely customizable.

App.js;

```jsx
import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from "reactjs-credit-card/form";
import Card from "reactjs-credit-card/card";

export default function App(){
return (<div>
<Card />
<form>
    <CardNumber placeholder="Card Number" />
    <CardHolder placeholder="Card Holder" />
    <ValidThruMonth />
    <ValidThruYear />
    <CardSecurityCode placeholder="CVV" className="input-text semi" />
    <button>Submit</button>
<form>
</div>);
}
```

### Get form data and validation with Hook

We can get form data object with hook and hoc.Hook and hoc returns a function.When we called this function,It returns an array which has data object and general verification result.
Also data object has special verification result for each form component.

Then let's more develop on App component and declare a hook and also little bit customize form components;

```jsx
import './style.css';
import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from 'reactjs-credit-card/form';
import Card from 'reactjs-credit-card/card';
import { useCardForm } from 'reactjs-credit-card';
import { useState } from 'react';

function App() {
  const getFormData = useCardForm();
  const [numberValid, setNumberValid] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const [data, isValid] = getFormData();

    console.log(data, isValid); //log all form data and verification results

    if (!data.number.isValid) setNumberValid(false); //we'll set a hook to show a error if card number is invalid
    //check the general verification result and alert with special verification result
    if (!isValid)
      alert(
        `${data.holder.value} form data values invalid :) and holder also ${
          data.holder.isValid ? 'valid' : 'invalid'
        }`
      );
  }

  //remove error function if focused on CardNumber
  function handleFocus() {
    setNumberValid(true);
  }

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          //If numberValid state is false then show a error
          <CardNumber
            placeholder="Card Number"
            className={`input-text${!numberValid ? ' error' : ''}`}
            onFocus={handleFocus}
          />
          <CardHolder placeholder="Card Holder" className="input-text" />
          <div className="flex-wrapper">
            <div className="semi flex-wrapper">
              <ValidThruMonth className="input-text semi" />
              <ValidThruYear className="input-text semi" />
            </div>
            <CardSecurityCode placeholder="CVV" className="input-text semi" />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
      //fixClass property is used to change all card components sizes by changing
      font-size //default fonts-size 11px.
      <Card fixClass="fix-new" cardClass="card-new" />
    </div>
  );
}
```

you can take a look [reactjs-credicard-example](https://github.com/huneljs/reactjs-credit-card-example/blob/master/src/app.js 'reactjs-credicard-example')

### Get form data and validation with HOC

We can get form data and verification results with hoc.Let's modify the same example with hoc;

```jsx
import './style.css';
import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from 'reactjs-credit-card/form';
import Card from 'reactjs-credit-card/card';
import { cardForm } from 'reactjs-credit-card'; //import the HOC
import { useState } from 'react';

function App({ getCardForm }) {
  const [numberValid, setNumberValid] = useState(true);
  //we can get getCardForm property like hook usage after wrap the App component with HOC
  function handleSubmit(e) {
    const [data, isValid] = getCardForm();
    e.preventDefault();
    console.log(data, isValid); //log all form data and verification results

    if (!data.number.isValid) setNumberValid(false); //we'll set a hook to show a error if card number is invalid
    //check the general verification result and alert with special verification result
    if (!isValid)
      alert(
        `${data.holder.value} form data values invalid :) and holder also ${
          data.holder.isValid ? 'valid' : 'invalid'
        }`
      );
  }

  //remove error function if focused on CardNumber
  function handleFocus() {
    setNumberValid(true);
  }

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          //If numberValid state is false then show a error
          <CardNumber
            placeholder="Card Number"
            className={`input-text${!numberValid ? ' error' : ''}`}
            onFocus={handleFocus}
          />
          <CardHolder placeholder="Card Holder" className="input-text" />
          <div className="flex-wrapper">
            <div className="semi flex-wrapper">
              <ValidThruMonth className="input-text semi" />
              <ValidThruYear className="input-text semi" />
            </div>
            <CardSecurityCode placeholder="CVV" className="input-text semi" />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
      //fixClass property is used to change all card components sizes by changing
      font-size //default fonts-size 11px.
      <Card fixClass="fix-new" cardClass="card-new" />
    </div>
  );
}
export default cardForm(App); //wrap with hoc
```

### Customization

We can add any default property to the form components;

```jsx
<CardHolder
  placeholder="Card Holder"
  className="input-text"
  onBlur={handleOnBlur}
  onAnimationEnd={handleAnimationEnd}
  onAnimationStart={handleAnimationStart}
/>
```

Card component accept 2 property which fixClass and cardClass.
fixClass uses to change the Card component size.
cardClass uses styling the Card component.

```jsx
<Card fixClass="fix-new" cardClass="card-new" />
```

```css
.fix-new {
  font-size: 10px !important; /*we can easly set the credit card size*/
}
.card-new {
  background: url(./any_pattern.jpg) !important; /*also we can easly set the credit card background*/
}
```

#### Customization for HunelCreditCard Instance

HunelCreditCard's constructer accept a object for customizing.But you don't have to declare a config object.

##### Config Object

For now config object has middlePartHide property which default value false.
middlePartHide is uses to hide the credit card number on the Card component.

```jsx
import { HunelProvider, HunelCreditCard } from 'reactjs-credit-card';

//you can declare a object
const hunel = new HunelCreditCard({
  middlePartHide: false,
});

//also you can create instance without declare a config object
ReactDOM.render(
  <HunelProvider config={hunel}>
    <App />
  </HunelProvider>,
  document.getElementById('root')
);
```

### Card Type Support

For now Mastercard,Visa,American Express and Discover card types have support.

### IF You Dont't Use Webpack Image Loader

If you don't use webpack image loader then you can download the image files as manuel.And after download extract the files to public file
[**Download the images** ](https://github.com/huneljs/reactjs-credit-card/tree/master/card.zip 'Download the images ')
