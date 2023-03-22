import Citas from './classes/Citas.js' ;
import UI from './classes/UI.js'; 
 
import { mascotaInput,
     propietarioInput, 
     telefonoInput, 
     fechaInput, 
     horaInput, 
     sintomasInput, 
     formulario} from './selectores.js';


 /* Clases */
    //Intanciar clases de manera global
    const ui = new UI();
    const adminCitas = new Citas();


/*** Variables ****/
let editando;



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


/* Funciones */

    //Agregar datos al bojeto de cita
    export function datosCita(e) {
        /*
            Llenar objeto citaObj con el valor tecleado en el input   
            Para eso se accede a la propiedad del objeto con citaObj[e.target.name]
        */
        citaObj[e.target.name] = e.target.value;
        //console.log('citaObj :>> ', citaObj);
    }


        //Valida y agrega nueva cita a la clase de citas
       export function nuevaCita(e){
            e.preventDefault();
    
            //Extraer informacion del objeto de citas para validar
            const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    
            //Validar
            if(mascota ==='' || propietario==='' || telefono ==='' || fecha ==='' || hora  ==='' || sintomas  ===''){
                ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
                return;
            };
    
            if(editando){
                //console.log('Edicion activada');
                //Alerta de agregado correctamente
                ui.mostrarAlerta('Editado correctamente', 'exito');
    
                //Pasar el objeto de la cita a edicion de la
                adminCitas.editarCita({...citaObj});
    
                 //Cambiar el texto del botton
                formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
    
                //Quitar modo edicion
                editando = false;
            }else{
                //Generar un id unico en el objetoCita
                citaObj.id = Date.now();
    
                //Creando una nueva cita
                adminCitas.agregarCita({...citaObj});
    
                //Alerta de agregado correctamente
                ui.mostrarAlerta('Agregado correctamente', 'exito');
            };
    
    
    
            //Reiniciar objeto para validacion
            reiniciarObjeto();
    
            //Limpiar formulario despues de crear una nueva cita
            formulario.reset();
    
    
            //Mostrar en HTML la cita creada
            ui.mostrarCitas(adminCitas);
    
        }
    
        //Reiniciar Objeto
        export function reiniciarObjeto(){
            
            citaObj.mascota = '';
            citaObj.propietario = '';
            citaObj.telefono = '';
            citaObj.fecha = '';
            citaObj.hora = '';
            citaObj.sintomas='';
           
        }
    
        //Eliminar cita
        export function eliminarCita(id){
            //Eliminar cita
            adminCitas.eliminarCita(id);
    
            //Muestre un mensaje
            ui.mostrarAlerta('La cita se eliminó correctamente', 'exito');
    
            //Refresque contendorCitas
            ui.mostrarCitas(adminCitas);
    
        };
    
        //Carga los datos y el modo edición
        export function cargarEdicion(cita){
            
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            
            //Llenar inputs para editar
            mascotaInput.value = mascota;
            propietarioInput.value = propietario;
            telefonoInput.value = telefono;
            fechaInput.value = fecha;
            horaInput.value = hora;
            sintomasInput.value = sintomas;
    
             //Llenar el objeto 
           citaObj.mascota = mascota;
           citaObj.propietario = propietario;
           citaObj.telefono = telefono;
           citaObj.fecha = fecha;
           citaObj.hora = hora;
           citaObj.sintomas = sintomas;
           citaObj.id = id;
    
            //Cambiar el texto del botton
            formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    
            editando = true;
        };
    
    