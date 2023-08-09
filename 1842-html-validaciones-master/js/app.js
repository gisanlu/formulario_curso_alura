import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});

/* con esto lo que hace es llamar a todos los inputs, donde para cada input agrega el evento 
de blur, que es cuando quitamos el mouse del elemento, cuando sale el usuario del input
que estaba rellenando, ahí por medio de una función anonima hacer que valida comience*/