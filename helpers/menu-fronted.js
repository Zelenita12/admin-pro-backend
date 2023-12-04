const getMenuFrontEnd = (role = 'USER_ROLE') => {
    let menu = [];

    // Agregar elementos comunes para todos los roles
    menu.push(
        {
            titulo: 'EnRédaTe',
            icono: 'mdi mdi-lumx',
            submenu: [
                { titulo: '¿Quieres enRedArte?', url: '/' },
                { titulo: 'Ferias de Mallorca', url: 'rxjs' },
                { titulo: '¿Eres artesano?', url: 'promesas' },
            ]
        }
    );

    // Agregar elementos específicos para el rol de admin
    if (role === 'ADMIN_ROLE') {
        menu.push(
            {
                titulo: 'Explora',
                icono: 'mdi mdi-compass',
                submenu: [
                    { titulo: 'Municipios', url: 'municipios', icono: 'mdi mdi-city' }, 
                    { titulo: 'Artesanos', url: 'artesanos' }, 
                ]
            },
            {
                titulo: 'Mantenimiento',
                icono: 'mdi mdi-wrench',
                submenu: [
                    { titulo: 'Usuarios', url: 'usuarios' },
                ]
            }
        );
    } else {
        // Agregar elementos específicos para usuarios no admin
        menu.push(
            {
                titulo: 'Explora',
                icono: 'mdi mdi-compass',
                submenu: [
                    { titulo: 'Municipios', url: 'municipios', icono: 'mdi mdi-city' }, 
                    { titulo: 'Artesanos', url: 'artesanos' }, 
                ]
            }
        );
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}
