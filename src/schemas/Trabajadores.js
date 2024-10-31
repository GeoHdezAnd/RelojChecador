import {Schema, model, mongoose} from 'mongoose';

// Definir el esquema de usuario
const trabajadorSchema = new Schema({
  nombre: {
    type: String,
    required: true,  // Campo obligatorio
    trim: true       // Elimina espacios al inicio y al final
  },
  apellidoPaterno: {
    type: String,
    required: true,
    trim: true
  },
  apellidoMaterno: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true
  },
  nacimiento: {
    type: Date,
    required: true  // Especifica que este campo debe ser una fecha
  },
  email: {
    type: String,
    required: true,
    unique: true,   // No puede haber dos usuarios con el mismo email
    trim: true,
    lowercase: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true,   // La matrícula también debe ser única
    trim: true
  },
  area: {
    // type: mongoose.Schema.Types.ObjectId,  // Referencia al ID de otra colección
    // ref: 'Area',                           // Nombre de la colección a la que hace referencia
    type: String,
    required: true                    // Este campo es obligatorio
  }
}, {
  timestamps: true,  // Crea automáticamente los campos createdAt y updatedAt
  collection: 'trabajador'
});

const Trabajador = model('Trabajador', trabajadorSchema)
// Exportar el modelo de usuario
export default Trabajador;