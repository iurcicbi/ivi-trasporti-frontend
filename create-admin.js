// Script per creare/resettare admin user
// Eseguire con: node create-admin.js [email] [password]

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './server/.env' });

// Schema User (copia dal modello)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Parametri da command line o default
    const email = process.argv[2] || 'admin@ivitrasporti.it';
    const password = process.argv[3] || 'admin123';
    const name = 'Amministratore IVI';

    console.log(`🚀 Creazione admin user...`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);

    // Connetti al database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ivi_trasporti');
    console.log('✅ Connesso a MongoDB');

    // Rimuovi admin esistente se esiste
    await User.deleteOne({ email });
    console.log('🗑️  Rimosso admin esistente (se presente)');

    // Crea nuovo admin
    const admin = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin creato con successo!');

    // Test login
    console.log('\n🔍 Test login...');
    const testUser = await User.findOne({ email }).select('+password');
    if (testUser) {
      const isValid = await bcrypt.compare(password, testUser.password);
      console.log(`Login test: ${isValid ? '✅ OK' : '❌ ERRORE'}`);
    }

    console.log('\n🎉 Tutto pronto!');
    console.log(`\n📝 Credenziali admin:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`\n🌐 Accedi su: http://localhost:3000/admin/login`);

  } catch (error) {
    console.error('❌ Errore:', error.message);
    
    if (error.message.includes('connect')) {
      console.log('\n🔧 Soluzione: Avvia MongoDB');
      console.log('brew services start mongodb/brew/mongodb-community');
      console.log('# oppure');
      console.log('mongod');
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();