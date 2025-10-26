'use client';
import { useEffect, useState } from "react";

export default function Page(){
  const [items,setItems]=useState<any[]>([]);

  async function load(){
    const r = await fetch('/api/payments');
    const j = await r.json().catch(()=>({items:[]}));
    setItems(j.items||[]);
  }
  useEffect(()=>{ load(); },[]);

  async function create(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body:any = {};
    fd.forEach((v,k)=> body[k] = v as any);

    // tip dönüşümleri
    if (body.amount !== undefined) body.amount = Number(body.amount || 0);
    if (body.accountId !== undefined) body.accountId = Number(body.accountId || 0);
    if (body.contactId) body.contactId = Number(body.contactId);
    if (body.invoiceId) body.invoiceId = Number(body.invoiceId);
    if (body.date) body.date = new Date(body.date as string).toISOString();

    const r = await fetch('/api/payments',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });

    if(r.ok){
      (e.currentTarget as HTMLFormElement).reset();
      load();
    } else {
      const err = await r.json().catch(()=>null);
      alert(err?.message || 'Create failed');
    }
  }

  async function del(id:number){
    if(!confirm('Delete?')) return;
    await fetch('/api/payments/'+id,{method:'DELETE'});
    load();
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Payments</h1>

        <form onSubmit={create} className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <div className="text-sm mb-1">contactId</div>
            <input name="contactId" className="input" type="number" />
          </div>
          <div>
            <div className="text-sm mb-1">invoiceId</div>
            <input name="invoiceId" className="input" type="number" />
          </div>
          <div>
            <div className="text-sm mb-1">accountId</div>
            <input name="accountId" className="input" type="number" required />
          </div>
          <div>
            <div className="text-sm mb-1">date</div>
            <input name="date" className="input" type="date" required />
          </div>
          <div>
            <div className="text-sm mb-1">amount</div>
            <input name="amount" className="input" type="number" step="0.01" required />
          </div>
          <div>
            <div className="text-sm mb-1">currency</div>
            <input name="currency" className="input" type="text" defaultValue="USD" />
          </div>
          <div>
            <div className="text-sm mb-1">type</div>
            <select name="type" className="select" required>
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
              <option value="COLLECTION">COLLECTION</option>
              <option value="OUTGOING">OUTGOING</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>contactId</th><th>invoiceId</th><th>accountId</th>
              <th>date</th><th>amount</th><th>currency</th><th>type</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x:any)=>(
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{String(x['contactId'] ?? '')}</td>
                <td>{String(x['invoiceId'] ?? '')}</td>
                <td>{String(x['accountId'] ?? '')}</td>
                <td>{x.date ? String(x.date).slice(0,10) : ''}</td>
                <td>{String(x['amount'] ?? '')}</td>
                <td>{String(x['currency'] ?? '')}</td>
                <td>{String(x['type'] ?? '')}</td>
                <td>
                  <button className="btn" onClick={()=>del(x.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
