export function money(a:number,c='USD'){const n=Number(a);try{return new Intl.NumberFormat(undefined,{style:'currency',currency:c}).format(n)}catch{return `${n.toFixed(2)} ${c}`}}
