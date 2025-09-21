# codes2pdf
Auto generate a PDF notebook from your source codes (useful for your ACM-ICPC cheatsheet)

## Dependencies

This generator works in both Linux and Windows, so check how to install TeX Live in your OS.

TeX Live for Linux:

```bash
sudo aptitude install texlive
```

TeX Live for Windows:

Download installer (`install-tl-windows.exe`) from [https://www.tug.org/texlive/acquire-netinstall.html](https://www.tug.org/texlive/acquire-netinstall.html)

Also install the <u>latest version</u> of Node.js and NPM on your machine (download from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)).

After installing Node.js on Linux, add this command to your `~/.bashrc`:

```bash
export PATH="$HOME/.npm_modules/bin:$PATH"
```

## Install

```bash
sudo npm install -g codes2pdf
```

## Update

```bash
sudo npm update -g codes2pdf
```

## Use

```bash
Usage: codes2pdf <source_dir> [options]

Auto generate a PDF notebook from your source codes

Options:

    -V, --version                output the version number
    -u --university [name]       university name to be added in the notebook
    -i --initials [initials]     initials of the university name to be placed in the upper-right corner of all pages
    -n --teamname [name]         name of the team to be displayed in the notebook
    -t --teammembers [members]   names of team members to be added in the header
    -o --output [filename]       output file for the notebook. Default to `./notebook.pdf`
    -h, --help                   output usage information
```

### Examples

```bash
codes2pdf ./ /tmp/team_reference.pdf
codes2pdf ./ --university "Shahid Beheshti University" --initials SBU --teamname "Team Alpha" --teammembers "Ali, Sara, Reza"
```

The second command will create a `notebook.pdf` file in the current directory, from the source code files located in the current directory and its subdirectories. The PDF will include:

- University name
- Initials in the upper-right corner
- Team name
- Team members
- Date of generation
- Syntax-highlighted source codes and `.tex` files

## Sample PDF

Here you can find a sample: [sample_notebook.pdf](https://github.com/Erfaniaa/codes2pdf/blob/master/sample_notebook.pdf)

(In this forked version of the original repository, the generated notebook file will have three columns in each page with a smaller font size; this allows more source codes to fit in fewer pages, which is useful for ACM-ICPC contests.)

## Sample PDF Screenshots

<img src="https://user-images.githubusercontent.com/7780269/68278548-cd683e00-0086-11ea-9974-1f9e094e90e7.png" width="85%">

<img src="https://user-images.githubusercontent.com/7780269/68278235-271c3880-0086-11ea-95bd-7d12b4b09674.png" width="85%">

<img src="https://user-images.githubusercontent.com/7780269/68278286-3d29f900-0086-11ea-8eb4-3f184341ab2d.png" width="85%">

## Notes

- Try to use up to 3 "levels" in your source code.
- Use spaces instead of underscores in filenames to print a prettier TOC.
- In this forked version of the [original repository](https://github.com/pin3da/notebook-generator), the generated notebook will have three columns in each page with smaller line spacing. This is useful when you have many different source codes and want to limit the number of pages for your cheatsheet.
- The original repository was created by [Manuel Pineda](https://github.com/pin3da/) and [Diego Restrepo](https://github.com/Diegores14).

