const Namecheap= require('./namecheap');
const dotenv= require('dotenv');
dotenv.config();

const namecheap= new Namecheap(process.env.api_user, process.env.api_key,process.env.client_ip,process.env.development);
module.exports= namecheap;