
/*** Variables ****/

//Inputs
    const mascotaInput = document.querySelector('#mascota');
    const propietarioInput = document.querySelector('#propietario');
    const telefonoInput = document.querySelector('#telefono');
    const fechaInput = document.querySelector('#fecha');
    const horaInput = document.querySelector('#hora');
    const sintomasInput = document.querySelector('#sintomas');

//Formulario
    const formulario = document.querySelector('#nueva-cita');

//Contenedor Citas
    const contendorCitas = document.querySelector('#citas');

/* Eventos */

    eventListeners();

    function eventListeners() {
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);
    }


/* Funciones */

    //Agregar datos al bojeto de cita
    function datosCita(e) {
        /*
            Llenar objeto citaObj con el valor tecleado en el input   
            Para eso se accede a la propiedad del objeto con citaObj[e.target.name]
        */
        citaObj[e.target.name] = e.target.value;
        console.log('citaObj :>> ', citaObj);
    }

/* Objetos */

    //Objeto con informarción de cita
    const citaObj ={
        mascota : '',
        propietario: '',
        telefono: '',
        fecha: '',
        hora :'',
        sintomas:''
    }