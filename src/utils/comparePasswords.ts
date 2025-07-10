export function compararPassword(passwordCliente: string, passwordDB: string) {
    if (passwordCliente === passwordDB) {
        return true
    }
    else return false
};