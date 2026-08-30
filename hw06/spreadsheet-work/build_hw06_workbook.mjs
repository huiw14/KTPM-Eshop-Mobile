import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const root = path.resolve('D:/KTPM-Eshop-Mobile');
const reportPath = path.join(root, 'hw06', 'REPORT.md');
const outputPath = path.join(root, 'hw06', 'HW06_Test_Cases_and_Summary_22127315.xlsx');
const report = await fs.readFile(reportPath, 'utf8');

function rowsFromAudit(markdown) {
  const start = markdown.indexOf('### 7.1. Audit (human review)');
  const end = markdown.indexOf('### 7.2.', start);
  const section = markdown.slice(start, end);
  const lines = section.split(/\r?\n/).filter((line) => /^\| \*\*(DP|ST|SEC|SCH)-/.test(line));
  return lines.map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim().replace(/^\*\*|\*\*$/g, ''));
    const [id, group, summary, expected, auditLabel, auditReason] = cells;
    const fr = (id.match(/FR(05|08|15)/) || [])[1] ? `FR-${(id.match(/FR(05|08|15)/) || [])[1]}` : 'Hỗ trợ';
    const normalizedLabel = auditLabel === 'VALID' ? 'VALID (Đúng)' : auditLabel === 'INVALID' ? 'INVALID (Sai)' : auditLabel === 'INCOMPLETE' ? 'INCOMPLETE (Thiếu)' : '';
    return [id, fr, group, summary, expected, 'AI', normalizedLabel, auditReason, 'Chưa chạy', '', '', ''];
  });
}

const cases = rowsFromAudit(report);
if (cases.length !== 95) throw new Error(`Expected 95 AI test cases, found ${cases.length}`);

const workbook = Workbook.create();
const guide = workbook.worksheets.add('Hướng dẫn');
const casesSheet = workbook.worksheets.add('Test Cases');
const summary = workbook.worksheets.add('Test Summary');
const pilot = workbook.worksheets.add('Newman Pilot');

for (const sheet of [guide, casesSheet, summary, pilot]) sheet.showGridLines = false;

guide.getRange('A1:H1').merge();
guide.getRange('A1').values = [['HW06 - API Testing | Excel Test Cases & Test Summary']];
guide.getRange('A2:H2').merge();
guide.getRange('A2').values = [['MSSV: 22127315 | SUT: EShop | Nguồn: REPORT.md và các artifacts Newman trong hw06']];
guide.getRange('A4:B9').values = [
  ['Nội dung', 'Hướng dẫn sử dụng'],
  ['Test Cases', 'Mỗi dòng là một test case AI đã sinh. Điền Nhãn audit là VALID, INVALID hoặc INCOMPLETE; nêu lý do; sau khi chạy cập nhật Trạng thái chạy, Kết quả thực tế và Bằng chứng.'],
  ['Test Summary', 'Các số liệu được tính bằng công thức từ sheet Test Cases. Không nhập trực tiếp vào ô kết quả.'],
  ['Newman Pilot', 'Lưu kết quả lần chạy pilot thật: 15 requests, 31 assertions, 29 pass, 2 fail. Đây không phải kết quả hoàn chỉnh của 95 case.'],
  ['Phạm vi', 'FR-05 Product listing/search; FR-08 Checkout; FR-15 Product CRUD.'],
  ['Lưu ý', 'Không ghi token, mật khẩu hoặc dữ liệu nhạy cảm vào workbook/bằng chứng công khai.']
];

const headers = ['ID', 'FR', 'Nhóm kỹ thuật', 'Tóm tắt test case AI đề xuất', 'Kỳ vọng / điểm cần audit', 'Nguồn', 'Nhãn audit', 'Giải thích lý do / hiệu chỉnh', 'Trạng thái chạy', 'Kết quả thực tế', 'Bằng chứng', 'Ghi chú'];
casesSheet.getRange(`A1:L${cases.length + 1}`).values = [headers, ...cases];
casesSheet.tables.add(`A1:L${cases.length + 1}`, true, 'Hw06TestCases');
casesSheet.freezePanes.freezeRows(1);
casesSheet.freezePanes.freezeColumns(2);
casesSheet.getRange(`G2:G${cases.length + 1}`).dataValidation = { rule: { type: 'list', values: ['VALID (Đúng)', 'INVALID (Sai)', 'INCOMPLETE (Thiếu)'] } };
casesSheet.getRange(`I2:I${cases.length + 1}`).dataValidation = { rule: { type: 'list', values: ['Chưa chạy', 'PASS', 'FAIL', 'BLOCKED'] } };

