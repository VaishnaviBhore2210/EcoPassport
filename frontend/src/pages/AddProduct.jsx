import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import Nav from '../components/Nav';
import { api, errMsg } from '../api';
import { useToast } from '../components/Toast';

const NUM_FIELDS = ['weightKg', 'recycledContent', 'energyKwh', 'transportKm'];

export default function AddProduct() {
  const [p, setP] = useState({
    name: '', category: '', manufacturer: '', originCountry: 'India', material: '',
    weightKg: 1, recycledContent: 0, energyKwh: 10, transportKm: 100, recyclable: true,
    certifications: '', repairInstructions: '', recyclingInstructions: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const ch = (e) => {
    let v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (NUM_FIELDS.includes(e.target.name)) v = Number(v);
    setP({ ...p, [e.target.name]: v });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!p.name || !p.manufacturer || !p.material) {
      toast('Name, manufacturer and material are required.', 'error');
      return;
    }
    setLoading(true);
    try {
      const r = await api.post('/products', p);
      toast('Product saved — AI analysis complete.', 'success');
      navigate('/passport/' + r.data.id);
    } catch (err) {
      toast(errMsg(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main>
        <h1>Create Digital Passport</h1>
        <p className="subtitle">Fill in the product details below. Our AI engine will generate a sustainability score and recommendation automatically.</p>

        <form className="panel form" onSubmit={submit}>
          <fieldset>
            <legend>Basic details</legend>
            <div className="form-grid">
              <label>Product name<input name="name" value={p.name} onChange={ch} placeholder="e.g. Recycled Cotton Tote" /></label>
              <label>Category<input name="category" value={p.category} onChange={ch} placeholder="e.g. Apparel" /></label>
              <label>Manufacturer<input name="manufacturer" value={p.manufacturer} onChange={ch} placeholder="Company name" /></label>
              <label>Origin country<input name="originCountry" value={p.originCountry} onChange={ch} /></label>
              <label>Primary material<input name="material" value={p.material} onChange={ch} placeholder="e.g. Organic cotton" /></label>
              <label>Certifications<input name="certifications" value={p.certifications} onChange={ch} placeholder="e.g. GOTS, Fair Trade" /></label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Environmental metrics</legend>
            <div className="form-grid">
              <label>Weight (kg)<input name="weightKg" type="number" step="0.01" value={p.weightKg} onChange={ch} /></label>
              <label>Recycled content (%)<input name="recycledContent" type="number" min="0" max="100" value={p.recycledContent} onChange={ch} /></label>
              <label>Energy used (kWh)<input name="energyKwh" type="number" value={p.energyKwh} onChange={ch} /></label>
              <label>Transport distance (km)<input name="transportKm" type="number" value={p.transportKm} onChange={ch} /></label>
            </div>
            <label className="checkbox-row">
              <input name="recyclable" type="checkbox" checked={p.recyclable} onChange={ch} /> This product is recyclable
            </label>
          </fieldset>

          <fieldset>
            <legend>End-of-life guidance</legend>
            <label>Repair instructions<textarea name="repairInstructions" value={p.repairInstructions} onChange={ch} rows={3} /></label>
            <label>Recycling instructions<textarea name="recyclingInstructions" value={p.recyclingInstructions} onChange={ch} rows={3} /></label>
          </fieldset>

          <button disabled={loading} className="submit-btn">
            {loading ? <><Loader2 className="spin" size={18} /> Running AI analysis…</> : <><Sparkles size={18} /> Save & Run AI Analysis</>}
          </button>
        </form>
      </main>
    </>
  );
}
