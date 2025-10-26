'use client';
import { useEffect, useState } from "react";

export default function Page(){
  const [items,setItems]=useState<any[]>([]);

  async function load(){
    const r = await fetch('/api/contacts');
    const j = await r.json().catch(()=>({items:[]}));
    setItems(j.items||[]);
  }
  useEffect(()=>{ load(); },[]);

  async function create(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const body:any={};
    fd.forEach((v,k)=>body[k]=v as any);
    const r=await fetch('/api/contacts',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    if(r.ok){ e.currentTarget.reset(); load(); }
  }

  async function del(id:number){
    if(!confirm('Delete?')) return;
    await fetch('/api/contacts/'+id,{method:'DELETE'});
    load();
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <form onSubmit={create} className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <div className="text-sm mb-1">type</div>
            <select name="type" className="select">
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="SUPPLIER">SUPPLIER</option>
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">name</div>
            <input name="name" className="input" type="text" />
          </div>
          <div>
            <div className="text-sm mb-1">email</div>
            <input name="email" className="input" type="email" />
          </div>
          <div>
            <div className="text-sm mb-1">phone</div>
            <input name="phone" className="input" type="text" />
          </div>
          <div>
            <div className="text-sm mb-1">taxNo</div>
            <input name="taxNo" className="input" type="text" />
          </div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>type</th><th>name</th><th>email</th><th>phone</th><th>taxNo</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((x:any)=>(
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{String(x['type'] ?? '')}</td>
                <td>{String(x['name'] ?? '')}</td>
                <td>{String(x['email'] ?? '')}</td>
                <td>{String(x['phone'] ?? '')}</td>
                <td>{String(x['taxNo'] ?? '')}</td>
                <td><button className='btn' onClick={()=>del(x.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
