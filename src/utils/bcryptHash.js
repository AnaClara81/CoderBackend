

import bcrypt from 'bcryptjs'

// crear el hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// generar la funcion para comparar contraseña

export const isValidPassword = (password,user) => bcrypt.compareSync(password, user.password)



export default bcrypt