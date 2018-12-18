export default function extend(o,n){
   for (var p in n){
        if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) ))
            o[p]=n[p];
    }
}
