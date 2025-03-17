$(document).ready(function(){
    $('#buscarBtn').click(function(){
        var usuario = $('#usuarioTxt').val().trim();
        if(usuario == '')
            alert('No has rellenado el campo de usuario');
        else{
            var urlApi = 'https://api.github.com/users/' + usuario + '/repos';

        $.ajax({
            url: urlApi,
            method: 'GET',
            datatype: 'json',
            success: function(crearTabla){
                $('#tablaRepos').empty();
                if (crearTabla.length == 0)
                    $('#tablaRepos').append('<p>No se han encontrado repositorios del usuario <b>' + usuario + '</b>.</p>');
                else{
                    var tabla = $('<table class = "table table-striped"></table>');
                    var thead = $('<thead><tr><th>Nombre</th><th>Descripción</th><th>Seguidores</th></tr><thead>');
                    var tbody = $('<tbody></tbody>');
                }
            }
        });


        }
    });


});