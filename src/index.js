export default {
  async fetch(request) {
    const url = new URL(request.url);
    const cf = request.cf || {};

    const info = {
      status: "Online (Serverless Active)",
      edge_server: cf.colo || "Unknown",
      kota: cf.city || "Tidak terdeteksi",
      negara: cf.country || "Tidak terdeteksi",
      isp: cf.asOrganization || "Tidak terdeteksi",
      zona_waktu: cf.timezone || "UTC",
      waktu_server: new Date().toISOString(),
    };

    // Endpoint REST API: /api/info
    if (url.pathname === "/api/info") {
      return new Response(JSON.stringify(info, null, 2), {
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    }

    // Halaman Web Utama: /
    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edge Inspector - Serverless App</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 2rem; border-radius: 12px; width: 90%; max-width: 480px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
          h1 { margin-top: 0; font-size: 1.4rem; color: #38bdf8; }
          .row { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid #334155; font-size: 0.95rem; }
          .label { color: #94a3b8; }
          .val { font-weight: 600; text-align: right; }
          a.btn { display: inline-block; margin-top: 1.2rem; background: #38bdf8; color: #0f172a; padding: 0.6rem 1rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>⚡ Serverless Edge Inspector</h1>
          <div class="row"><span class="label">Status</span><span class="val">${info.status}</span></div>
          <div class="row"><span class="label">Lokasi Edge Server</span><span class="val">${info.edge_server}</span></div>
          <div class="row"><span class="label">Kota / Negara</span><span class="val">${info.kota}, ${info.negara}</span></div>
          <div class="row"><span class="label">ISP</span><span class="val">${info.isp}</span></div>
          <div class="row"><span class="label">Waktu (UTC)</span><span class="val">${info.waktu_server}</span></div>
          <a class="btn" href="/api/info" target="_blank">Lihat Output JSON (/api/info)</a>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
