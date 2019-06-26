'use strict'

let errors = [];

function validationContract() {
    errors = [];
}

//Campo Obrigatório
validationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

//Minimo de caracteres
validationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}
//Máximo de caracteres
validationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

//Tamanho Fixo
validationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

//Validação de Emails
validationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    if (!reg.test(value))
        errors.push({ message: message });
}

//Retorno da lista de erros
validationContract.prototype.errors = () => {
    return errors;
}

//Limpa
validationContract.prototype.clear = () => {
    errors = [];
}

validationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = validationContract;