import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type Product = { id:string; name:string; category:string; brand:string; model:string; sku:string; buy:number; price:number; stock:number; warranty:string; status:"Actif"|"Inactif"; icon:string };
export type Client = { id:string; name:string; phone:string; purchases:number; total:number; debt:number };
export type Credit = { id:string; client:string; total:number; paid:number; due:string; status:"En cours"|"Échéance proche"|"En retard"|"Payé" };
export type Activity = { id:string; type:string; title:string; detail:string; amount?:number; date:string; user:string };
export type CartLine = { product:Product; quantity:number };

const initialProducts: Product[] = [
 {id:"p1",name:"iPhone 15",category:"Smartphones",brand:"Apple",model:"15 128 Go",sku:"IP15-128-BLK",buy:365000,price:450000,stock:4,warranty:"12 mois",status:"Actif",icon:"📱"},
 {id:"p2",name:"iPhone 13",category:"Smartphones",brand:"Apple",model:"13 128 Go",sku:"IP13-128-BLU",buy:270000,price:340000,stock:2,warranty:"12 mois",status:"Actif",icon:"📱"},
 {id:"p3",name:"Samsung Galaxy A55",category:"Smartphones",brand:"Samsung",model:"A55 5G",sku:"SG-A55-256",buy:190000,price:245000,stock:8,warranty:"12 mois",status:"Actif",icon:"📱"},
 {id:"p4",name:"Samsung Galaxy A15",category:"Smartphones",brand:"Samsung",model:"A15",sku:"SG-A15-128",buy:72000,price:95000,stock:3,warranty:"6 mois",status:"Actif",icon:"📱"},
 {id:"p5",name:"Redmi Note 13",category:"Smartphones",brand:"Xiaomi",model:"Note 13",sku:"RN13-256",buy:98000,price:135000,stock:7,warranty:"6 mois",status:"Actif",icon:"📱"},
 {id:"p6",name:"AirPods",category:"Audio",brand:"Apple",model:"2e génération",sku:"APP-2-WHT",buy:48000,price:75000,stock:1,warranty:"3 mois",status:"Actif",icon:"🎧"},
 {id:"p7",name:"Chargeur USB-C",category:"Accessoires",brand:"Anker",model:"20W",sku:"ANK-USB-C20",buy:4500,price:10000,stock:22,warranty:"3 mois",status:"Actif",icon:"🔌"},
 {id:"p8",name:"Power Bank",category:"Accessoires",brand:"Anker",model:"10 000 mAh",sku:"ANK-PB10",buy:12000,price:22000,stock:12,warranty:"6 mois",status:"Actif",icon:"🔋"},
 {id:"p9",name:"Écouteurs Bluetooth",category:"Audio",brand:"Xiaomi",model:"Buds 4",sku:"MI-BUDS4",buy:10000,price:18000,stock:15,warranty:"3 mois",status:"Actif",icon:"🎧"},
 {id:"p10",name:"Routeur TP-Link",category:"Réseau",brand:"TP-Link",model:"Archer C6",sku:"TPL-C6",buy:23000,price:35000,stock:6,warranty:"12 mois",status:"Actif",icon:"📡"},
];
const initialClients: Client[] = [
 {id:"c1",name:"Amadou Diop",phone:"77 123 45 67",purchases:8,total:720000,debt:150000},
 {id:"c2",name:"Fatou Ndiaye",phone:"76 345 67 89",purchases:5,total:425000,debt:75000},
 {id:"c3",name:"Moussa Fall",phone:"78 234 56 78",purchases:6,total:610000,debt:200000},
 {id:"c4",name:"Ibrahima Sarr",phone:"70 567 89 01",purchases:3,total:195000,debt:0},
 {id:"c5",name:"Awa Diallo",phone:"77 890 12 34",purchases:4,total:355000,debt:100000},
];
const initialCredits: Credit[] = [
 {id:"cr1",client:"Amadou Diop",total:250000,paid:100000,due:"30 sept. 2026",status:"En cours"},
 {id:"cr2",client:"Fatou Ndiaye",total:150000,paid:75000,due:"2 oct. 2026",status:"Échéance proche"},
 {id:"cr3",client:"Moussa Fall",total:350000,paid:150000,due:"18 sept. 2026",status:"En retard"},
 {id:"cr4",client:"Awa Diallo",total:180000,paid:80000,due:"12 oct. 2026",status:"En cours"},
];
const initialActivity: Activity[] = [
 {id:"a1",type:"Vente",title:"iPhone 15",detail:"Paiement Wave",amount:450000,date:"Aujourd’hui, 14:32",user:"Amadou"},
 {id:"a2",type:"Stock",title:"10 Samsung A15 ajoutés",detail:"Entrée de stock",date:"Aujourd’hui, 12:05",user:"Amadou"},
 {id:"a3",type:"Remboursement",title:"Amadou Diop",detail:"Crédit client",amount:50000,date:"Aujourd’hui, 10:18",user:"Fatou"},
 {id:"a4",type:"Vente",title:"AirPods",detail:"Paiement espèces",amount:75000,date:"Hier, 18:44",user:"Fatou"},
];

