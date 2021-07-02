// available roles 
enum ROLE {
    ADMIN= "admin",
    CLIENTE= "cliente",
};

export const Role = ROLE;

// verify role
export function verifyRole(expression:string):string {

    var myRole: string;
    switch (expression.toLowerCase()) {
        case ROLE.ADMIN:
            myRole = ROLE.ADMIN;
            break;
        case ROLE.CLIENTE:
            myRole = ROLE.CLIENTE;
            break;
        default:
            myRole = null;
    }
    return myRole;
}