summary.getRange('A1:F1').merge();
summary.getRange('A1').values = [['HW06 - Tổng kết kiểm thử']];
summary.getRange('A3:F3').values = [['Chức năng', 'AI sinh', 'Đã audit', 'VALID', 'INVALID', 'INCOMPLETE']];
summary.getRange('A4:A8').values = [['FR-05'], ['FR-08'], ['FR-15'], ['Hỗ trợ'], ['Tổng cộng']];
summary.getRange('B4').formulas = [["=COUNTIF('Test Cases'!$B$2:$B$96,A4)"]];
summary.getRange('B4:B7').fillDown();
summary.getRange('C4').formulas = [["=COUNTIFS('Test Cases'!$B$2:$B$96,A4,'Test Cases'!$G$2:$G$96,\"<>\")"]];
summary.getRange('C4:C7').fillDown();
summary.getRange('D4').formulas = [["=COUNTIFS('Test Cases'!$B$2:$B$96,A4,'Test Cases'!$G$2:$G$96,\"VALID (Đúng)\")"]];
summary.getRange('D4:D7').fillDown();
summary.getRange('E4').formulas = [["=COUNTIFS('Test Cases'!$B$2:$B$96,A4,'Test Cases'!$G$2:$G$96,\"INVALID (Sai)\")"]];
summary.getRange('E4:E7').fillDown();
summary.getRange('F4').formulas = [["=COUNTIFS('Test Cases'!$B$2:$B$96,A4,'Test Cases'!$G$2:$G$96,\"INCOMPLETE (Thiếu)\")"]];
summary.getRange('F4:F7').fillDown();
summary.getRange('B8:F8').formulas = [[ '=SUM(B4:B7)', '=SUM(C4:C7)', '=SUM(D4:D7)', '=SUM(E4:E7)', '=SUM(F4:F7)' ]];

pilot.getRange('A1:F1').merge();
pilot.getRange('A1').values = [['Newman Pilot Run - 2026-08-30 03:43 (Windows host)']];
pilot.getRange('A3:B10').values = [
  ['Thuộc tính', 'Giá trị'],
  ['Newman', '6.2.2 tại C:\\Users\\Uyen Nhu\\AppData\\Roaming\\npm\\newman.cmd'],
  ['SUT', 'http://127.0.0.1:3000'],
  ['Requests', 15],
  ['Assertions pass', 29],
  ['Assertions fail', 2],
  ['Header X-Student-Id', '22127315 - 15/15 requests'],
  ['Evidence JSON', 'hw06/newman-reports/HW06_Newman_Run_22127315.json']
];
pilot.getRange('D3:F3').values = [['Assertion fail', 'Kết quả', 'Ghi chú audit']];
pilot.getRange('D4:F5').values = [
  ['SEC-SQL-01 - SQL injection trong search', 'FAIL', 'Tái hiện và audit trước khi xác nhận bug.'],
  ['SEC-RBAC-01 - Create product không token bị từ chối', 'FAIL', 'Tái hiện và audit trước khi xác nhận bug.']
];

