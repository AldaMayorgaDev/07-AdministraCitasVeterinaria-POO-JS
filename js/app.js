
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


        formulario.addEventListener('submit', nuevaCita)
    }

/* Clases */
    class Citas{
        constructor (){
            this.citas = [];
        }

        agregarCita (cita){
            this.citas = [...this.citas, cita];
            console.log('this.citas :>> ', this.citas);
        }

    }

    class UI{

        mostrarAlerta(mensaje, tipo){
            //Crear Div
            const divAlerta = document.createElement('DIV');
            divAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12');

            //Valida tipo de alerta y añade clase en especifico
            if(tipo==="error"){
                divAlerta.classList.remove('alert-success');
                divAlerta.classList.add('alert-danger');
            }else{
                divAlerta.classList.remove('alert-danger');
                divAlerta.classList.add('alert-success');
                
            }

            //Mensaje
            divAlerta.textContent  = mensaje;

            //Agregar al DOM
            document.querySelector('#contenido').insertBefore(divAlerta, document.querySelector('.agregar-cita'));

            //Quitar Alerta despues de 2 seg.

            setTimeout(() => {
                divAlerta.remove();
            }, 3000);
        };

        mostrarCitas({citas}){
            this.limpiarHTML();
            
            citas.forEach(cita => {
                //Extraer informacion del objeto de citas
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;

                //Scripting de los elementos de la cita
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `
                    <span class="font-weight-bolder">Propietario: </span> ${propietario}
                `;

                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `
                    <span class="font-weight-bolder">Telefono: </span> ${telefono}
                `;

                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `
                    <span class="font-weight-bolder">fecha: </span> ${fecha}
                `;

                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `
                    <span class="font-weight-bolder">hora: </span> ${hora}
                `;

                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `
                    <span class="font-weight-bolder">sintomas: </span> ${sintomas}
                `;

                //Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);

                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);

                //Agregar divCita a contenedorCitas
                contendorCitas.appendChild(divCita);
            });
        };


        limpiarHTML(){
            while(contendorCitas.firstChild){
                contendorCitas.removeChild(contendorCitas.firstChild);
            }
        }

        

    }

    //Intanciar clases de manera global
        const ui = new UI();
        const adminCitas = new Citas();

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


    //Valida y agrega nueva cita a la clase de citas
    function nuevaCita(e){
        e.preventDefault();

        //Extraer informacion del objeto de citas para validar
        const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

        //Validar
        if(mascota ==='' || propietario==='' || telefono ==='' || fecha ==='' || hora  ==='' || sintomas  ===''){
            ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Generar un id unico en el objetoCita

        citaObj.id = Date.now();

        //Creando una nueva cita
        adminCitas.agregarCita({...citaObj});


        //Reiniciar objeto para validacion
        reiniciarObjeto();

        //Limpiar formulario despues de crear una nueva cita
        formulario.reset();


        //Mostrar en HTML la cita creada
        ui.mostrarCitas(adminCitas);

    }

    //Reiniciar Objeto
    function reiniciarObjeto(){
        
        citaObj.mascota = '';
        citaObj.propietario = '';
        citaObj.telefono = '';
        citaObj.fecha = '';
        citaObj.hora = '';
        citaObj.sintomas='';
       
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

