const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.log('Usage: node scripts/generateHash.js <your-password>');
  console.log('Example: node scripts/generateHash.js MySecurePassword123');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log('\n✅ Password hash generated successfully!\n');
console.log('Copy this value to ADMIN_PASSWORD_HASH in your .env file:\n');
console.log(hash);
console.log('');
