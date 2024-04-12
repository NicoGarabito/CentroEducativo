//Definimos clase persona
class Persona {
    constructor(nombre, apellidos, id, estadoCivil) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.id = id;
      this.estadoCivil = estadoCivil;
    }
  
    cambiarEstadoCivil(nuevoEstadoCivil) {
      this.estadoCivil = nuevoEstadoCivil;
    }
  
    toString() {
      return `Nombre: ${this.nombre} ${this.apellidos}\nID: ${this.id}\nEstado Civil: ${this.estadoCivil}`;
    }
  }
  
  //Definimos clase Empleado
  class Empleado extends Persona {
    constructor(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho) {
      super(nombre, apellidos, id, estadoCivil);
      this.anioIncorporacion = anioIncorporacion;
      this.despacho = despacho;
    }
  
    reasignarDespacho(nuevoDespacho) {
      this.despacho = nuevoDespacho;
    }

    toString() {
      return super.toString() + `\nAño de incorporación: ${this.anioIncorporacion}\nDespacho: ${this.despacho}`;
    }
  }
  
  //Definimos clase Estudiante
  class Estudiante extends Persona {
    constructor(nombre, apellidos, id, estadoCivil, curso) {
      super(nombre, apellidos, id, estadoCivil);
      this.curso = curso;
    }
  
    cambiarCurso(nuevoCurso) {
      this.curso = nuevoCurso;
    }

    toString() {
      return super.toString() + `\nCurso: ${this.curso}`;
    }
  }
  
  //Definimos clase Profesor
  class Profesor extends Empleado {
    constructor(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho, departamento) {
      super(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho);
      this.departamento = departamento;
    }

    toString() {
      return super.toString() + `\nDepartamento: ${this.departamento}`;
    }
  }
  
  //Definimos clase Personal de servicio
  class PersonalServicio extends Empleado {
    constructor(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho, seccion) {
      super(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho);
      this.seccion = seccion;
    }

    toString() {
      return super.toString() + `\nSección: ${this.seccion}`;
    }
  }

//Definimos clase CentroEducativo
class CentroEducativo {
  constructor() {
      this.personas = [];
  }

  altaPersona(persona) {
      this.personas.push(persona);
  }

  bajaPersona(id) {
      const indice = this.personas.findIndex(p => p.id === id);
      if (indice !== -1) {
          this.personas.splice(indice, 1);
      }
  }

  listarPersonas() {
      this.personas.forEach(persona => console.log(persona.toString()));
  }

  listarEstudiantes() {
      this.personas.filter(p => p instanceof Estudiante).forEach(persona => console.log(persona.toString()));
  }

  listarProfesores() {
      this.personas.filter(p => p instanceof Profesor).forEach(persona => console.log(persona.toString()));
  }

  listarPersonalServicio() {
      this.personas.filter(p => p instanceof PersonalServicio).forEach(persona => console.log(persona.toString()));
  }

  buscarPersonaPorId(id) {
    return this.personas.find(p => p.id === id);
  }
}

// Creamos una instancia ITS de Centro Educativo con datos
const ITS = new CentroEducativo();

const estudiante1 = new Estudiante("Juan", "Perez", "1001", "Soltero", "Matemáticas");
const estudiante2 = new Estudiante("María", "González", "1002", "Casada", "Historia");
const docente = new Profesor("Carlos", "López", "2001", "Soltero", 2015, "A1", "Ciencias");
const personalServicio = new PersonalServicio("Laura", "Martínez", "3001", "Divorciada", 2018, "Recepción", "Administración");

ITS.altaPersona(estudiante1);
ITS.altaPersona(estudiante2);
ITS.altaPersona(docente);
ITS.altaPersona(personalServicio);

document.addEventListener('DOMContentLoaded', () => {
    const altaBtn = document.getElementById('alta-btn');
    const altaOptions = document.getElementById('alta-options');

    altaBtn.addEventListener('click', () => {
        altaOptions.classList.toggle('hidden');
    });

 
  });

//Agrega estudiante desde formulario

