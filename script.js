// 1. Constructor para Libros
function Libro(id, titulo, autor, año) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.año = año;
    this.disponible = true;

    this.prestar=function() {
        this.disponible=false;
    }

    this.devolver=function() {
        this.dispobible=true;
    }
}

// 2. Constructor para Usuarios
function Usuario(id, nombre, email) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;

    this.prestarLibro=function(libroId) {

    }

    this.devolverLibro=function(libroId) {

    }
}

// 3. Constructor para Préstamos
function Prestamo(id, libroId, usuarioId, fechaPrestamo) {
    this.id = id;
    this.libroId = libroId;
    this.usuarioId=usuarioId;
    this.fechaPrestamo=fechaPrestamo;
    this.estado="Prestado";

    this.devolver=function() {
        this.estado = "Devuelto";
    }
}

// Base de datos
const biblioteca = {
    libros: [],
    usuarios: [],
    prestamos: [],
    nextLibroId: 1,
    nextUsuarioId: 1,
    nextPrestamoId: 1,
    
    // Métodos para agregar elementos
    agregarLibro: function(titulo, autor, año) {
        const libro = new Libro(this.nextLibroId++, titulo, autor, año);
        this.libros.push(libro);
        return libro;
    },
    
    agregarUsuario: function(nombre, email) {
        const usuario = new Usuario(this.nextUsuarioId++, nombre, email);
        this.usuarios.push(usuario);
        return usuario;
    },
    
    prestarLibro: function(libroId, usuarioId) {
        const libro = this.libros.find(l => l.id === libroId);
        const usuario = this.usuarios.find(u => u.id === usuarioId);
        
        if (libro && libro.disponible && usuario) {
            libro.prestar();
            usuario.prestarLibro();
            
            const prestamo = new Prestamo(
                this.nextPrestamoId++,
                libroId,
                usuarioId,
                new Date().toISOString()
            );
            
            this.prestamos.push(prestamo);
            return prestamo;
        }
        return null;
    },
    
    devolverLibro: function(prestamoId) {
        const prestamo = this.prestamos.find(p => p.id === prestamoId && p.estado === "Prestado");
        
        if (prestamo) {
            const libro = this.libros.find(l => l.id === prestamo.libroId);
            const usuario = this.usuarios.find(u => u.id === prestamo.usuarioId);
            
            libro.devolver();
            usuario.devolverLibro();
            prestamo.devolver();
            
            return true;
        }
        return false;
    }
};

// Función para inicializar datos de ejemplo
function init() {
    // Agregar libros de ejemplo
    biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967);
    biblioteca.agregarLibro("1984", "George Orwell", 1949);
    biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", 1943);
    
    // Agregar usuarios de ejemplo
    biblioteca.agregarUsuario("Ana López", "ana@email.com");
    biblioteca.agregarUsuario("Carlos Ruiz", "carlos@email.com");
    
    // Realizar algunos préstamos
    biblioteca.prestarLibro(1, 1);
    biblioteca.prestarLibro(2, 2);
    
    // Renderizar datos
    renderLibros();
    renderUsuarios();
    renderPrestamos();
}

// Funciones para renderizar las tablas (debes implementarlas)
function renderLibros() {
    // Implementa la lógica para mostrar los libros en la tabla
    const tbody = document.getElementById("tablaLibros");
    tbody.innerHTML = "";
    biblioteca.libros.forEach(libro => {
        tbody.innerHTML = `
        <tr>
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.año}</td>
            <td>${libro.disponible ? "Sí" : "No"}</td>
        </tr>`;
    })
}

function renderUsuarios() {
    // Implementa la lógica para mostrar los usuarios en la tabla
    const tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = "";
    biblioteca.usuarios.forEach(usuario => {
        tbody.innerHTML =  `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
        </tr> `;
    });
}

function renderPrestamos() {
    // Implementa la lógica para mostrar los préstamos en la tabla
    const tbody = document.getElementById("tablaPrestamos");
    tbody.innerHTML = "";
    biblioteca.prestamos.forEach(prestamo => {
        tbody.innerHTML = `
        <tr>
            <td>${prestamo.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
        </tr> `;
    });
}

// Iniciar la aplicación
window.onload = init;