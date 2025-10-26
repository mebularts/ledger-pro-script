'use client';
import { useEffect, useState } from "react";

export default function Page(){
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string>("");

  async function load(){
    setErr("");
    const r = await fetch('/api/ledger');
    const j = await r.json().catch(()=>({items:[]}));
    setItems(j.items || []);
  }
  useEffect(()=>{ load(); },[]);

  async function create(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const body: any = {};
    fd.forEach((v,k)=> body[k] = v as any);

    // tip dönüşümleri
    if (body.contactId)  body.contactId  = Number(body.contactId);
    if (body.categoryId) body.categoryId = Number(body.categoryId);
    if (body.debit !== undefined)  body.debit  = Number(body.debit || 0);
    if (body.credit !== undefined) body.credit = Number(body.credit || 0);
    if (body.date) body.date = new Date(body.date as string).toISOString();
    if (!body.currency) body.currency = 'USD';

    const r = await fetch('/api/ledger', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });

    if(r.ok){
      (e.currentTarget as HTMLFormElement).reset();
      load();
    } else {
      const j = await r.json().catch(()=>null);
      setErr(j?.message || 'Create failed');
    }
  }

  async function del(id: number){
    if(!confirm('Delete?')) return;
    await fetch('/api/ledger/'+id, { method:'DELETE' });
    load();
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Ledger</h1>
        {err && <p className="text-red-600 mt-2">{err}</p>}

        <form onSubmit={create} className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <div className="text-sm mb-1">contactId</div>
            <input name="contactId" className="input" type="number" />
          </div>
          <div>
            <div className="text-sm mb-1">categoryId</div>
            <input name="categoryId" className="input" type="number" />
          </div>
          <div>
            <div className="text-sm mb-1">date</div>
            <input name="date" className="input" type="date" required />
          </div>
          <div>
            <div className="text-sm mb-1">description</div>
            <input
  name="description"
  className="input"
  type="text"
  required
  spellCheck={false}
  autoComplete="off"
  suppressHydrationWarning
/>


          </div>
          <div>
            <div className="text-sm mb-1">debit</div>
            <input name="debit" className="input" type="number" step="0.01" />
          </div>
          <div>
            <div className="text-sm mb-1">credit</div>
            <input name="credit" className="input" type="number" step="0.01" />
          </div>
          <div>
            <div className="text-sm mb-1">currency</div>
            <input
  name="currency"
  className="input"
  type="text"
  defaultValue="USD"
  spellCheck={false}
  autoComplete="off"
  suppressHydrationWarning
/>

          </div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>contactId</th><th>categoryId</th><th>date</th>
              <th>description</th><th>debit</th><th>credit</th><th>currency</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x:any)=>(
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{String(x['contactId'] ?? '')}</td>
                <td>{String(x['categoryId'] ?? '')}</td>
                <td>{x.date ? String(x.date).slice(0,10) : ''}</td>
                <td>{String(x['description'] ?? '')}</td>
                <td>{String(x['debit'] ?? '')}</td>
                <td>{String(x['credit'] ?? '')}</td>
                <td>{String(x['currency'] ?? '')}</td>
                <td><button className="btn" onClick={()=>del(x.id)}>Delete</button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={9} className="text-zinc-500">No entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
