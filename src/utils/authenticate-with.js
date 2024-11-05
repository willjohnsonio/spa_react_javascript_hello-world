export default function authenticateWith(state, connection) {
    // Create a hidden form
    const form = document.createElement("form");
    form.method = "POST";
    form.style.display = "none";
  
    for (const [key, value] of Object.entries({
      state: state,
      connection: connection,
    })) {
      const input = document.createElement("input");
      input.value = value;
      input.name = key;
      form.appendChild(input);
    }
  
    // Append and submit form
    document.body.appendChild(form);
    form.submit();
  }