document.addEventListener('DOMContentLoaded', () => {
  const estudianteForm = document.getElementById('estudiante-form');

  const submitBtn = document.getElementById('submit-estudiante');

      submitBtn.addEventListener('click', (e) => {
          e.preventDefault();

          const nombre = document.getElementById('nombre').value;
          const apellidos = document.getElementById('apellidos').value;
          const id = document.getElementById('id').value;
          const estadoCivil = document.getElementById('estado-civil').value;
          const curso = document.getElementById('curso').value;

          const estudiante = new Estudiante(nombre, apellidos, id, estadoCivil, curso);

          const personaExistente = ITS.buscarPersonaPorId(id);
          if (personaExistente) {
              alert('¡Error! ID duplicado, la persona ya existe.');
          } else {
              ITS.altaPersona(estudiante);
              alert('¡Operación exitosa! Estudiante agregado correctamente.');
              
              estudianteForm.reset();
          }
      });
});

//Agrega profesor desde formulario
document.addEventListener('DOMContentLoaded', () => {
  const profesorForm = document.getElementById('profesor-form');

  profesorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const apellidos = document.getElementById('apellidos').value;
      const id = document.getElementById('id').value;
      const estadoCivil = document.getElementById('estado-civil').value;
      const anioIncorporacion = document.getElementById('anio-incorporacion').value;
      const despacho = document.getElementById('despacho').value;
      const departamento = document.getElementById('departamento').value;

      const profesor = new Profesor(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho, departamento);

      const personaExistente = ITS.buscarPersonaPorId(id);
      if (personaExistente) {
          alert('¡Error! ID duplicado, la persona ya existe.');
      } else {
          ITS.altaPersona(profesor);
          alert('¡Operación exitosa! Profesor agregado correctamente.');

          profesorForm.reset();
      }
  });
});

//agrega personal de servicio desde formulario
document.addEventListener('DOMContentLoaded', () => {
  const personalForm = document.getElementById('personal-form');

  personalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const apellidos = document.getElementById('apellidos').value;
      const id = document.getElementById('id').value;
      const estadoCivil = document.getElementById('estado-civil').value;
      const anioIncorporacion = document.getElementById('anio-incorporacion').value;
      const despacho = document.getElementById('despacho').value;
      const seccion = document.getElementById('seccion').value;

      const personal = new PersonalServicio(nombre, apellidos, id, estadoCivil, anioIncorporacion, despacho, seccion);

      const personaExistente = ITS.buscarPersonaPorId(id);
      if (personaExistente) {
          alert('¡Error! ID duplicado, la persona ya existe.');
      } else {
          ITS.altaPersona(personal);
          alert('¡Operación exitosa! Personal de servicio agregado correctamente.');

          personalForm.reset();
      }
  });
});

//eliminar persona
document.addEventListener('DOMContentLoaded', () => {

  const bajaBtn = document.getElementById('baja-btn');
    const submitBajaBtn = document.getElementById('submit-baja');

    bajaBtn.addEventListener('click', () => {
        const idBaja = prompt('Ingrese el ID de la persona a dar de baja:');
        if (idBaja !== null && idBaja !== '') {
            const personaEncontrada = ITS.buscarPersonaPorId(idBaja);

            if (personaEncontrada) {
                ITS.bajaPersona(idBaja);
                alert('¡Operación exitosa! Persona eliminada correctamente.');
            } else {
                alert('No se encontró a nadie con el ID proporcionado.');
            }
        }
    });
    
});

//Imprimir
document.addEventListener('DOMContentLoaded', () => {

  const imprimirBtn = document.getElementById('imprimir-btn');

  imprimirBtn.addEventListener('click', () => {
      const idImprimir = prompt('Ingrese el ID de la persona a imprimir:');
      if (idImprimir !== null && idImprimir !== '') {
          const personaEncontrada = ITS.buscarPersonaPorId(idImprimir);

          if (personaEncontrada) {
              alert(personaEncontrada.toString());
          } else {
              alert('No se encontró a nadie con el ID proporcionado.');
          }
      }
  });
});