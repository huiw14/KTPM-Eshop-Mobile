const fs = require('fs');
const path = require('path');

const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const run = report.run;

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const stats = run.stats;
const failures = run.failures || [];
const executions = run.executions || [];
const assertionRows = executions.map((execution) => {
  const request = execution.item?.name || 'Không rõ request';
  const responseCode = execution.response?.code ?? 'Không có response';
  const duration = execution.response?.responseTime ?? '-';
  const assertions = execution.assertions || [];
  const failed = assertions.filter((item) => item.error);
  const header = (execution.request?.header || []).find((item) => item.key?.toLowerCase() === 'x-student-id');
  return `<tr class="${failed.length ? 'fail' : 'pass'}"><td>${escapeHtml(request)}</td><td>${escapeHtml(responseCode)}</td><td>${escapeHtml(duration)} ms</td><td>${escapeHtml(header?.value || 'Không thấy')}</td><td>${assertions.length - failed.length}/${assertions.length}</td></tr>`;
}).join('\n');

const failureRows = failures.length
  ? failures.map((failure) => `<tr><td>${escapeHtml(failure.source?.name || '')}</td><td>${escapeHtml(failure.error?.name || '')}</td><td>${escapeHtml(failure.error?.message || '')}</td></tr>`).join('\n')
  : '<tr><td colspan="3">Không có assertion thất bại.</td></tr>';

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>HW06 Newman Report - 22127315</title>
<style>body{font-family:Arial,sans-serif;max-width:1200px;margin:32px auto;color:#172033;padding:0 16px}h1{margin-bottom:4px}.meta{color:#536174}.cards{display:flex;gap:12px;margin:24px 0;flex-wrap:wrap}.card{border:1px solid #d8dee9;border-radius:8px;padding:16px;min-width:160px}.card b{font-size:28px;display:block}.pass{background:#effaf3}.fail{background:#fff0f0}table{border-collapse:collapse;width:100%;margin:12px 0 28px}th,td{border:1px solid #d8dee9;padding:9px;text-align:left;vertical-align:top}th{background:#f4f7fb}code{background:#f2f4f8;padding:2px 4px;border-radius:3px}.note{padding:12px;background:#fff8e6;border-left:4px solid #e0a400}</style>
</head><body>
<h1>HW06 - Newman API Test Report</h1>
<p class="meta">MSSV: <b>22127315</b> · SUT: <code>http://127.0.0.1:3000</code> · Sinh từ dữ liệu Newman JSON thực tế.</p>
<div class="cards"><div class="card"><span>Requests</span><b>${stats.requests.total}</b></div><div class="card"><span>Assertions</span><b>${stats.assertions.total}</b></div><div class="card pass"><span>Assertions pass</span><b>${stats.assertions.total - stats.assertions.failed}</b></div><div class="card fail"><span>Assertions fail</span><b>${stats.assertions.failed}</b></div></div>
<div class="note">Mọi request trong lần chạy có header <code>X-Student-Id</code>. Bảng không hiển thị Authorization token để tránh lộ thông tin xác thực. Assertion fail là phát hiện cần tái hiện và audit, chưa tự động là bug đã xác nhận.</div>
<h2>Kết quả theo request</h2><table><thead><tr><th>Request</th><th>HTTP</th><th>Thời gian</th><th>X-Student-Id</th><th>Assertions pass/tổng</th></tr></thead><tbody>${assertionRows}</tbody></table>
<h2>Assertion thất bại</h2><table><thead><tr><th>Request</th><th>Loại lỗi</th><th>Chi tiết</th></tr></thead><tbody>${failureRows}</tbody></table>
<h2>Nguồn bằng chứng</h2><p>JSON gốc: <code>${escapeHtml(path.basename(input))}</code>. Collection và Environment Postman được lưu trong thư mục <code>hw06/postman</code>.</p>
</body></html>`;

fs.writeFileSync(output, html, 'utf8');
