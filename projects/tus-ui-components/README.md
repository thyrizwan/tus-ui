
# **[TUS Components]**

[![npm version](https://badge.fury.io/js/tus-ui-components.svg)](https://badge.fury.io/js/tus-ui-components) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This package provides a set of Angular UI components designed for modern web applications, including buttons, checkboxes, date pickers, inputs, and more. It leverages Angular 18.2.4 standalone features along with TailwindCSS for styling.

## **Table of Contents**
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Components](#available-components)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## **Installation**

Make sure your project is using Angular version 18.2.4 standalone. Then install the package:

```bash
npm install tus-ui-components
```
or
```bash
npm install tus-ui-components --save
```

Install required dependencies for styling:

```bash
npm install postcss autoprefixer tailwindcss --save-dev
```

Set up TailwindCSS in your project. Add a `tailwind.config.js` file:

```js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode:'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Update your `styles.css` or `styles.scss`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## **Getting Started**

Import the components you need into your Angular standalone components or modules:

```typescript
import { Component } from '@angular/core';
import { TusButton, TusInput, TusDatePicker } from 'tus-ui-components';

@Component({
  standalone: true,
  imports: [TusButton, TusInput, TusDatePicker],
  template: `
    <tus-button (click)="onClick()">Click Me</tus-button>
    <tus-input placeholder="Enter something"></tus-input>
    <tus-date-picker></tus-date-picker>
  `
})
export class ExampleComponent {
  onClick() {
    console.log('Button clicked');
  }
}
```

---

## **Available Components**

The following components are available in the package:

1. **`<tus-button>`**: A customizable button.
2. **`<tus-check-box>`**: A checkbox input element.
3. **`<tus-custom-date-picker>`**: A custom date picker with additional options.
4. **`<tus-date-picker>`**: A basic date picker.
5. **`<tus-dial-code>`**: A component to select country dial codes.
6. **`<tus-phone-number>`**: A phone number input field with dial code support.
7. **`<tus-input>`**: A customizable text input.
8. **`<tus-select>`**: A dropdown select component.
9. **`<tus-table>`**: A customizable data table.
10. **`<tus-text-area>`**: A text area for larger inputs.

---

## **API Documentation**

### **tus-button**

The `tus-button` component is a customizable button with support for loading states, dynamic sizing, and disabled states. It also emits an event when clicked.

#### **Input Properties:**

- **`type: string`** (default: `'submit'`)  
  Defines the button type (`'submit'`, `'button'`, etc.).
  
- **`isLoading: boolean`** (default: `false`)  
  Controls whether a loading spinner is shown on the button.

- **`title: string`** (default: `'Save'`)  
  The button's text label.

- **`isSkeletonLoading: boolean`** (default: `false`)  
  Displays a skeleton loading effect if true.

- **`isDisabled: boolean`** (default: `false`)  
  Disables the button when set to true.

- **`isWidth: string`**  
  Allows for dynamic width classes, especially useful when using TailwindCSS. You can pass custom width classes like `'lg:w-56'`.

- **`height: string`**  
  Specifies the button's height, which can be a custom value like `px`, `%`, `em`, etc.

#### **Output Events:**

- **`onClick: EventEmitter<any>`**  
  Emits an event when the button is clicked.

#### **Methods:**

- **`onButtonClick()`**  
  This method triggers the `onClick` event emitter when the button is clicked.

---

### **Example Usage**

Here’s how you can use the `<tus-button>` component in your template:

```html
<tus-button
  title="Button Title Here"
  [isWidth]="'lg:w-56'"
  [isLoading]="false"
  [isSkeletonLoading]="false"
  (onClick)="handleClick()"
></tus-button>
```

#### **Explanation:**

- **`title="Button Title Here"`**  
  Sets the button's label to "Button Title Here."

- **`[isWidth]="'lg:w-56'"`**  
  Applies the TailwindCSS width class `lg:w-56` to the button.

- **`[isLoading]="false"`**  
  Disables the loading spinner on the button. You can set this to `true` to show a spinner when the button is clicked.

- **`[isSkeletonLoading]="false"`**  
  Disables the skeleton loading effect.

- **`(onClick)="handleClick()"`**  
  Binds the `onClick` event to a method named `handleClick()` in your component class.

---

### **Component Class Example:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <tus-button
      title="Submit"
      [isWidth]="'lg:w-56'"
      [isLoading]="isLoading"
      [isSkeletonLoading]="false"
      (onClick)="handleClick()"
    ></tus-button>
  `
})
export class ExampleComponent {
  isLoading = false;

  handleClick() {
    this.isLoading = true;
    // Add your logic here, e.g., saving data.
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simulate loading for 2 seconds.
  }
}
```

---

## **Configuration**

If your components require customization, users can override default configurations like styles using TailwindCSS.

Example:

```css
@layer components {
  .tus-button {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

---

## **Dependencies**

Your Angular project should include the following dependencies:

- **Angular**: Version 18.2.4 standalone
- **PostCSS**
- **Autoprefixer**
- **TailwindCSS**

Ensure that you have these dependencies installed and configured in your project.

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