type Store = {
 products:Product[]; clients:Client[]; credits:Credit[]; activities:Activity[]; revenue:number; sales:number;
 addProduct:(p:Omit<Product,"id">)=>void; updateStock:(id:string,qty:number)=>void; addClient:(name:string,phone:string)=>void;
 completeSale:(cart:CartLine[],client:string,payment:string,paid:number)=>void; repayCredit:(id:string,amount:number)=>void;
};
const Context = createContext<Store | null>(null);
export const money = (n:number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
export function BitikProvider({children}:{children:ReactNode}) {
 const [products,setProducts]=useState(initialProducts); const [clients,setClients]=useState(initialClients); const [credits,setCredits]=useState(initialCredits); const [activities,setActivities]=useState(initialActivity); const [revenue,setRevenue]=useState(1250000); const [sales,setSales]=useState(24);
 const addProduct=(p:Omit<Product,"id">)=>{setProducts(v=>[{...p,id:crypto.randomUUID()},...v]);toast.success("Produit ajouté au catalogue");};
 const updateStock=(id:string,qty:number)=>{setProducts(v=>v.map(p=>p.id===id?{...p,stock:p.stock+qty}:p)); const p=products.find(x=>x.id===id); setActivities(v=>[{id:crypto.randomUUID(),type:"Stock",title:`${qty} ${p?.name ?? "produit"} ajoutés`,detail:"Entrée de stock",date:"À l’instant",user:"Amadou"},...v]);toast.success("Stock mis à jour");};
 const addClient=(name:string,phone:string)=>{setClients(v=>[{id:crypto.randomUUID(),name,phone,purchases:0,total:0,debt:0},...v]);toast.success("Client ajouté");};
 const completeSale=(cart:CartLine[],client:string,payment:string,paid:number)=>{const total=cart.reduce((s,l)=>s+l.product.price*l.quantity,0); setProducts(v=>v.map(p=>{const line=cart.find(l=>l.product.id===p.id);return line?{...p,stock:Math.max(0,p.stock-line.quantity)}:p})); setRevenue(v=>v+total);setSales(v=>v+1);setActivities(v=>[{id:crypto.randomUUID(),type:"Vente",title:cart.map(l=>l.product.name).join(", "),detail:`${payment} · ${client || "Client comptoir"}`,amount:total,date:"À l’instant",user:"Amadou"},...v]); if(paid<total){const who=client||"Client comptoir";setCredits(v=>[{id:crypto.randomUUID(),client:who,total,paid,due:"22 oct. 2026",status:"En cours"},...v]);setClients(v=>v.map(c=>c.name===who?{...c,debt:c.debt+total-paid,purchases:c.purchases+1,total:c.total+total}:c));} toast.success("Vente enregistrée et stock actualisé");};
 const repayCredit=(id:string,amount:number)=>{setCredits(v=>v.map(c=>c.id===id?{...c,paid:Math.min(c.total,c.paid+amount),status:c.paid+amount>=c.total?"Payé":c.status}:c)); const c=credits.find(x=>x.id===id); if(c){setClients(v=>v.map(x=>x.name===c.client?{...x,debt:Math.max(0,x.debt-amount)}:x));setActivities(v=>[{id:crypto.randomUUID(),type:"Remboursement",title:c.client,detail:"Crédit client",amount,date:"À l’instant",user:"Amadou"},...v]);}toast.success("Remboursement enregistré");};
 const value=useMemo(()=>({products,clients,credits,activities,revenue,sales,addProduct,updateStock,addClient,completeSale,repayCredit}),[products,clients,credits,activities,revenue,sales]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useBitik(){const value=useContext(Context);if(!value)throw new Error("BitikProvider manquant");return value;}
