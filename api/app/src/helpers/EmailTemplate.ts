export const emailRecuperarSenha = (codigoRecuperacao: number) => {

    return `
        Olá!<br> 
        Segue o código para redefinição de senha. 
        <br>
        <br>
        <b>Código:</b> ${codigoRecuperacao}<br>
        <br>
        Este código tem duração de 10 minutos.
    `;
}
