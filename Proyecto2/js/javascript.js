



$(function(){
  //verificamos si el navegador soporta localStorage
  if(!localStorage){
    setTimeout(function(){
      alert('Lo siento, pero su navegador no soporta localStorage');

    });
  }
  
  $.mostrarListaDeCarreras=function(){
    //guardamos en una variable la cantidad de carreras y el cuerpo de la tabla en la que mostraremos la lista (agregando filas con jQuery)
    var iTotalCarreras=localStorage.length,
    $objCuerpoTablaCarreras=$('#tblTablaCarrera').find('tbody');
    
    //vaciamos el cuerpo de la tabla
    $objCuerpoTablaCarreras.empty();
    
    //hay carreras almacenados?
    if(iTotalCarreras>0){
      //recorremos la lista de carreras (los items almacenados en localStorage)
      for(var iCarrera=0; iCarrera<iTotalCarreras; iCarrera++){
        //guardamos en variables el id y nombre recuperados del localStorage
        var strNombre=localStorage.key(iCarrera),
        strCodigo=localStorage.getItem(localStorage.key(iCarrera));
        
        //agregamos una nueva fila con los datos de la carrera
        $objCuerpoTablaCarreras.append(
          $('<tr>').append(
            $('<td>',{ //fila con el codigo de la carrera
              text  : strCodigo,
              align : 'left'
            }),
            $('<td>',{ //fila con el nombre de telefon
              text  : strNombre,
              align : 'left'
            }),
            $('<td>',{ //fila para el boton de eliminar
              align : 'center',
              width : 60
            }).append(
              //agregamos a la fila el boton
              $('<input>',{
                type  : 'button',
                class : 'clsEliminarCarrera btn btn-default',
                value : 'Eliminar',
              }).data('carreraAEliminar',strNombre) //por medio del metodo data, almacenamos en el boton el id que debemos eliminar
            )
          )
        );
      }
    //no hay carreras almacenados
    }else{
      //agregamos una fila con un mensaje indicando que no hay carreras
      $objCuerpoTablaCarreras.append(
        $('<tr>').append(
          $('<td>',{
            text  : 'No se han agregado Carreras',
            colspan : 3,
            align : 'center'
          })
        )
      );
    }
  };
  //funcion para limpiar los campos del formulario
  $.limpiarCamposDelFormulario=function(){
    //vaciamos el contenido de los campos de texto
    $('#idCarrera,#nomCarrera').val('');
    //enfocamos el campo para digitar el nombre
    $('#idCarrera').focus();
  };
  //evento submit del formulario
  $('#frmAgregarCarrera').on('submit',function(eEvento){
    //evitamos que el form se envie (para que no recargue la pagina)
    eEvento.preventDefault();
    
    //obtenemos una "copia" de los campos de texto
    var $nomCarrera=$('#nomCarrera'),$idCarrera=$('#idCarrera');
    

    //verificamos que los datos no esten vacios
    //con $.trim() eliminamos los espacios al final y al inicio de las cadenas
    if($.trim($idCarrera.val())!='' && $.trim($nomCarrera.val())){
      //creamos dos variables con el nombre y telefono que vamos a guardar
      var strCodigo=$.trim($idCarrera.val()),
      strNombre=$.trim($nomCarrera.val());
      
      //preguntamos si el nombre de la carrera ya existe
      if(localStorage.getItem(strNombre)){
        //la carrera ya existe... desea actualizarla?
        if(confirm('El nombre de la carrera ya existe ¿Desea actualizarla?')){
          //actualizamos
          localStorage.setItem(strNombre,strCodigo);
          //cargamos en el cuerpo de la tabla la lista de carreras
          $.mostrarListaDeCarreras();
          //limpiamos el formulario
          $.limpiarCamposDelFormulario();
        }
      //la carrera no existe
      }else{
        //agregamos la carrera al localStorage
        localStorage.setItem(strNombre,strCodigo);
        //cargamos en el cuerpo de la tabla la lista de carreras
        $.mostrarListaDeCarreras();
        //limpiamos el formulario
        $.limpiarCamposDelFormulario();
      }
    }else{  //en caso de que algun campo este vacio, verificamos si el id esta vacio
      if($.trim($idCarrera.val())==''){
        //mostramos un mensaje
        alert('Por favor, digite el código de la carrera.');
        //enfocamos el campo para el id
        $idCarrera.val('').focus();
      //verificamos si el nombre esta vacio
      }else{
        //mostramos un mensaje
        alert('Por favor, digite el nombre de la carrera.');
        //enfocamos el campo para el id
        $nomCarrera.val('').focus();
      }
    }
  });
  //clic en el boton para eliminar una carrera
  //se usa live en vez de on, porque el boton se creo en tiempo de ejecucion
  $('.clsEliminarCarrera').live('click',function(){
    //obtenemos la carrera que se va a eliminar (recordar que esta almacenado en data)
    var strNombreAEliminar=$(this).data('carreraAEliminar');
    
    if(confirm('¿Esta seguro que desea eliminar la carrera seleccionada?')){
      //eliminamos la carrera usando la clave que esta asociada al id
      //recordemos que el item se guardo usando como clave el nombre
      localStorage.removeItem(strNombreAEliminar);
      //cargamos en el cuerpo de la tabla la lista de carreras
      $.mostrarListaDeCarreras();
    }
  });
  //cuando la pagina carga mostramos la lista de carreras
  //ojo: esto se hace al inicio...
  $.mostrarListaDeCarreras();
});
