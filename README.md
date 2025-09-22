# source2pdf

**Auto-generate a PDF notebook from your source codes (useful for ACM-ICPC cheatsheets)**

This project is a fork of [codes2pdf](https://github.com/Erfaniaa/codes2pdf), which itself was a fork of [notebook-generator](https://github.com/pin3da/notebook-generator).  
Over the years, the project had accumulated some bugs that I fixed, and and I also added several useful features to improve functionality and usability.

---

## Features

- Works on **Linux** and **Windows**.
- Generates a **PDF notebook** with syntax-highlighted source codes.
- Supports `.c`, `.cpp`, `.cc`, `.java`, `.py`, `.tex` files.
- Renders LaTeX `.tex` files directly.
- Three-column layout per page (improved from original two-column layout).
- Customizable **author/team info** and **date** in the notebook header.

---

## Dependencies

You need **TeX Live** installed to compile PDFs.

**Linux:**

```bash
sudo apt install texlive
```

**Windows:**

Download and install from: [TeX Live Windows Installer](https://www.tug.org/texlive/acquire-netinstall.html)

---

## Install

```bash
npm install -g source2pdf
```

---

## Usage

```bash
source2pdf <source_dir> [options]
```

**Options:**

```
-V, --version             output the version number
-u, --university [name]   university name to be added in the notebook
-i, --initials [initials] initials of the university/team to be placed in the upper-right corner of all pages
-n, --teamname [name]     name of the team to be displayed in the notebook
-t, --teammembers [names] names of team members to be added in the header
-o, --output [filename]   output file for the notebook. Default: ./notebook.pdf
-h, --help                output usage information
```

**Examples:**

```bash
# Generate a PDF notebook from the current directory (default filename: notebook.pdf)
source2pdf ./ 

# Generate a PDF notebook with university and team information
source2pdf ./ --university "Sharif University of Technology" --initials SUT --teamname "Init to win it" --teammembers "Ali Ghanbari, Zahra Ghalvenave" --output ./team_notebook.pdf
```

> The second command will create a PDF file named `team_notebook.pdf` in the current directory, with three columns per page, a table of contents, and the provided university/team info in the header.

---

## Example PDF

See an example notebook here: [notebook.pdf](https://github.com/AliBinary/source2pdf/blob/master/sample_notebook.pdf)

> Note: The original project used two columns per page; in this version, the generated PDF has three columns per page, allowing you to fit more source code in fewer pages while keeping the layout clean.

---

## Sample PDF Screenshots

Here are a few screenshots of the generated PDF notebook:

![Sample Notebook](images/sample_notebook.png)

---

## Notes

- Recommended: Use **up to 3 "levels"** in your source code directory to create a clear table of contents.
- Use **spaces instead of underscores** in filenames to print a prettier TOC.
- `.tex` files are rendered as LaTeX and included as-is in the notebook.

---

## License

MIT License © AliBinary
