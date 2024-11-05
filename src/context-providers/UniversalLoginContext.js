import { createContext, useState } from "react";
import base64UrlToUint8Array from "../utils/base64-url-to-uint8-array";


const UniversalLoginContext = createContext({
  state: "",
  prompt: "",
  screen: "",
  captcha: { enabled: false, metadata: {} },
  getLink: (_name)  => "",
  getAction: (_name) => "",
  getSubmittedFormData: (_name) => "",
  getTransactionParam: (_name) => "",
  getPromptErrors: () => [],
  getFieldErrors: (_field) => [],
  getPasskeyConfig: () => ({}),
});

export const UniversalLoginContextProvider = (props) => {
  const context_data = window.universal_login_transaction_data;

  const state = context_data.state;
  const prompt = context_data.prompt.name;
  const screen = context_data.screen.name;
  const captcha = context_data.captcha;

  const links  = context_data.links;
  const actions = context_data.actions;
  const unsafe_data = context_data.unsafe_data;
  const submitted_form_data =
    unsafe_data.submitted_form_data;
  const transaction_params =
    unsafe_data.transaction_params;
  const passkey_config = context_data.passkey_config;

  const [errors, setErrors] = useState(context_data.errors);

  if (passkey_config?.publicKey) {
    passkey_config.publicKey.challenge = base64UrlToUint8Array(
      passkey_config.publicKey.challenge,
    );
    if (passkey_config.publicKey.user?.id) {
      passkey_config.publicKey.user.id = base64UrlToUint8Array(
        passkey_config.publicKey.user.id,
      );
    }
  }

  const getLink = function (name) {
    return links[name] ?? "";
  };

  const getAction = function (name) {
    return actions[name] ?? "";
  };

  const getSubmittedFormData = function (name) {
    return submitted_form_data[name] ?? "";
  };

  const getTransactionParam = function (name) {
    return transaction_params[name] ?? "";
  };

  const getPromptErrors = function () {
    return errors.filter((error) => !error.usedField);
  };

  // we set a flag of usedField to true for each error that is returned
  // this allows the above promptErrors to act as a catchall if a field
  // hasn't yet been implemented
  const getFieldErrors = function (field) {
    let updatedField = false;
    const newErrors = errors
      .filter((error) => error.field === field)
      .map((error) => {
        if (error.usedField) return error;
        updatedField = true;
        return {
          ...error,
          usedField: true,
        };
      });

    // Only update the state if something has changed or else we'd
    // end up in an infinite loop
    if (updatedField) {
      setErrors(newErrors);
    }

    return newErrors;
  };

  const getPasskeyConfig = function () {
    return passkey_config;
  };

  return (
    <UniversalLoginContext.Provider
      value={{
        state,
        prompt,
        screen,
        captcha,
        getLink,
        getAction,
        getSubmittedFormData,
        getTransactionParam,
        getPromptErrors,
        getFieldErrors,
        getPasskeyConfig,
      }}
    >
      {props.children}
    </UniversalLoginContext.Provider>
  );
};

export default UniversalLoginContext;