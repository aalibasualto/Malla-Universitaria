const ramos = [
  { nombre: "Cálculo I", id: "calculo1", dependientes: ["calculo2"] },
  { nombre: "Álgebra I", id: "algebra1", dependientes: ["algebra2"] },
  { nombre: "Física I", id: "fisica1", dependientes: ["fisica2"] },
  { nombre: "Intro Diseño Ing.", id: "introdiseno", dependientes: ["fundprog"] },
  { nombre: "Intro Ingeniería Ind.", id: "introind", dependientes: [] },

  { nombre: "Cálculo II", id: "calculo2", dependientes: ["calculo3"], requisitos: ["calculo1"] },
  { nombre: "Álgebra II", id: "algebra2", dependientes: ["ecuaciones", "investop"], requisitos: ["algebra1"] },
  { nombre: "Física II", id: "fisica2", dependientes: ["fisicamoderna"], requisitos: ["fisica1"] },
  { nombre: "Fund. Prog.", id: "fundprog", dependientes: ["programacion"], requisitos: ["introdiseno"] },
  { nombre: "Química y Termo", id: "quimica", dependientes: ["ingsistemas", "opprocesos"] },

  { nombre: "Inglés I", id: "ingles1", dependientes: ["ingles2"] },
  { nombre: "Cálculo III", id: "calculo3", dependientes: ["metodos", "investop"], requisitos: ["calculo2"] },
  { nombre: "Ecuaciones Dif.", id: "ecuaciones", dependientes: ["metnumingsis"], requisitos: ["algebra2"] },
  { nombre: "Fund. Economía", id: "economia", dependientes: ["micro", "tallerdise"] },
  { nombre: "Programación", id: "programacion", dependientes: ["disenodigital"], requisitos: ["fundprog"] },
  { nombre: "Física Moderna", id: "fisicamoderna", dependientes: ["opprocesos"], requisitos: ["fisica2"] },

  { nombre: "Inglés II", id: "ingles2", dependientes: ["ingles3"], requisitos: ["ingles1"] },
  { nombre: "Taller Diseño", id: "tallerdise", dependientes: ["innovacion"], requisitos: ["economia"] },
  { nombre: "Análisis Estadístico", id: "analisis", dependientes: ["estadisticaapli"] },
  { nombre: "Métodos Numéricos", id: "metodos", dependientes: ["modelamiento"], requisitos: ["calculo3"] },
  { nombre: "Ing. Sistemas", id: "ingsistemas", dependientes: ["admin", "tallergestion"], requisitos: ["quimica"] },
  { nombre: "Diseño Digital", id: "disenodigital", dependientes: ["tecnologia"], requisitos: ["programacion"] },

  // Puedes continuar la malla siguiendo este mismo patrón
];

const container = document.getElementById("malla-container");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.textContent = ramo.nombre;
  if (!ramo.requisitos || ramo.requisitos.length === 0) {
    div.classList.add("activo");
  }
  div.addEventListener("click", () => toggleAprobado(ramo));
  container.appendChild(div);
}

function toggleAprobado(ramo) {
  const div = document.getElementById(ramo.id);
  if (!div.classList.contains("activo")) return;

  const aprobado = div.classList.toggle("aprobado");

  if (aprobado) {
    // desbloquear dependientes
    (ramo.dependientes || []).forEach(depId => {
      const dep = ramos.find(r => r.id === depId);
      if (dep && requisitosCumplidos(dep)) {
        document.getElementById(dep.id).classList.add("activo");
      }
    });
  } else {
    // si lo desmarcas, desactiva dependientes en cadena
    desactivarEnCadena(ramo);
  }
}

function requisitosCumplidos(ramo) {
  return (ramo.requisitos || []).every(reqId => {
    const el = document.getElementById(reqId);
    return el && el.classList.contains("aprobado");
  });
}

function desactivarEnCadena(ramo) {
  (ramo.dependientes || []).forEach(depId => {
    const dep = ramos.find(r => r.id === depId);
    if (dep) {
      const el = document.getElementById(dep.id);
      if (el) {
        el.classList.remove("aprobado", "activo");
        desactivarEnCadena(dep);
      }
    }
  });
}

ramos.forEach(crearRamo);
