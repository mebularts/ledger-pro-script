'use client';
import { useEffect, useState } from "react";

export default function Page(){
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string>("");

  async function load(){
    setErr("");
    const r = await fetch('/api/categories');
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

    const r = await fetch('/api/categories', {
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
    await fetch('/api/categories/'+id, { method:'DELETE' });
    load();
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Categories</h1>
        {err && <p className="text-red-600 mt-2">{err}</p>}

        <form onSubmit={create} className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <div className="text-sm mb-1">name</div>
            <input name="name" className="input" type="text" required />
          </div>
          <div>
            <div className="text-sm mb-1">type</div>
            <select name="type" className="select" required>
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>name</th><th>type</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((x:any)=>(
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{String(x['name'] ?? '')}</td>
                <td>{String(x['type'] ?? '')}</td>
                <td>
                  <button className="btn" onClick={()=>del(x.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="text-zinc-500">No categories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
