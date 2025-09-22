const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const through2 = require('through2');
const tmp = require('tmp');
const os = require('os');

const section = ['\\section{', '\\subsection{', '\\subsubsection{'];
const extensions = ['.cc', '.cpp', '.c', '.java', '.py', '.tex'];

function walk(dirPath, depth) {
  let ans = '';
  depth = Math.min(depth, section.length - 1);

  fs.readdirSync(dirPath).forEach((file) => {
    if (file.startsWith('.')) return; // ignore hidden files/dirs

    const f = path.resolve(dirPath, file);
    const stat = fs.lstatSync(f);

    if (stat.isDirectory()) {
      ans += `\n${section[depth]}${file}}\n${walk(f, depth + 1)}`;
    } else if (extensions.includes(path.extname(f))) {
      ans += `\n${section[depth]}${path.basename(file, path.extname(f))}}\n`;

      if (path.extname(f) !== '.tex') {
        ans += `\\begin{lstlisting}\n${fs.readFileSync(
          f,
          'utf8'
        )}\\end{lstlisting}\n`;
      } else {
        ans += fs.readFileSync(f, 'utf8');
      }
    }
  });

  return ans;
}

function genpdf(ans, texPath, tmpobj, iter) {
  const texFileName = path.basename(texPath);

  const tex = spawn('pdflatex', ['-interaction=nonstopmode', texFileName], {
    cwd: tmpobj.name,
    env: process.env,
  });

  tex.on('error', (err) => {
    console.error('❌ Error running pdflatex:', err.message);
  });

  tex.on('exit', (code, signal) => {
    const outputFile = path.join(
      tmpobj.name,
      texFileName.replace('.tex', '.pdf')
    );

    fs.access(outputFile, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(
          `❌ PDF not generated (exit code ${code}, signal ${signal})`
        );
        return;
      }

      if (iter === 0) {
        const s = fs.createReadStream(outputFile);
        s.pipe(ans);
        s.on('close', () => tmpobj.removeCallback());
      } else {
        genpdf(ans, texPath, tmpobj, iter - 1);
      }
    });
  });
}

function pdflatex(doc) {
  const tmpobj = tmp.dirSync({ unsafeCleanup: true, tmpdir: os.tmpdir() });
  const texPath = path.join(tmpobj.name, '_notebook.tex');

  const ans = through2();
  const input = fs.createWriteStream(texPath);

  input.end(doc);
  input.on('close', () => {
    const iters = process.platform === 'win32' ? 2 : 1;
    genpdf(ans, texPath, tmpobj, iters);
  });

  return ans;
}

function getFormattedDate() {
  const now = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

module.exports = function (
  srcPath,
  output,
  title,
  university,
  initials,
  teamName,
  teamMembers,
  date
) {
  const today = getFormattedDate();
  let template = fs.readFileSync(
    path.join(__dirname, 'template_header.tex'),
    'utf8'
  );

  template = template
    .replace('${initials}', initials || '')
    .replace('${title}', title || 'Competitive Programming Cheat Sheet')
    .replace('${university}', university || '')
    .replace('${teamName}', teamName || '')
    .replace('${teamMembers}', teamMembers || 'Ali Ghanbari (AliBinary)')
    .replace('${date}', date || today);

  template += walk(srcPath, 0);
  template += '\\end{multicols}\n\\end{document}';

  const outFile = output || './notebook.pdf';
  pdflatex(template).pipe(fs.createWriteStream(outFile));
};
