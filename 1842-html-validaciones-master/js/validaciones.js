/* export sirve para que podamos usarlo en app.js, aquí invalida se está usando en ese 
archivo, lo que nos dice calida es que recibe el input, una vez lo hace, determina el tipo
de input que es y establece una condicional, de acuerdo al tipo de input que tiene validadores
es que se agrega el input*/
export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
/*verifica que si es válido coloca la clase que corresponde a correcto, se está colocando
al padre con el parentElement*/
  if (input.validity.valid) {
    //aquí quita el invalid
    input.parentElement.classList.remove("input-container--invalid");
    //esto "vacía" o quita el texto descritprivo, es un string vacío
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    /*de lo contrario agrega la class list inválida, que convierte en rojo el input y arroja
    un mensaje de error*/
    input.parentElement.classList.add("input-container--invalid");
    //esto muestra el mensaje de error de acuerdo al tipo de input
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

// array con los tipos de errores almacenados 
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

//este es un objeto, donde definimos el tipo de error, tendremos un mensaje en especifico
const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};
//aquí definimos validadores
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

/* función que se usa en invalida, recibe el tipo de input e input*/
function mostrarMensajeDeError(tipoDeInput, input) {
  //mensaje entra como string vacío
  let mensaje = "";
  //recorre tipo de errores, recordando que pasa por todo el array
  tipoDeErrores.forEach((error) => { 
    if (input.validity[error]) { //si hay un error en el validity, entonces...
      console.log(tipoDeInput, error); 
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
