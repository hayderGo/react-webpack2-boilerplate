/* eslint react/prop-types: 0 */
import React from 'react';

function CustomTextInput() {
  // textInput必须在这里声明，所以 ref 回调可以引用它
  let textInput = null;
  function handleClick() {
    textInput.focus();
  }
  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }}
      />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}

export default CustomTextInput;
