'use client';
import { useEffect, useState } from "react";
export default function Page(){
  const [items,setItems]=useState<any[]>([]);
  async function load(){ const r=await fetch('/api/invoices'); const j=await r.json().catch(()=>({items:[]})); setItems(j.items||[]); }
  useEffect(()=>{ load(); },[]);
  async function create(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const fd=new FormData(e.currentTarget); const body:any={}; fd.forEach((v,k)=>body[k]=v as any);
    body.subtotal=Number(body.subtotal||0); body.tax=Number(body.tax||0); body.total=Number(body.subtotal)+Number(body.tax);
    const r=await fetch('/api/invoices',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); if(r.ok){ e.currentTarget.reset(); load(); }
  }
  async function del(id:number){ if(!confirm('Delete?')) return; await fetch('/api/invoices/'+id,{method:'DELETE'}); load(); }
  return (<div className="grid gap-6">
    <div className="card">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <form onSubmit={create} className="grid md:grid-cols-3 gap-3 mt-4">
        <div><div className="text-sm mb-1">contactId</div><input name="contactId" className="input" type="number"/></div>
        <div><div className="text-sm mb-1">categoryId</div><input name="categoryId" className="input" type="number"/></div>
        <div><div className="text-sm mb-1">issueDate</div><input name="issueDate" className="input" type="date"/></div>
        <div><div className="text-sm mb-1">dueDate</div><input name="dueDate" className="input" type="date"/></div>
        <div><div className="text-sm mb-1">number</div><input name="number" className="input" type="text"/></div>
        <div><div className="text-sm mb-1">currency</div><input name="currency" className="input" type="text" defaultValue="USD"/></div>
        <div><div className="text-sm mb-1">subtotal</div><input name="subtotal" className="input" type="number"/></div>
        <div><div className="text-sm mb-1">tax</div><input name="tax" className="input" type="number"/></div>
        <div><div className="text-sm mb-1">status</div>
          <select name="status" className="select"><option>DRAFT</option><option>SENT</option><option>PARTIAL</option><option>PAID</option><option>OVERDUE</option></select>
        </div>
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
    </div>
    <div className="card overflow-auto">
      <table className="table">
        <thead><tr><th>ID</th><th>Number</th><th>Contact</th><th>Issue</th><th>Due</th><th>Status</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>{items.map((x:any)=>(<tr key={x.id}><td>{x.id}</td><td>{x.number}</td><td>{x.contact?.name||x.contactId}</td><td>{String(x.issueDate).slice(0,10)}</td><td>{x.dueDate?String(x.dueDate).slice(0,10):''}</td><td>{x.status}</td><td>{x.total}</td><td><button className='btn' onClick={()=>del(x.id)}>Delete</button></td></tr>))}</tbody>
      </table>
    </div>
  </div>);
}
