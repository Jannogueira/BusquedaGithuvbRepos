$(document).ready(function(){
    $('#buscarBtn').click(function(){
        var usuario = $('#usuarioTxt').val().trim();
        if(usuario == '') {
            alert('No has rellenado el campo de usuario');
        } else {
            var urlApi = 'https://api.github.com/users/' + usuario + '/repos';

            $.ajax({
                url: urlApi,
                method: 'GET',
                datatype: 'json',
                success: function(crearTabla){
                    // Limpiar la tabla
                    $('#tablaRepos').empty();

                    if (crearTabla.length == 0) {
                        $('#tablaRepos').append('<p>No se han encontrado repositorios del usuario <b>' + usuario + '</b>.</p>');
                    } else {
                        // Crear la tabla
                        var tabla = $('<table class="table table-striped"></table>');
                        var thead = $('<thead><tr><th>Nombre</th><th>Descripción</th><th>Seguidores</th></tr></thead>');
                        var tbody = $('<tbody></tbody>');

                        // Iterar sobre los repositorios
                        $.each(crearTabla, function(index, relleno){
                            var fila = $('<tr></tr>');

                            var filaNombres = $('<td></td>').append(
                                $('<a></a>')
                                    .attr('href', relleno.html_url)
                                    .attr('target', '_blank')
                                    .text(relleno.name)
                            );

                            var filaDescripcion = $('<td></td>').text(relleno.description || 'Sin descripción');
                            var filaSeguidores = $('<td></td>').text(relleno.stargazers_count);

                            fila.append(filaNombres, filaDescripcion, filaSeguidores);
                            tbody.append(fila);
                        });

                        // Agregar la tabla completa
                        tabla.append(thead, tbody);
                        $('#tablaRepos').append(tabla);
                    }
                },
                error: function(){
                    $('#tablaRepos').empty();
                    $('#tablaRepos').append('<p><b>Error en la petición. Asegura que has introducido bien el usuario!</b></p>');
                }
            });
        }
    });
});