const titleFormat = { fill: '#17365D', font: { bold: true, color: '#FFFFFF', size: 16 }, horizontalAlignment: 'center', verticalAlignment: 'center' };
const headerFormat = { fill: '#1F4E78', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', verticalAlignment: 'center', wrapText: true };
for (const title of [guide.getRange('A1:H1'), summary.getRange('A1:F1'), pilot.getRange('A1:F1')]) {
  title.format = titleFormat;
  title.format.rowHeight = 28;
}
guide.getRange('A4:B4').format = headerFormat;
summary.getRange('A3:F3').format = headerFormat;
pilot.getRange('A3:B3').format = headerFormat;
pilot.getRange('D3:F3').format = headerFormat;
casesSheet.getRange('A1:L1').format = headerFormat;

guide.getRange('A1:H9').format.wrapText = true;
guide.getRange('A1:H9').format.borders = { preset: 'outside', style: 'thin', color: '#A6A6A6' };
casesSheet.getRange(`A1:L${cases.length + 1}`).format.wrapText = true;
casesSheet.getRange(`A1:L${cases.length + 1}`).format.borders = { preset: 'inside', style: 'thin', color: '#D9E2F3' };
summary.getRange('A3:F8').format.borders = { preset: 'all', style: 'thin', color: '#A6A6A6' };
pilot.getRange('A3:B10').format.borders = { preset: 'all', style: 'thin', color: '#A6A6A6' };
pilot.getRange('D3:F5').format.borders = { preset: 'all', style: 'thin', color: '#A6A6A6' };

summary.getRange('A8:F8').format = { fill: '#D9EAD3', font: { bold: true }, borders: { preset: 'all', style: 'thin', color: '#A6A6A6' } };
casesSheet.getRange(`G2:G${cases.length + 1}`).conditionalFormats.add('containsText', { text: 'VALID', format: { fill: '#D9EAD3', font: { color: '#274E13' } } });
casesSheet.getRange(`G2:G${cases.length + 1}`).conditionalFormats.add('containsText', { text: 'INVALID', format: { fill: '#F4CCCC', font: { color: '#990000' } } });
casesSheet.getRange(`G2:G${cases.length + 1}`).conditionalFormats.add('containsText', { text: 'INCOMPLETE', format: { fill: '#FFF2CC', font: { color: '#7F6000' } } });
casesSheet.getRange(`I2:I${cases.length + 1}`).conditionalFormats.add('containsText', { text: 'PASS', format: { fill: '#D9EAD3' } });
casesSheet.getRange(`I2:I${cases.length + 1}`).conditionalFormats.add('containsText', { text: 'FAIL', format: { fill: '#F4CCCC' } });

guide.getRange('A:A').format.columnWidth = 24;
guide.getRange('B:B').format.columnWidth = 100;
casesSheet.getRange('A:A').format.columnWidth = 18;
casesSheet.getRange('B:B').format.columnWidth = 10;
casesSheet.getRange('C:C').format.columnWidth = 20;
casesSheet.getRange('D:D').format.columnWidth = 44;
casesSheet.getRange('E:E').format.columnWidth = 52;
casesSheet.getRange('F:F').format.columnWidth = 10;
casesSheet.getRange('G:G').format.columnWidth = 22;
casesSheet.getRange('H:H').format.columnWidth = 40;
casesSheet.getRange('I:I').format.columnWidth = 16;
casesSheet.getRange('J:J').format.columnWidth = 36;
casesSheet.getRange('K:K').format.columnWidth = 42;
casesSheet.getRange('L:L').format.columnWidth = 26;
summary.getRange('A:F').format.columnWidth = 19;
pilot.getRange('A:A').format.columnWidth = 25;
pilot.getRange('B:B').format.columnWidth = 54;
pilot.getRange('D:D').format.columnWidth = 42;
pilot.getRange('E:E').format.columnWidth = 14;
pilot.getRange('F:F').format.columnWidth = 40;

const check = await workbook.inspect({ kind: 'table', range: 'Test Cases!A1:L8', include: 'values,formulas', tableMaxRows: 8, tableMaxCols: 12 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 100 }, summary: 'formula error scan' });
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
const preview = await workbook.render({ sheetName: 'Test Summary', range: 'A1:F8', scale: 2, format: 'png' });
await fs.writeFile(path.join(root, 'hw06', 'spreadsheet-work', 'test-summary-preview.png'), new Uint8Array(await preview.arrayBuffer()));
console.log(outputPath);
