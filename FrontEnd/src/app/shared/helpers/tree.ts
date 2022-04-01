
export class treeClass {
    nodo_nuevo = {
        data: { name: undefined, id_nodo:0, padre: 0}
    }
    public data1 = [
        
    ];
    constructor(){}

    public buscarPadre(nodo, datos){
        if(!nodo.padre) {
            this.data1.push(nodo);
        } 

        if (nodo.padre) {
            const padre = datos.find(item => item.id_nodo === nodo.padre);
            if(padre) {
                padre['children'].push(nodo);
            } 
        }
    }
    
}